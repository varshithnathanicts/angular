import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-prescription',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-prescription.component.html',
  styleUrls: ['./view-prescription.component.css']
})
export class ViewPrescriptionComponent implements OnInit {
  appointmentId!: number;
  notes: string = '';
  prescription: { [key: string]: string } = {};
  hasData: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}
  
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const id = params['appointmentId'];
      if (id && !isNaN(+id)) {
        this.appointmentId = +id;
        this.fetchPrescription();
      } else {
        console.error('Invalid appointment ID');
      }
    });
  }
  
  

  fetchPrescription(): void {
    const url = `http://localhost:8089/Whospitals/consultations/view/${this.appointmentId}`;
    this.http.get<any>(url).subscribe({
      next: (data) => {
        this.notes = data.notes;
        this.prescription = data.prescription;
        this.hasData = true;
      },
      error: (err) => {
        console.error('Error fetching prescription:', err);
        this.hasData = false;
      }
    });
  }

  get prescriptionKeys(): string[] {
    return Object.keys(this.prescription);
  }
}
