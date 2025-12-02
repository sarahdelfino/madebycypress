import {initializeApp} from "firebase-admin/app";
import {getFirestore} from "firebase-admin/firestore";
import {onCall, HttpsError} from "firebase-functions/v2/https";
import {defineSecret} from "firebase-functions/params";
import {Resend} from "resend";

initializeApp();
const db = getFirestore();

// set RESEND_API_KEY in functions config or Secret Manager
const resendKey = defineSecret("RESEND_API_KEY");

export const submitContact = onCall(
  {
    secrets: [resendKey],
  },
  async (request) => {
    const data = request.data as {
      name?: string;
      email?: string;
      projectType?: string;
      message?: string;
    };

    const {name, email, projectType, message} = data;

    // Basic validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      throw new HttpsError("invalid-argument", "A valid name is required.");
    }

    if (
      !email ||
      typeof email !== "string" ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      throw new HttpsError("invalid-argument", "A valid email is required.");
    }

    if (
      !projectType ||
      typeof projectType !== "string" ||
      !["new-site", "redesign", "branding", "internal-tool", "not-sure"].includes(
        projectType
      )
    ) {
      throw new HttpsError(
        "invalid-argument",
        "A valid projectType is required."
      );
    }

    const safeMessage =
      typeof message === "string" ? message.trim().slice(0, 5000) : "";

    // 1) Write to Firestore
    const docData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      projectType,
      message: safeMessage,
      createdAt: new Date(),
      status: "new", // you can use this later for triage
    };

    await db.collection("contactRequests").add(docData);

    // 2) Email you
    try {
      const apiKey = resendKey.value();
      const resend = new Resend(apiKey);

      await resend.emails.send({
        from: "Made by Cypress <onboarding@resend.dev>",
        to: "sarahdelfino7@gmail.com",
        subject: `New contact request: ${projectType} from ${name}`,
        text: `New contact request from your site:
Name: ${name}
Email: ${email}
Project Type: ${projectType}

Message:
${safeMessage || "(no message provided)"}
      `.trim(),
      });
    } catch (err) {
      console.error("Failed to send notification email:", err);
      // Don’t throw here unless you want the client to see an error.
      // You already stored the lead in Firestore, so it's safe to continue.
    }

    // Optional response to client
    return {success: true};
  });
