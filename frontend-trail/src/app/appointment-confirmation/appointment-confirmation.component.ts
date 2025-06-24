// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { Location } from '@angular/common';

// @Component({
//   selector: 'app-appointment-confirmation',
//   templateUrl: './appointment-confirmation.component.html',
//   styleUrls: ['./appointment-confirmation.component.css']
// })
// export class AppointmentConfirmationComponent implements OnInit {
//   appointmentRequest: any;

//   constructor(private router: Router, private location: Location) {
//     const nav = this.router.getCurrentNavigation();
//     this.appointmentRequest = nav?.extras?.state?.['appointmentRequest'] || this.location.getState();
//   }

//   ngOnInit(): void {
//     console.log('Appointment Request:', this.appointmentRequest);
//   }
// }

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-appointment-confirmation',
  templateUrl: './appointment-confirmation.component.html',
  styleUrls: ['./appointment-confirmation.component.css']
})
export class AppointmentConfirmationComponent implements OnInit {
  appointmentRequest: any;

  constructor(
    private router: Router,
    private location: Location,
    private http: HttpClient
  ) {
    const nav = this.router.getCurrentNavigation();
    this.appointmentRequest = nav?.extras?.state?.['appointmentRequest'] || this.location.getState();
  }

  ngOnInit(): void {
    console.log('Appointment Request:', this.appointmentRequest);
  }

  submitAppointment(): void {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post('http://localhost:8086/Whospitals/profile/appointments/book', this.appointmentRequest, { headers })
      .subscribe({
        next: (response) => {
          console.log('Appointment booked:', response);
          alert('Appointment successfully booked!');
          this.router.navigate(['/patient-dashboard']); // ✅ Redirect after booking
        },
        error: (error) => {
          console.error('Booking failed:', error);
          alert('Failed to book appointment. Please try again.');
        }
      });
  }
}
