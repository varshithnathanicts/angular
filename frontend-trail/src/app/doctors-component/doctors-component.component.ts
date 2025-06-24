import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DoctorService, Doctor } from './doctors.service';

@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './doctors-component.component.html',
  styleUrls: ['./doctors-component.component.css']
})
export class DoctorsComponent {
  doctorsSignal;

  constructor(private doctorService: DoctorService, private router: Router) {
    this.doctorsSignal = this.doctorService.getDoctorsSignal();
  }

  get doctorList(): Doctor[] {
    const data = this.doctorsSignal();
    if (
      typeof data === 'object' &&
      data !== null &&
      'List of all doctors: ' in data &&
      Array.isArray((data as { [key: string]: Doctor[] })['List of all doctors: '])
    ) {
      return (data as { [key: string]: Doctor[] })['List of all doctors: '];
    }
    return [];
  }

  goToBookAppointment(doctor: Doctor): void {
    this.router.navigate(['/book-appointment'], {
      state: { doctor }
    });
  }
}
