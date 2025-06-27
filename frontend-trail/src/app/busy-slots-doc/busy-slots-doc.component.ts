import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-busy-slots-doc',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './busy-slots-doc.component.html',
  styleUrls: ['./busy-slots-doc.component.css']
})
export class BusySlotsDocComponent implements OnInit {
  selectedDate: string = '';
  doctorId: number | null = null;
  minDate: string = '';
  allSlots: string[] = [
    '09:30', '10:00', '10:30', '11:00', '11:30', '12:00',
    '12:30', '14:30', '15:00', '15:30'
  ];
  blockedSlots: string[] = [];

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    this.doctorId = this.authService.getUserId();
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }

  onDateChange(event: any): void {
    this.selectedDate = event.target.value;
    this.fetchBlockedSlots();
  }

  fetchBlockedSlots(): void {
    if (!this.doctorId || !this.selectedDate) return;

    const url = `http://localhost:8088/Whospitals/doctor/availability/getAvailability?doctorId=${this.doctorId}&localDate=${this.selectedDate}`;
    this.http.get<any>(url).subscribe({
      next: (response) => {
        const doctorBlocked = response.busySlots?.['doctor blocked'] || [];
        this.blockedSlots = doctorBlocked.map((slot: string) => slot.slice(0, 5));
      },
      error: (err) => {
        console.error('Error fetching blocked slots:', err);
        this.blockedSlots = [];
      }
    });
  }

  blockSlot(slot: string): void {
    if (!this.doctorId || !this.selectedDate) return;

    const payload = {
      doctorId: this.doctorId,
      date: this.selectedDate,
      busySlots: [slot]
    };

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post('http://localhost:8088/Whospitals/doctor/availability/setAvailability', payload, { headers })
      .subscribe({
        next: () => {
          alert(`Slot ${slot} blocked successfully.`);
          this.blockedSlots.push(slot);
        },
        error: (err) => {
          console.error('Error blocking slot:', err);
          alert('Failed to block slot.');
        }
      });
  }

  isBlocked(slot: string): boolean {
    return this.blockedSlots.includes(slot);
  }
}

