import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-consultation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-consultation.component.html',
  styleUrls: ['./create-consultation.component.css']
})
export class CreateConsultationComponent implements OnInit {
  appointmentId: number | null = null;
  consultation = { notes: '' };
  prescriptionKeys: string[] = [''];
  prescriptionValues: string[] = [''];

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.appointmentId = +params['appointmentId'];
    });
  }

  addPrescriptionField(): void {
    this.prescriptionKeys.push('');
    this.prescriptionValues.push('');
  }

  removePrescriptionField(index: number): void {
    this.prescriptionKeys.splice(index, 1);
    this.prescriptionValues.splice(index, 1);
  }

  submitConsultation(): void {
    if (this.appointmentId === null) {
      alert('Appointment ID is missing.');
      return;
    }

    const prescription: { [key: string]: string } = {};
    this.prescriptionKeys.forEach((key, i) => {
      if (key && this.prescriptionValues[i]) {
        prescription[key] = this.prescriptionValues[i];
      }
    });

    const body = {
      notes: this.consultation.notes,
      prescription
    };

    const url = `http://localhost:8089/Whospitals/consultations/${this.appointmentId}`;
    this.http.post(url, body).subscribe({
      next: (res) => {
        console.log('Consultation created:', res);
        alert('Consultation submitted successfully!');
      },
      error: (err) => {
        console.error('Error creating consultation:', err);
        alert('Failed to submit consultation.');
      }
    });
  }

  trackByIndex(index: number): number {
    return index;
  }
}