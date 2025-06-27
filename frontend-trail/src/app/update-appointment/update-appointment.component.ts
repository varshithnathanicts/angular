// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { AuthService } from '../auth.service';
// import { Router } from '@angular/router';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-update-appointment',
//   imports:[CommonModule],
//   templateUrl: './update-appointment.component.html',
//   styleUrls: ['./update-appointment.component.css']
// })
// export class UpdateAppointmentComponent implements OnInit {
//   appointments: any[] = [];

//   constructor(
//     private http: HttpClient,
//     private authService: AuthService,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     const patientId = this.authService.getPatientId();
//     if (patientId) {
//       this.http.get<any[]>(`http://localhost:8086/Whospitals/profile/appointments/patient/${patientId}`)
//         .subscribe({
//           next: (data) => {
//             this.appointments = data;
//           },
//           error: (err) => {
//             console.error('Error fetching appointments:', err);
//           }
//         });
//     }
//   }

//   editAppointment(appt: any): void {
//     this.router.navigate(['/edit-appointment'], {
//       state: { appointment: appt }
//     });
//   }
// }

// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { AuthService } from '../auth.service';
// import { Router } from '@angular/router';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-update-appointment',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './update-appointment.component.html',
//   styleUrls: ['./update-appointment.component.css']
// })
// export class UpdateAppointmentComponent implements OnInit {
//   appointments: any[] = [];

//   constructor(
//     private http: HttpClient,
//     private authService: AuthService,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     const patientId = this.authService.getPatientId();
//     if (patientId) {
//       this.http.get<any[]>(`http://localhost:8086/Whospitals/profile/appointments/patient/${patientId}`)
//         .subscribe({
//           next: (data) => {
//             this.appointments = data;
//           },
//           error: (err) => {
//             console.error('Error fetching appointments:', err);
//           }
//         });
//     }
//   }

//   editAppointment(appt: any): void {
//     this.router.navigate(['/edit-appointment'], {
//       state: { appointment: appt }
//     });
//   }

//   cancelAppointment(appointmentId: string): void {
//     const confirmCancel = confirm('Are you sure you want to cancel this appointment?');
//     if (!confirmCancel) return;

//     const url = `http://localhost:8086/Whospitals/profile/appointments/cancel/${appointmentId}`;
//     this.http.put(url, {}).subscribe({
//       next: () => {
//         this.appointments = this.appointments.filter(appt => appt.id !== appointmentId);
//         alert('Appointment cancelled successfully.');
//       },
//       error: (err) => {
//         console.error('Error cancelling appointment:', err);
//         alert('Failed to cancel appointment.');
//       }
//     });
//   }
// }

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-appointment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './update-appointment.component.html',
  styleUrls: ['./update-appointment.component.css']
})
export class UpdateAppointmentComponent implements OnInit {
  appointments: any[] = [];

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAppointments();
  }
  

  editAppointment(appt: any): void {
    this.router.navigate(['/edit-appointment'], {
      state: { appointment: appt }
    });
  }

  loadAppointments(): void {
    const patientId = this.authService.getPatientId();
    if (patientId) {
      this.http.get<any[]>(`http://localhost:8086/Whospitals/appointments/patient/${patientId}`)
        .subscribe({
          next: (data) => {
            this.appointments = data.filter(appt => appt.status !== 'Cancelled');
          },
          error: (err) => {
            console.error('Error fetching appointments:', err);
          }
        });
    }
  }
  

  cancelAppointment(appointmentId: string): void {
    const confirmCancel = confirm('Are you sure you want to cancel this appointment?');
    if (!confirmCancel) return;
  
    const url = `http://localhost:8086/Whospitals/appointments/cancel/${appointmentId}`;
    this.http.put(url, {}).subscribe({
      next: () => {
        alert('Appointment cancelled successfully.');
        this.loadAppointments(); // Re-fetch updated list
      },
      error: (err) => {
        console.error('Error cancelling appointment:', err);
        alert('Failed to cancel appointment.');
      }
    });
    
  }
}
