// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-availability-slots',
//   imports:[CommonModule],
//   templateUrl: './availability-slots.component.html',
//   styleUrls: ['./availability-slots.component.css']
// })
// export class AvailabilitySlotsComponent implements OnInit {
//   doctorId!: number;
//   date!: string;
//   availableSlots: string[] = [];

//   constructor(private router: Router, private http: HttpClient) {
//     const nav = this.router.getCurrentNavigation();
//     const state = nav?.extras?.state;
//     this.doctorId = state?.['doctorId'];
//     this.date = state?.['date'];
//   }

//   ngOnInit(): void {
//     this.fetchAvailability();
//   }

//   fetchAvailability(): void {
//     const url = 'http://localhost:8088/api/availability/getAvailability';
//     const payload = {
//       doctorId: this.doctorId,
//       date: this.date
//     };

//     this.http.post<any>(url, payload).subscribe({
//       next: (response) => {
//         this.availableSlots = response.availableSlots;
//       },
//       error: (err) => {
//         console.error('Error fetching availability:', err);
//       }
//     });
//   }
// }


// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
// import { CommonModule } from '@angular/common';


// @Component({
//   selector: 'app-availability-slots',
//   imports:[CommonModule],
//   templateUrl: './availability-slots.component.html',
//   styleUrls: ['./availability-slots.component.css']
// })
// export class AvailabilitySlotsComponent implements OnInit {
//   doctorId!: number;
//   date!: string;
//   availableSlots: string[] = [];

//   constructor(private router: Router, private http: HttpClient) {
//     const nav = this.router.getCurrentNavigation();
//     const state = nav?.extras?.state;
//     this.doctorId = state?.['doctorId'];
//     this.date = state?.['date'];
//   }

//   ngOnInit(): void {
//     if (this.doctorId && this.date) {
//       this.fetchAvailability();
//     } else {
//       console.warn('Missing doctorId or date in navigation state.');
//     }
//   }

//   fetchAvailability(): void {
//     const url = 'http://localhost:8088/api/availability/getAvailability';
//     const payload = {
//       doctorId: this.doctorId,
//       date: this.date
//     };

//     this.http.post<any>(url, payload).subscribe({
//       next: (response) => {
//         console.log('API Response:', response);
//         this.availableSlots = response.availableSlots || [];
//       },
//       error: (err) => {
//         console.error('Error fetching availability:', err);
//       }
//     });
//   }
// }

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { DoctorAvailabilityResponse } from '../../models/doctor-availability-response';
@Component({
  selector: 'app-availability-slots',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './availability-slots.component.html',
  styleUrls: ['./availability-slots.component.css']
})
export class AvailabilitySlotsComponent implements OnInit {
  doctorId!: number;
  date!: any;
  availableSlots: string[] = [];

  constructor(
    private router: Router,
    private http: HttpClient,
    private location: Location
  ) {
    const nav = this.router.getCurrentNavigation();
    let state: any;

    if (nav?.extras?.state) {
      state = nav.extras.state;
    } else {
      state = this.location.getState();
    }

    console.log('Received state:', state); // ✅ Debug log

    this.doctorId = state?.doctorId;
    this.date = state?.date;
  }

  ngOnInit(): void {
    console.log('Doctor ID:', this.doctorId);
    console.log('Date:', this.date);

    if (this.doctorId && this.date) {
      this.fetchAvailability();
    } else {
      console.warn('Missing doctorId or date. Cannot fetch availability.');
    }
  }

  // fetchAvailability(): void {
  //   const url = `http://localhost:8088/api/availability/getAvailability?doctorId=${this.doctorId}&localDate=${this.date}`;

  //   this.http.get<any>(url).subscribe({
  //     next: (response) => {
  //       console.log('API Response:', response);
  //       this.availableSlots = Array.isArray(response.availableSlots) ? response.availableSlots : [];
  //     },
  //     error: (err) => {
  //       console.error('Error fetching availability:', err);
  //     }
  //   });
  // }


fetchAvailability(): void {
  const params = new HttpParams()
    .set('doctorId', this.doctorId.toString())
    .set('localDate', this.date); // e.g., "2025-06-24"

  this.http
    .get<any>('http://localhost:8088/api/availability/getAvailability', { params })
    .subscribe({
      next: (response) => {
        console.log('API Response:', response);
        this.availableSlots = Array.isArray(response.availableSlots)
                             ? response.availableSlots
                             : [];
      },
      error: (err) => {
        console.error('Error fetching availability:', err);
      }
    });
}

  // fetchAvailability(): void {
  //   // note: param key must be `date`
  //   const url = `http://localhost:8088/api/availability/getAvailability`
  //              + `?doctorId=${this.doctorId}&date=${this.date}`;
  
  //   this.http.get<any>(url).subscribe({
  //     next: resp => {
  //       console.log('API Response:', resp);
  //       this.availableSlots = Array.isArray(resp.availableSlots)
  //                            ? resp.availableSlots
  //                            : [];
  //     },
  //     error: err => console.error('Error fetching availability:', err)
  //   });
  //}


// fetchAvailability(): void {
//   const params = new HttpParams()
//     .set('doctorId', this.doctorId.toString())
//     .set('localDate', this.date);

//   this.http
//     .get<any>('http://localhost:8088/api/availability/getAvailability', { params })
//     .subscribe({
//       next: (resp) => {
//         console.log('API Response:', resp);
//         this.availableSlots = Array.isArray(resp.availableSlots)
//                              ? resp.availableSlots
//                              : [];
//       },
//       error: (err) => {
//         console.error('Error fetching availability:', err);
//       }
//     });
// }



// fetchAvailability(): void {
//   const params = new HttpParams()
//     .set('doctorId', this.doctorId.toString())
//     .set('localDate', this.date);

//   this.http
//     .get<DoctorAvailabilityResponse>(
//       'http://localhost:8088/api/availability/getAvailability',
//       { params }
//     )
//     .subscribe({
//       next: (resp) => {
//         console.log('API Response:', resp);
//         this.availableSlots = Array.isArray(resp.availableSlots)
//                              ? resp.availableSlots
//                              : [];
//       },
//       error: (err) => console.error('Error fetching availability:', err)
//     });
// }


  
}
