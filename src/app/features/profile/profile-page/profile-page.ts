import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideUser,
  lucideMail,
  lucidePhone,
  lucideMapPin,
  lucideCalendar,
  lucideShield,
  lucideCamera,
  lucideSave,
} from '@ng-icons/lucide';

interface ProfileFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  country: string;
  currency: string;
}

const INITIAL_DATA: ProfileFormData = {
  firstName: "Carlos",
  lastName: "Slim",
  email: "carlos.slim@carso.com.mx",
  phone: "+52 55 1234 5678",
  dateOfBirth: "1990-05-15",
  address: "Av. Reforma 123, Polanco, CDMX",
  country: "Mexico",
  currency: "MXN",
};

@Component({
  selector: 'app-profile-page',
  imports: [NgClass, NgIcon, FormsModule],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.css',
  providers: [
    provideIcons({
      lucideUser,
      lucideMail,
      lucidePhone,
      lucideMapPin,
      lucideCalendar,
      lucideShield,
      lucideCamera,
      lucideSave,
    })
  ]
})
export class ProfilePage {
  isEditing = signal(false);
  formData = signal<ProfileFormData>(INITIAL_DATA);

  handleChange(field: keyof ProfileFormData, value: string) {
    this.formData.update(prev => ({ ...prev, [field]: value }));
  }

  toggleEdit() {
    this.isEditing.update(v => !v);
  }
}
