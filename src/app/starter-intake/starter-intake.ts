import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-starter-intake',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './starter-intake.html',
  styleUrls: ['./starter-intake.scss'],
})
export class StarterIntakeComponent {
  intakeForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.intakeForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      company: [''],
      phone: [''],
      business: ['', Validators.required],
      goal: ['', Validators.required],
      notWorking: ['', Validators.required],
      tools: [''],
      branding: [''],
      timeline: ['', Validators.required],
      budget: ['', Validators.required],
      contactpref: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.intakeForm.valid) {
      console.log('Form Data:', this.intakeForm.value);
      alert('Thank you! Your submission has been received.');
      this.intakeForm.reset();
    }
  }
}
