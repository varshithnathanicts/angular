// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-new-appointment',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './new-appointment.component.html'
// })
// export class NewAppointmentComponent implements OnInit {
//   username = '';
//   doctorName = '';
//   specialization = '';
//   doctorId = 0;
//   timeSlots: string[] = [];

//   constructor(private route: ActivatedRoute, private http: HttpClient) {}

//   ngOnInit(): void {
//     this.username = localStorage.getItem('username') || 'Guest';
//     const nav = history.state;
//     this.doctorName = nav.doctorName;
//     this.specialization = nav.specialization;
//     this.doctorId = Number(this.route.snapshot.paramMap.get('id'));

//     this.http.get<string[]>(`http://localhost:8080/api/doctors/${this.doctorId}/timeslots`)
//       .subscribe(data => this.timeSlots = data);
//   }
// }


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-appointment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './new-appointment.component.html'
})
export class NewAppointmentComponent implements OnInit {
  username = '';
  doctorName = '';
  specialization = '';
  doctorId = 0;
  timeSlots: string[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('username') || 'Guest';
    const nav = history.state;
    this.doctorName = nav.doctorName;
    this.specialization = nav.specialization;
    this.doctorId = Number(this.route.snapshot.paramMap.get('id'));

    // ✅ Dummy time slots for testing
    this.timeSlots = [
      '09:00 AM – 09:30 AM',
      '10:00 AM – 10:30 AM',
      '11:30 AM – 12:00 PM',
      '02:00 PM – 02:30 PM',
      '03:30 PM – 04:00 PM',
      '04:30 PM – 05:00 PM'
    ];
  }
}
