// // doc-view-myappointment.component.ts
// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { AuthService } from '../auth.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-doc-view-myappointment',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './doc-view-myappointment.component.html',
//   styleUrls: ['./doc-view-myappointment.component.css']
// })
// export class DocViewMyappointmentComponent implements OnInit {
//   appointments: any[] = [];
//   doctorId: number | null = null;

//   constructor(
//     private http: HttpClient,
//     private authService: AuthService,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     this.doctorId = this.authService.getUserId();

//     if (this.doctorId !== null) {
//       const url = `http://localhost:8088/Whospitals/doctor/availability/myAppointments?doctorId=${this.doctorId}`;
//       this.http.get<any[]>(url).subscribe({
//         next: (data) => {
//           this.appointments = data.map(appt => ({ ...appt, followupSelection: false }));
//         },
//         error: (err) => {
//           console.error('Error fetching appointments:', err);
//         }
//       });
//     } else {
//       console.warn('Doctor ID not found. Please log in.');
//     }
//   }

//   submitFollowup(appointmentId: number, followup: boolean): void {
//     const url = `http://localhost:8088/Whospitals/doctor/availability/followup/${appointmentId}?followup=${followup}`;
//     this.http.put(url, {}).subscribe({
//       next: () => {
//         const index = this.appointments.findIndex(a => a.appointmentId === appointmentId);
//         if (index !== -1) {
//           this.appointments[index].status = 'COMPLETED';
//         }
//         alert('Follow-up submitted and appointment marked as complete!');
//       },
//       error: (err) => {
//         console.error('Error submitting follow-up:', err);
//         alert('Failed to submit follow-up status.');
//       }
//     });
//   }

//   markComplete(appointmentId: number): void {
//     const url = `http://localhost:8088/Whospitals/doctor/availability/mark/appointment/complete?appointmentId=${appointmentId}`;
//     this.http.put(url, {}).subscribe({
//       next: (res: any) => {
//         console.log('Appointment marked complete:', res);
//         alert(res.message);
//       },
//       error: (err) => {
//         console.error('Error marking appointment complete:', err);
//         alert('Failed to mark appointment as complete.');
//       }
//     });
//   }

//   goToConsultation(appointmentId: number): void {
//     this.router.navigate(['/create-consultation'], {
//       queryParams: { appointmentId }
//     });
//   }

//   editConsultation(consultationId: number): void {
//     this.router.navigate(['/edit-consultation'], {
//       queryParams: { consultationId }
//     });
//   }
// }


import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doc-view-myappointment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './doc-view-myappointment.component.html',
  styleUrls: ['./doc-view-myappointment.component.css']
})
export class DocViewMyappointmentComponent implements OnInit {
  appointments: any[] = [];
  doctorId: number | null = null;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.doctorId = this.authService.getUserId();
    if (this.doctorId !== null) {
      const url = `http://localhost:8088/Whospitals/doctor/availability/myAppointments?doctorId=${this.doctorId}`;
      this.http.get<any[]>(url).subscribe({
        next: (data) => {
          this.appointments = data.map(appt => ({ ...appt, followupSelection: false }));
        },
        error: (err) => {
          console.error('Error fetching appointments:', err);
        }
      });
    }
  }

  submitFollowup(appointmentId: number, followup: boolean): void {
    const url = `http://localhost:8088/Whospitals/doctor/availability/followup/${appointmentId}?followup=${followup}`;
    this.http.put(url, {}).subscribe({
      next: () => {
        const index = this.appointments.findIndex(a => a.appointmentId === appointmentId);
        if (index !== -1) {
          this.appointments[index].status = 'COMPLETED';
        }
        alert('Follow-up submitted and appointment marked as complete!');
      },
      error: (err) => {
        console.error('Error submitting follow-up:', err);
        alert('Failed to submit follow-up status.');
      }
    });
  }

  markComplete(appointmentId: number): void {
    const url = `http://localhost:8088/Whospitals/doctor/availability/mark/appointment/complete?appointmentId=${appointmentId}`;
    this.http.put(url, {}).subscribe({
      next: (res: any) => {
        alert(res.message);
      },
      error: (err) => {
        console.error('Error marking appointment complete:', err);
        alert('Failed to mark appointment as complete.');
      }
    });
  }

  goToConsultation(appointmentId: number): void {
    this.router.navigate(['/create-consultation'], {
      queryParams: { appointmentId }
    });
  }

  editConsultationByAppointment(appointmentId: number): void {
    this.router.navigate(['/edit-consultation'], {
      queryParams: { appointmentId }
    });
  }

  viewMedicalHistory(patientId: number): void {
    this.router.navigate(['/doc-view-medical-history'], {
      queryParams: { patientId }
    });
  }
  
}


// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { AuthService } from '../auth.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-doc-view-myappointment',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './doc-view-myappointment.component.html',
//   styleUrls: ['./doc-view-myappointment.component.css']
// })
// export class DocViewMyappointmentComponent implements OnInit {
//   appointments: any[] = [];
//   doctorId: number | null = null;

//   constructor(
//     private http: HttpClient,
//     private authService: AuthService,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     this.doctorId = this.authService.getUserId(); // Get doctor ID from login

//     if (this.doctorId !== null) {
//       const url = `http://localhost:8088/Whospitals/doctor/availability/myAppointments?doctorId=${this.doctorId}`;
//       this.http.get<any[]>(url).subscribe({
//         next: (data) => {
//           this.appointments = data.map(appt => ({ ...appt, followupSelection: false }));
//         },
//         error: (err) => {
//           console.error('Error fetching appointments:', err);
//         }
//       });
//     } else {
//       console.warn('Doctor ID not found. Please log in.');
//     }
//   }

//   submitFollowup(appointmentId: number, followup: boolean): void {
//     const url = `http://localhost:8088/Whospitals/doctor/availability/followup/${appointmentId}?followup=${followup}`;

//     this.http.put(url, {}).subscribe({
//       next: () => {
//         const index = this.appointments.findIndex(a => a.appointmentId === appointmentId);
//         if (index !== -1) {
//           this.appointments[index].status = 'COMPLETED';
//         }
//         alert('Follow-up submitted and appointment marked as complete!');
//       },
//       error: (err) => {
//         console.error('Error submitting follow-up:', err);
//         alert('Failed to submit follow-up status.');
//       }
//     });
//   }

//   markComplete(appointmentId: number): void {
//     const url = `http://localhost:8088/Whospitals/doctor/availability/mark/appointment/complete?appointmentId=${appointmentId}`;

//     this.http.put(url, {}).subscribe({
//       next: (res: any) => {
//         console.log('Appointment marked complete:', res);
//         alert(res.message);
//       },
//       error: (err) => {
//         console.error('Error marking appointment complete:', err);
//         alert('Failed to mark appointment as complete.');
//       }
//     });
//   }

//   goToConsultation(appointmentId: number): void {
//     this.router.navigate(['/create-consultation'], {
//       queryParams: { appointmentId }
//     });
//   }
// }
