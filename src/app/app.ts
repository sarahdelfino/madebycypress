import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { StarterIntakeComponent } from "./starter-intake/starter-intake";
import { httpsCallable, Functions } from '@angular/fire/functions';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule, StarterIntakeComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Made by Cypress');
  private functions = inject(Functions);

  private fb = inject(FormBuilder);

  mode: 'short' | 'thankyou' | 'full' = 'short';

  shortContactForm = this.fb.group({
  name: ['', Validators.required],
  email: ['', [Validators.required, Validators.email]],
  projectType: ['', Validators.required],
  message: [''],
});

async onShortFormSubmit() {
    if (this.shortContactForm.invalid) return;

    const payload = this.shortContactForm.value;

    try {
      const callable = httpsCallable(this.functions, 'submitContact');
      await callable(payload); // sends to CF, writes to Firestore, sends email

      this.mode = 'thankyou';
      this.shortContactForm.reset();
    } catch (err) {
      console.error('submitContact failed', err);
      // Optionally show a toast/snackbar
    }
  }

}
