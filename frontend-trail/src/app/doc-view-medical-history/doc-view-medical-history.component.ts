import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doc-view-medical-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './doc-view-medical-history.component.html',
  styleUrls: ['./doc-view-medical-history.component.css']
})
export class DocViewMedicalHistoryComponent implements OnInit {
  patientId!: number;
  medicalHistories: any[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.patientId = Number(params['patientId']);
      this.fetchMedicalHistory();
    });
  }

  fetchMedicalHistory(): void {
    if (!this.patientId) return;

    const url = `http://localhost:8089/Whospitals/medicalHistory/patient/${this.patientId}`;
    this.http.get<any[]>(url).subscribe({
      next: data => this.medicalHistories = data,
      error: err => console.error('Error fetching medical history:', err)
    });
  }
}
