import { Component, signal, computed, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideUser,
  lucideMail,
  lucideLock,
  lucideArrowRight,
  lucideEye,
  lucideEyeOff,
  lucideCheck,
  lucideSun,
  lucideMoon
} from '@ng-icons/lucide';
import { GlobalStateService } from '../../../core/global-store/global-state.service';

@Component({
  selector: 'app-signup-page',
  imports: [NgClass, NgIcon, FormsModule, RouterLink],
  templateUrl: './signup-page.html',
  styleUrl: './signup-page.css',
  providers: [
    provideIcons({
      lucideUser,
      lucideMail,
      lucideLock,
      lucideArrowRight,
      lucideEye,
      lucideEyeOff,
      lucideCheck,
      lucideSun,
      lucideMoon
    })
  ]
})
export class SignupPage {

  private readonly router = inject(Router);

  globalState = inject(GlobalStateService);

  step = signal(1);
  isLoading = signal(false);
  showPassword = signal(false);

  formData = signal({
    name: '',
    email: '',
    currency: 'MXN',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  passwordRequirements = [
    { id: 'length', label: 'At least 8 characters', check: (pwd: string) => pwd.length >= 8 },
    { id: 'uppercase', label: 'One uppercase letter', check: (pwd: string) => /[A-Z]/.test(pwd) },
    { id: 'lowercase', label: 'One lowercase letter', check: (pwd: string) => /[a-z]/.test(pwd) },
    { id: 'number', label: 'One number', check: (pwd: string) => /[0-9]/.test(pwd) },
  ];

  passwordStrength = computed(() => {
    const pwd = this.formData().password;
    if (!pwd) return 0;
    return this.passwordRequirements.filter(req => req.check(pwd)).length;
  });

  togglePasswordVisibility() {
    this.showPassword.update(v => !v);
  }

  updateField(field: keyof ReturnType<typeof this.formData>, value: string | boolean) {
    this.formData.update(prev => ({ ...prev, [field]: value }));
  }

  setStep(newStep: number) {
    this.step.set(newStep);
  }

  onSubmit(e: Event) {
    e.preventDefault();
    const data = this.formData();

    // Switch to step 2 if on step 1 and valid
    if (this.step() === 1) {
      if (!data.name || !data.email) return;
      this.step.set(2);
      return;
    }

    // Process Step 2 submit
    if (this.passwordStrength() < 4 || data.password !== data.confirmPassword || !data.agreeToTerms) {
      return;
    }

    this.isLoading.set(true);

    // Mock API call
    setTimeout(() => {
      this.isLoading.set(false);
      console.log('Signup config:', data);
      this.router.navigate(['/'])
    }, 1500);
  }
}
