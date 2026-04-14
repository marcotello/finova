import { Component, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideMail,
  lucideLock,
  lucideArrowRight,
  lucideWallet,
} from '@ng-icons/lucide';

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
      lucideWallet,
    })
  ]
})
export class LoginPage {
  email = signal('');
  password = signal('');
  isLoading = signal(false);

  onSubmit(e: Event) {
    e.preventDefault();
    if (!this.email() || !this.password()) return;

    this.isLoading.set(true);

    // Mock API call
    setTimeout(() => {
      this.isLoading.set(false);
      console.log('Login attempt with', this.email());
      // Here you would inject Router and router.navigate(['/'])
    }, 1000);
  }
}
