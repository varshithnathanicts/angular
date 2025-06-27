// // edit-consultation.component.ts
// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-edit-consultation',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './edit-consultation.component.html',
//   styleUrls: ['./edit-consultation.component.css']
// })
// export class EditConsultationComponent implements OnInit {
//   consultationId!: number;
//   consultationData: any = {};

//   constructor(
//     private route: ActivatedRoute,
//     private http: HttpClient,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     this.route.queryParams.subscribe(params => {
//       this.consultationId = +params['consultationId'];
//       this.fetchConsultation();
//     });
//   }

//   fetchConsultation(): void {
//     const url = `http://localhost:8089/Whospitals/consultations/${this.consultationId}`;
//     this.http.get(url).subscribe(data => {
//       this.consultationData = data;
//     });
//   }

//   updateConsultation(): void {
//     const url = `http://localhost:8089/Whospitals/consultations/update/${this.consultationId}`;
//     this.http.put(url, this.consultationData).subscribe({
//       next: () => {
//         alert('Consultation updated successfully!');
//         this.router.navigate(['/doc-view-myappointment']);
//       },
//       error: err => {
//         console.error('Update failed:', err);
//         alert('Failed to update consultation.');
//       }
//     });
//   }
// // }
// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-edit-consultation',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './edit-consultation.component.html',
//   styleUrls: ['./edit-consultation.component.css']
// })
// export class EditConsultationComponent implements OnInit {
//   appointmentId!: number;
//   consultationData: any = {
//     notes: '',
//     prescription: {}
//   };

//   constructor(
//     private route: ActivatedRoute,
//     private http: HttpClient,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     this.route.queryParams.subscribe(params => {
//       this.appointmentId = Number(params['appointmentId']);
//       this.fetchConsultation();
//     });
//   }

//   fetchConsultation(): void {
//     const url = `http://localhost:8089/Whospitals/consultations/view/${this.appointmentId}`;
//     this.http.get(url).subscribe(data => {
//       this.consultationData = data;
//     });
//   }

//   getPrescriptionKeys(): string[] {
//     return Object.keys(this.consultationData.prescription || {});
//   }

//   addMedicine(): void {
//     const newKey = `med${Object.keys(this.consultationData.prescription).length + 1}`;
//     this.consultationData.prescription[newKey] = '';
//   }
  

//   updateConsultation(): void {
//     const url = `http://localhost:8089/Whospitals/consultations/update/${this.consultationData.consultationId}`;
//     const payload = {
//       notes: this.consultationData.notes,
//       prescription: this.consultationData.prescription
//     };
//     this.http.put(url, payload).subscribe({
//       next: () => {
//         alert('Consultation updated successfully!');
//         this.router.navigate(['/doc-view-myappointment']);
//       },
//       error: err => {
//         console.error('Update failed:', err);
//         alert('Failed to update consultation.');
//       }
//     });
//   }
// }

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-consultation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-consultation.component.html',
  styleUrls: ['./edit-consultation.component.css']
})
export class EditConsultationComponent implements OnInit {
  appointmentId!: number;
  consultationData: any = {
    notes: '',
    prescription: {}
  };
  prescriptionList: { key: string; value: string }[] = [];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.appointmentId = Number(params['appointmentId']);
      this.fetchConsultation();
    });
  }

  fetchConsultation(): void {
    const url = `http://localhost:8089/Whospitals/consultations/view/${this.appointmentId}`;
    this.http.get(url).subscribe((data: any) => {
      this.consultationData = data;
      this.prescriptionList = Object.entries(data.prescription || {}).map(
        ([key, value]) => ({ key, value: value as string })
      );
    });
  }

  addMedicine(): void {
    this.prescriptionList.push({ key: '', value: '' });
  }

  updateConsultation(): void {
    const prescriptionObj: { [key: string]: string } = {};
    this.prescriptionList.forEach(item => {
      if (item.key.trim()) {
        prescriptionObj[item.key] = item.value;
      }
    });

    const payload = {
      notes: this.consultationData.notes,
      prescription: prescriptionObj
    };

    const url = `http://localhost:8089/Whospitals/consultations/update/${this.consultationData.consultationId}`;
    this.http.put(url, payload).subscribe({
      next: () => {
        alert('Consultation updated successfully!');
        this.router.navigate(['/doc-view-myappointment']);
      },
      error: err => {
        console.error('Update failed:', err);
        alert('Failed to update consultation.');
      }
    });
  }
}
