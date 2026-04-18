import { Component, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideMail,
  lucideLock,
  lucideArrowRight,
  lucideEye,
  lucideEyeOff,
  lucideSun,
  lucideMoon,
  lucideAlertCircle,
} from '@ng-icons/lucide';
import { GlobalStateService } from '../../../core/global-store/global-state.service';
import { AuthStore } from '../../../core/global-store/auth/auth.store';

@Component({
  selector: 'app-login-page',
  imports: [NgIcon, FormsModule, RouterLink],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
  providers: [
    provideIcons({
      lucideMail,
      lucideLock,
      lucideArrowRight,
      lucideEye,
      lucideEyeOff,
      lucideSun,
      lucideMoon,
      lucideAlertCircle,
    })
  ]
})
export class LoginPage {

  private readonly router = inject(Router);
  readonly authStore = inject(AuthStore);
  readonly globalState = inject(GlobalStateService);

  formData = signal({
    email: '',
    password: '',
    rememberMe: false
  });

  showPassword = signal(false);

  // Expose store signals as concise aliases for the template
  readonly isLoading = this.authStore.isLoading;
  readonly error = this.authStore.error;


  togglePasswordVisibility() {
    this.showPassword.update(v => !v);
  }

  updateField(field: 'email' | 'password' | 'rememberMe', value: string | boolean) {
    this.formData.update(prev => ({ ...prev, [field]: value }));
  }

  async onSubmit(e: Event) {
    e.preventDefault();
    const { email, password } = this.formData();

    if (!email || !password) return;

    await this.authStore.login({ email, password });

    // Navigate on success — the store sets user synchronously before we reach this line.
    if (this.authStore.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }
  }
}
