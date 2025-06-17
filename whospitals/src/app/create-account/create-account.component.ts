import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-account.component.html'
})
export class CreateAccountComponent {
  user = {
    name: '',
    gender: '',
    phone: '',
    email: '',
    password: '',
    role: '',
    specialization: '',
    qualification: '',
    roomNumber: '',
    disease: '',
    place: ''
  };

  genders = ['Male', 'Female', 'Other'];
  roles = ['DOCTOR', 'PATIENT'];
  errorMessage = '';
  successMessage = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    const payload: any = {
      name: this.user.name,
      gender: this.user.gender,
      phone: this.user.phone,
      email: this.user.email,
      password: this.user.password,
      role: this.user.role
    };

    if (this.user.role === 'DOCTOR') {
      payload.doctorDetails = {
        specialization: this.user.specialization,
        qualification: this.user.qualification,
        roomNumber: this.user.roomNumber
      };
    } else if (this.user.role === 'PATIENT') {
      payload.patientDetails = {
        disease: this.user.disease,
        place: this.user.place
      };
    }

    this.http.post('http://localhost:8080/api/auth/register', payload).subscribe({
      next: () => {
        this.successMessage = 'Account created successfully!';
        this.router.navigate(['/login']);
      },
      error: err => {
        this.errorMessage = err.error?.message || 'Something went wrong. Please try again.';
      }
    });
  }
}
