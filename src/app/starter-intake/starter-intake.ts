import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-starter-intake',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './starter-intake.html',
  styleUrls: ['./starter-intake.scss'],
})
export class StarterIntakeComponent {
  private fb = inject(FormBuilder);
  currentStep = 1;
  totalSteps = 4;
  isSubmitting = false;

  steps = [
    'Contact',
    'Business & goals',
    'Current setup',
    'Timeline & budget',
  ];

  intakeForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    company: [''],
    phone: [''],

    business: ['', Validators.required],
    goal: ['', Validators.required],
    notWorking: [''],
    tools: [''],
    branding: [''],

    timeline: [''],
    budget: ['', Validators.required],
    contactpref: ['', Validators.required],
  });

  private stepFieldsMap: Record<number, string[]> = {
    1: ['name', 'email'],
    2: ['business', 'goal'],
    3: ['notWorking', 'tools', 'branding'],
    4: ['timeline', 'budget', 'contactpref'],
  };

  isInvalid(controlName: string): boolean {
    const ctrl = this.intakeForm.get(controlName);
    return !!ctrl && ctrl.invalid && (ctrl.dirty || ctrl.touched);
  }

  private validateStep(step: number): boolean {
    const fields = this.stepFieldsMap[step] ?? [];
    fields.forEach((name) => {
      const ctrl = this.intakeForm.get(name);
      ctrl?.markAsTouched();
      ctrl?.markAsDirty();
    });
    return fields.every((name) => this.intakeForm.get(name)?.valid);
  }

  nextStep(): void {
    if (!this.validateStep(this.currentStep)) return;
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  prevStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  onSubmit(): void {
    if (!this.validateStep(this.currentStep)) return;
    if (this.intakeForm.invalid) return;

    this.isSubmitting = true;
    const payload = this.intakeForm.value;
    console.log('Full intake payload', payload);

    // TODO: send to backend / Firestore / email
    // this.intakeService.submitIntake(payload).subscribe(...)

    // Fake completion
    setTimeout(() => {
      this.isSubmitting = false;
      this.intakeForm.reset();
      this.currentStep = 1;
      // You can route, show toast, etc.
    }, 800);
  }
}
