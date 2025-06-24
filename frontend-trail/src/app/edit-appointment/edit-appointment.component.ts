// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { Location } from '@angular/common';
// import { HttpClient, HttpHeaders } from '@angular/common/http';

// @Component({
//   selector: 'app-edit-appointment',
//   templateUrl: './edit-appointment.component.html',
//   styleUrls: ['./edit-appointment.component.css']
// })
// export class EditAppointmentComponent implements OnInit {
//   appointment: any;

//   constructor(private router: Router, private location: Location, private http: HttpClient) {
//     const nav = this.router.getCurrentNavigation();
//     this.appointment = nav?.extras?.state?.['appointment'] || this.location.getState();
//   }

//   ngOnInit(): void {
//     console.log('Editing appointment:', this.appointment);
//   }

//   updateAppointment(): void {
//     const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

//     this.http.put(`http://localhost:8086/Whospitals/profile/appointments/update/${this.appointment.appointmentId}`, this.appointment, { headers })
//       .subscribe({
//         next: (response) => {
//           console.log('Appointment updated:', response);
//           alert('Appointment updated successfully!');
//           this.router.navigate(['/patient-dashboard']);
//         },
//         error: (err) => {
//           console.error('Update failed:', err);
//           alert('Failed to update appointment.');
//         }
//       });
//   }
// }

// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { Location } from '@angular/common';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-edit-appointment',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './edit-appointment.component.html',
//   styleUrls: ['./edit-appointment.component.css']
// })
// export class EditAppointmentComponent implements OnInit {
//   appointment: any;
//   updatedDate: string = '';
//   updatedTime: string = '';

//   constructor(
//     private router: Router,
//     private location: Location,
//     private http: HttpClient
//   ) {
//     const nav = this.router.getCurrentNavigation();
//     this.appointment = nav?.extras?.state?.['appointment'] || this.location.getState();
//   }

//   ngOnInit(): void {
//     if (this.appointment) {
//       this.updatedDate = this.appointment.appointmentDate;
//       this.updatedTime = this.appointment.appointmentTime;
//     }
//   }

//   updateAppointment(): void {
//     const payload = {
//       appointmentDate: this.updatedDate,
//       appointmentTime: this.updatedTime
//     };

//     const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

//     this.http.put(
//       `http://localhost:8086/Whospitals/profile/appointments/update/${this.appointment.appointmentId}`,
//       payload,
//       { headers }
//     ).subscribe({
//       next: (response) => {
//         console.log('Appointment updated:', response);
//         alert('Appointment updated successfully!');
//         this.router.navigate(['/patient-dashboard']);
//       },
//       error: (err) => {
//         console.error('Update failed:', err);
//         alert('Failed to update appointment.');
//       }
//     });
//   }
// }

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-appointment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-appointment.component.html',
  styleUrls: ['./edit-appointment.component.css']
})
export class EditAppointmentComponent implements OnInit {
  appointment: any;
  updatedDate: string = '';
  updatedTime: string = '';
  availableSlots: string[] = [];

  constructor(
    private router: Router,
    private location: Location,
    private http: HttpClient
  ) {
    const nav = this.router.getCurrentNavigation();
    this.appointment = nav?.extras?.state?.['appointment'] || this.location.getState();
  }

  ngOnInit(): void {
    if (this.appointment) {
      this.updatedDate = this.appointment.appointmentDate;
      this.updatedTime = this.appointment.appointmentTime;
      this.fetchAvailabilitySlots();
    }
  }

  fetchAvailabilitySlots(): void {
    const doctorId = this.appointment?.doctor?.doctorId;
    const date = this.updatedDate;

    if (doctorId && date) {
      const params = new HttpParams()
        .set('doctorId', doctorId.toString())
        .set('localDate', date);

      this.http.get<any>('http://localhost:8088/api/availability/getAvailability', { params })
        .subscribe({
          next: (response) => {
            this.availableSlots = Array.isArray(response.availableSlots) ? response.availableSlots : [];
          },
          error: (err) => {
            console.error('Error fetching slots:', err);
          }
        });
    }
  }

  updateAppointment(): void {
    const payload = {
      appointmentDate: this.updatedDate,
      appointmentTime: this.updatedTime
    };

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.put(
      `http://localhost:8086/Whospitals/profile/appointments/update/${this.appointment.appointmentId}`,
      payload,
      { headers }
    ).subscribe({
      next: (response) => {
        alert('Appointment updated successfully!');
        this.router.navigate(['/patient-dashboard']);
      },
      error: (err) => {
        console.error('Update failed:', err);
        alert('Failed to update appointment.');
      }
    });
  }
}
