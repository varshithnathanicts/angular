// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { AuthService } from '../auth.service';
// import { Router } from '@angular/router';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-your-appointments',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './your-appointments.component.html',
//   styleUrls: ['./your-appointments.component.css']
// })
// export class YourAppointmentsComponent implements OnInit {
//   appointments: any[] = [];

//   constructor(
//     private http: HttpClient,
//     private authService: AuthService,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     this.loadAppointments();
//   }

//   loadAppointments(): void {
//     const patientId = this.authService.getPatientId();
//     if (patientId) {
//       this.http.get<any[]>(`http://localhost:8086/Whospitals/appointments/patient/${patientId}`)
//         .subscribe({
//           next: (data) => {
//             console.log('Appointments:', data); // 👈 Add this line
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
//         alert('Appointment cancelled successfully.');
//         this.loadAppointments(); // Refresh list after cancellation
//       },
//       error: (err) => {
//         console.error('Error cancelling appointment:', err);
//         alert('Failed to cancel appointment.');
//       }
//     });
//   }
//   viewPrescription(appointmentId: number): void {
//     console.log('Navigating with appointment ID:', appointmentId); // Debug log
//     this.router.navigate(['/view-prescription'], {
//       queryParams: { appointmentId: appointmentId }
//     });
//   }
  
  
   
  
// }





import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-your-appointments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './your-appointments.component.html',
  styleUrls: ['./your-appointments.component.css']
})
export class YourAppointmentsComponent implements OnInit {
  appointments: any[] = [];

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments(): void {
    const patientId = this.authService.getPatientId();
    if (patientId) {
      this.http.get<any>(`http://localhost:8086/Whospitals/appointments/patient/${patientId}`)
        .subscribe({
          next: (data) => {
            console.log('Appointments:', data);
            this.appointments = Array.isArray(data) ? data : [data]; // Normalize to array
          },
          error: (err) => {
            console.error('Error fetching appointments:', err);
            alert('Could not load appointments.');
          }
        });
    }
  }

  editAppointment(appt: any): void {
    this.router.navigate(['/edit-appointment'], {
      state: { appointment: appt }
    });
  }

  cancelAppointment(appointmentId: string): void {
    if (!confirm('Are you sure you want to cancel this appointment?')) return;

    this.http.put(`http://localhost:8086/Whospitals/profile/appointments/cancel/${appointmentId}`, {})
      .subscribe({
        next: () => {
          alert('Appointment cancelled successfully.');
          this.loadAppointments();
        },
        error: (err) => {
          console.error('Error cancelling appointment:', err);
          alert('Failed to cancel appointment.');
        }
      });
  }

  viewPrescription(appointmentId: number): void {
    this.router.navigate(['/view-prescription'], {
      queryParams: { appointmentId }
    });
  }
}
