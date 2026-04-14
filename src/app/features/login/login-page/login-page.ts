import { Component, signal, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideMail,
  lucideLock,
  lucideArrowRight,
  lucideEye,
  lucideEyeOff,
  lucideSun,
  lucideMoon,
} from '@ng-icons/lucide';
import { GlobalStateService } from '../../../core/global-store/global-state.service';

@Component({
  selector: 'app-login-page',
  imports: [NgClass, NgIcon, FormsModule, RouterLink],
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
    })
  ]
})
export class LoginPage {
  globalState = inject(GlobalStateService);

  formData = signal({
    email: '',
    password: '',
    rememberMe: false
  });
  
  isLoading = signal(false);
  showPassword = signal(false);

  togglePasswordVisibility() {
    this.showPassword.update(v => !v);
  }

  updateField(field: 'email' | 'password' | 'rememberMe', value: string | boolean) {
    this.formData.update(prev => ({ ...prev, [field]: value }));
  }

  onSubmit(e: Event) {
    e.preventDefault();
    const data = this.formData();
    
    if (!data.email || !data.password) return;

    this.isLoading.set(true);

    // Mock API call
    setTimeout(() => {
      this.isLoading.set(false);
      console.log('Login attempt with', data);
      // Here you would inject Router and router.navigate(['/'])
    }, 1000);
  }
}
