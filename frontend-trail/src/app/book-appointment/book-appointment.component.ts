
// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { CommonModule } from '@angular/common';

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

//   constructor(private router: Router) {
//     const nav = this.router.getCurrentNavigation();
//     this.doctor = nav?.extras?.state?.['doctor'];
//   }

//   // ngOnInit(): void {
//   //   console.log('Doctor object:', this.doctor); // ✅ Debug log
//   //   const today = new Date();
//   //   for (let i = 0; i < 5; i++) {
//   //     const nextDate = new Date(today);
//   //     nextDate.setDate(today.getDate() + i);
//   //     this.nextFiveDates.push(nextDate.toISOString().split('T')[0]); // Format: YYYY-MM-DD
//   //   }
//   // }
//   ngOnInit(): void {
//     const today = new Date();
//     for (let i = 0; i < 5; i++) {
//       const d = new Date(today);
//       d.setDate(today.getDate() + i);
//       // → "2025-06-24"
//       this.nextFiveDates.push(d.toISOString().slice(0, 10));
//     }
//   }
  

//   selectDate(date: string): void {
//     console.log('Selected doctorId:', this.doctor?.doctor_id); // ✅ Debug log
//     this.router.navigate(['/availability-slots'], {
//       state: {
//         doctorId: this.doctor?.doctorId, // ✅ Use doctorId, not doctor_id
//         date: date
//       }
//     });    
//   }
// }

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service'; // ✅ Ensure path is correct

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
  availableSlots: string[] = [];

  constructor(
    private router: Router,
    private http: HttpClient,
    private authService: AuthService // ✅ Inject AuthService
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

    this.http.get<any>('http://localhost:8088/api/availability/getAvailability', { params })
      .subscribe({
        next: (response) => {
          console.log('Slots for', date, ':', response);
          this.availableSlots = Array.isArray(response.availableSlots) ? response.availableSlots : [];
        },
        error: (err) => {
          console.error('Error fetching availability:', err);
          this.availableSlots = [];
        }
      });
  }

  selectSlot(slot: string): void {
    const appointmentRequest = {
      patientId: this.authService.getPatientId(), // ✅ Get patient ID
      doctorId: this.doctor?.doctorId,
      appointmentDate: this.selectedDate,
      appointmentTime: slot
    };

    console.log('Navigating to confirmation with:', appointmentRequest);

    this.router.navigate(['/appointment-confirmation'], {
      state: { appointmentRequest }
    });
  }
}

