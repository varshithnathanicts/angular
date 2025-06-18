// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-create-appointment',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './create-appointment.component.html'
// })
// export class CreateAppointmentComponent implements OnInit {
//   doctors: any[] = [];

//   constructor(private http: HttpClient) {}

//   ngOnInit(): void {
//     this.http.get<any[]>('http://localhost:8080/api/doctors').subscribe(data => {
//       this.doctors = data;
//     });
//   }

//   bookAppointment(doctorId: number) {
//     console.log('Booking appointment with doctor ID:', doctorId);
//     // You can POST to your backend here
//   }
// }

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-appointment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './create-appointment.component.html'
})
export class CreateAppointmentComponent implements OnInit {
  doctors = [
    { id: 1, name: 'Dr. Aisha Verma', specialization: 'Cardiology' },
    { id: 2, name: 'Dr. Rohan Iyer', specialization: 'Neurology' },
    { id: 3, name: 'Dr. Meena Patel', specialization: 'Dermatology' },
    { id: 4, name: 'Dr. Raj Malhotra', specialization: 'Pediatrics' }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Using dummy data for now
  }

  bookAppointment(doctor: any) {
    // Navigate to NewAppointmentComponent with doctor ID in URL and doctor info in state
    this.router.navigate(['/new-appointment', doctor.id], {
      state: {
        doctorName: doctor.name,
        specialization: doctor.specialization
      }
    });
  }
}
