import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-unblock-busy-slots-doc',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './unblock-busy-slots-doc.component.html',
  styleUrls: ['./unblock-busy-slots-doc.component.css']
})
export class UnblockBusySlotsDocComponent implements OnInit {
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

  unblockSlot(slot: string): void {
    if (!this.doctorId || !this.selectedDate) return;
  
    const payload = {
      doctorId: this.doctorId,
      date: this.selectedDate,
      unblockSlots: [slot]
    };
  
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  
    this.http.put('http://localhost:8088/Whospitals/doctor/availability/unblock', payload, {
      headers,
      responseType: 'text' // ✅ Expect plain text response
    }).subscribe({
      next: (response) => {
        alert(response); // Shows "Slots unblocked successfully"
        this.blockedSlots = this.blockedSlots.filter(s => s !== slot);
      },
      error: (err) => {
        console.error('Error unblocking slot:', err);
        alert('Failed to unblock slot.');
      }
    });
  }
  
  
}
