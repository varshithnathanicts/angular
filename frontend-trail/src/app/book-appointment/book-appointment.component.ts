import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-book-appointment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.css']
})
export class BookAppointmentComponent implements OnInit {
  doctor: any;
  nextFiveDates: string[] = [];
  selectedDate: string | null = null;

  // All possible slots
  allSlots: string[] = [
    '09:30', '10:00', '10:30', '11:00', '11:30', '12:00',
    '12:30', '14:30', '15:00', '15:30'
  ];

  // Slots that are blocked (either by doctor or patient)
  busySlots: string[] = [];

  constructor(
    private router: Router,
    private http: HttpClient,
    private authService: AuthService
  ) {
    const nav = this.router.getCurrentNavigation();
    this.doctor = nav?.extras?.state?.['doctor'];
  }

  ngOnInit(): void {
    const today = new Date();
    for (let i = 0; i < 5; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      this.nextFiveDates.push(d.toISOString().slice(0, 10));
    }
  }

  selectDate(date: string): void {
    this.selectedDate = date;
    this.fetchAvailability(date);
  }

  fetchAvailability(date: string): void {
    const params = new HttpParams()
      .set('doctorId', this.doctor?.doctorId.toString())
      .set('localDate', date);

    this.http.get<any>('http://localhost:8088/Whospitals/doctor/availability/getAvailability', { params })
      .subscribe({
        next: (response) => {
          const patientBlocked = response.busySlots?.['patient blocked'] || [];
          const doctorBlocked = response.busySlots?.['doctor blocked'] || [];

          // Convert "HH:mm:ss" to "HH:mm"
          const allBlocked = [...patientBlocked, ...doctorBlocked].map((slot: string) =>
            slot.slice(0, 5)
          );

          this.busySlots = allBlocked;
        },
        error: (err) => {
          console.error('Error fetching availability:', err);
          this.busySlots = [];
        }
      });
  }

  selectSlot(slot: string): void {
    if (this.busySlots.includes(slot)) return;

    const appointmentRequest = {
      patientId: this.authService.getPatientId(),
      doctorId: this.doctor?.doctorId,
      appointmentDate: this.selectedDate,
      appointmentTime: slot
    };

    this.router.navigate(['/appointment-confirmation'], {
      state: { appointmentRequest }
    });
  }
}





// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { HttpClient, HttpParams } from '@angular/common/http';
// import { CommonModule } from '@angular/common';
// import { AuthService } from '../auth.service'; // ✅ Ensure path is correct

// @Component({
//   selector: 'app-book-appointment',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './book-appointment.component.html',
//   styleUrls: ['./book-appointment.component.css']
// })
// export class BookAppointmentComponent implements OnInit {
//   doctor: any;
//   nextFiveDates: string[] = [];
//   selectedDate: string | null = null;
//   availableSlots: string[] = [];

//   constructor(
//     private router: Router,
//     private http: HttpClient,
//     private authService: AuthService // ✅ Inject AuthService
//   ) {
//     const nav = this.router.getCurrentNavigation();
//     this.doctor = nav?.extras?.state?.['doctor'];
//   }

//   ngOnInit(): void {
//     const today = new Date();
//     for (let i = 0; i < 5; i++) {
//       const d = new Date(today);
//       d.setDate(today.getDate() + i);
//       this.nextFiveDates.push(d.toISOString().slice(0, 10));
//     }
//   }

//   selectDate(date: string): void {
//     console.log("entered button");
//     this.selectedDate = date;
//     this.fetchAvailability(date);
//     console.log("done button");
//   }

//   fetchAvailability(date: string): void {
//     const params = new HttpParams()
//       .set('doctorId', this.doctor?.doctorId.toString())
//       .set('localDate', date);

//     this.http.get<any>('http://localhost:8088/Whospitals/doctor/availability/getAvailability', { params })
//       .subscribe({
//         next: (response) => {
//           //console.log('Slots for', date, ':', response);
//           this.availableSlots = Array.isArray(response.availableSlots) ? response.availableSlots : [];
//         },
//         error: (err) => {
//           console.error('Error fetching availability:', err);
//           this.availableSlots = [];
//         }
//       });
//   }

//   selectSlot(slot: string): void {
//     const appointmentRequest = {
//       patientId: this.authService.getPatientId(), // ✅ Get patient ID
//       doctorId: this.doctor?.doctorId,
//       appointmentDate: this.selectedDate,
//       appointmentTime: slot
//     };

//     console.log('Navigating to confirmation with:', appointmentRequest);

//     this.router.navigate(['/appointment-confirmation'], {
//       state: { appointmentRequest }
//     });
//   }
// }

