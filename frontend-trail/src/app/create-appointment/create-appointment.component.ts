import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-create-appointment',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './create-appointment.component.html',
  styleUrls: ['./create-appointment.component.css']
})
export class CreateAppointmentComponent {
  doctors: any[] = [];

  constructor(private http: HttpClient, private router: Router) {
    this.fetchDoctors();
  }

  fetchDoctors() {
    this.http.get<{ [key: string]: any[] }>('http://localhost:8082/Whospitals/profile/doctorsList')
      .subscribe({
        next: (response) => {
          this.doctors = response['List of all doctors: '] || [];
        },
        error: (err) => {
          console.error('Failed to fetch doctors:', err);
        }
      });
  }

  bookAppointment(doctor: any) {
    this.router.navigate(['/book-appointment'], {
      state: { doctor }
    });
  }
}
