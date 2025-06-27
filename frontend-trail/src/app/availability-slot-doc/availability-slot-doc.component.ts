import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-availability-slot-doc',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './availability-slot-doc.component.html',
  styleUrls: ['./availability-slot-doc.component.css']
})
export class AvailabilitySlotDocComponent implements OnInit {
  selectedDate: string = '';
  doctorId: number | null = null;
  minDate: string = '';

  allSlots: string[] = [
    '09:30', '10:00', '10:30', '11:00', '11:30', '12:00',
    '12:30', '14:30', '15:00', '15:30'
  ];

  doctorBlockedSlots: string[] = [];
  patientBlockedSlots: string[] = [];
  freeSlots: string[] = [];

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    this.doctorId = this.authService.getUserId();

    if (!this.doctorId) {
      console.error('Doctor ID not found in AuthService.');
      return;
    }

    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }

  onDateChange(event: any): void {
    this.selectedDate = event.target.value;

    if (this.doctorId && this.selectedDate) {
      const url = `http://localhost:8088/Whospitals/doctor/availability/getAvailability?doctorId=${this.doctorId}&localDate=${this.selectedDate}`;
      this.http.get<any>(url).subscribe({
        next: (response) => {
          const patientBlocked = response.busySlots?.['patient blocked'] || [];
          const doctorBlocked = response.busySlots?.['doctor blocked'] || [];

          this.patientBlockedSlots = patientBlocked.map((slot: string) => slot.slice(0, 5));
          this.doctorBlockedSlots = doctorBlocked.map((slot: string) => slot.slice(0, 5));

          const blocked = [...this.patientBlockedSlots, ...this.doctorBlockedSlots];
          this.freeSlots = this.allSlots.filter(slot => !blocked.includes(slot));
        },
        error: (err) => {
          console.error('Error fetching availability:', err);
          this.patientBlockedSlots = [];
          this.doctorBlockedSlots = [];
          this.freeSlots = [];
        }
      });
    }
  }
}
