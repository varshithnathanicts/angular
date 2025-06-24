// import { Component, OnInit } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { AuthService } from '../auth.service'; // Adjust path as needed
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-medical-history',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './medical-history.component.html',
//   styleUrls: ['./medical-history.component.css']
// })
// export class MedicalHistoryComponent implements OnInit {
//   medicalHistories: any[] = [];
//   newHistory = {
//     diagnosis: '',
//     allergies: '',
//     breathingConditions: '',
//     pastTreatments: ''
//   };

//   constructor(private http: HttpClient, private authService: AuthService) {}

//   ngOnInit(): void {
//     this.fetchMedicalHistory();
//   }

//   fetchMedicalHistory(): void {
//     const patientId = this.authService.getPatientId();
//     if (!patientId) return;

//     this.http.get<any[]>(`http://localhost:8089/Whospitals/medicalHistory/patient/${patientId}`)
//       .subscribe({
//         next: (data) => this.medicalHistories = data,
//         error: (err) => console.error('Error fetching medical history:', err)
//       });
//   }

//   addMedicalHistory(): void {
//     const patientId = this.authService.getPatientId();
//     if (!patientId) return;

//     const payload = {
//       ...this.newHistory,
//       patientId: patientId
//     };

//     const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

//     this.http.post('http://localhost:8089/Whospitals/medicalHistory', payload, { headers })
//       .subscribe({
//         next: () => {
//           alert('Medical history added successfully!');
//           this.newHistory = {
//             diagnosis: '',
//             allergies: '',
//             breathingConditions: '',
//             pastTreatments: ''
//           };
//           this.fetchMedicalHistory();
//         },
//         error: (err) => console.error('Error adding medical history:', err)
//       });
//   }
// }

import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-medical-history',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './medical-history.component.html',
  styleUrls: ['./medical-history.component.css']
})
export class MedicalHistoryComponent implements OnInit {
  medicalHistories: any[] = [];
  newHistory = {
    diagnosis: '',
    allergies: '',
    breathingConditions: '',
    pastTreatments: ''
  };
  editingHistoryId: number | null = null;

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    this.fetchMedicalHistory();
  }

  fetchMedicalHistory(): void {
    const patientId = this.authService.getPatientId();
    if (!patientId) return;

    this.http.get<any[]>(`http://localhost:8089/Whospitals/medicalHistory/patient/${patientId}`)
      .subscribe({
        next: (data) => this.medicalHistories = data,
        error: (err) => console.error('Error fetching medical history:', err)
      });
  }

  addMedicalHistory(): void {
    const patientId = this.authService.getPatientId();
    if (!patientId) return;

    const payload = {
      ...this.newHistory,
      patientId: patientId
    };

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    if (this.editingHistoryId) {
      this.http.put(`http://localhost:8089/Whospitals/medicalHistory/${this.editingHistoryId}`, payload, { headers })
        .subscribe({
          next: () => {
            alert('Medical history updated successfully!');
            this.resetForm();
            this.fetchMedicalHistory();
          },
          error: (err) => console.error('Error updating medical history:', err)
        });
    } else {
      this.http.post('http://localhost:8089/Whospitals/medicalHistory', payload, { headers })
        .subscribe({
          next: () => {
            alert('Medical history added successfully!');
            this.resetForm();
            this.fetchMedicalHistory();
          },
          error: (err) => console.error('Error adding medical history:', err)
        });
    }
  }

  editMedicalHistory(history: any): void {
    this.editingHistoryId = history.medicalHistoryId;
    this.newHistory = {
      diagnosis: history.diagnosis,
      allergies: history.allergies,
      breathingConditions: history.breathingConditions,
      pastTreatments: history.pastTreatments
    };
  }

  deleteMedicalHistory(id: number): void {
    if (!id) {
      console.error('Invalid medicalHistoryId:', id);
      return;
    }

    this.http.delete(`http://localhost:8089/Whospitals/medicalHistory/${id}`)
      .subscribe({
        next: () => {
          alert('Medical history deleted successfully!');
          this.fetchMedicalHistory();
        },
        error: (err) => {
          console.error('Error deleting medical history:', err);
          alert('Failed to delete medical history.');
        }
      });
  }

  resetForm(): void {
    this.newHistory = {
      diagnosis: '',
      allergies: '',
      breathingConditions: '',
      pastTreatments: ''
    };
    this.editingHistoryId = null;
  }
}


// import { Component, OnInit } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { AuthService } from '../auth.service';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-medical-history',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './medical-history.component.html',
//   styleUrls: ['./medical-history.component.css']
// })
// export class MedicalHistoryComponent implements OnInit {
//   medicalHistories: any[] = [];
//   newHistory = {
//     diagnosis: '',
//     allergies: '',
//     breathingConditions: '',
//     pastTreatments: ''
//   };

//   constructor(private http: HttpClient, private authService: AuthService) {}

//   ngOnInit(): void {
//     this.fetchMedicalHistory();
//   }

//   fetchMedicalHistory(): void {
//     const patientId = this.authService.getPatientId();
//     if (!patientId) return;

//     this.http.get<any[]>(`http://localhost:8089/Whospitals/medicalHistory/patient/${patientId}`)
//       .subscribe({
//         next: (data) => this.medicalHistories = data,
//         error: (err) => console.error('Error fetching medical history:', err)
//       });
//   }

//   addMedicalHistory(): void {
//     const patientId = this.authService.getPatientId();
//     if (!patientId) return;

//     const payload = {
//       ...this.newHistory,
//       patientId: patientId
//     };

//     const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

//     this.http.post('http://localhost:8089/Whospitals/medicalHistory', payload, { headers })
//       .subscribe({
//         next: () => {
//           alert('Medical history added successfully!');
//           this.newHistory = {
//             diagnosis: '',
//             allergies: '',
//             breathingConditions: '',
//             pastTreatments: ''
//           };
//           this.fetchMedicalHistory();
//         },
//         error: (err) => console.error('Error adding medical history:', err)
//       });
//   }

//   deleteMedicalHistory(id: number): void {
//     if (!id) {
//       console.error('Invalid medicalHistoryId:', id);
//       return;
//     }
  
//     this.http.delete(`http://localhost:8089/Whospitals/medicalHistory/${id}`)
//       .subscribe({
//         next: () => {
//           alert('Medical history deleted successfully!');
//           this.fetchMedicalHistory();
//         },
//         error: (err) => {
//           console.error('Error deleting medical history:', err);
//           alert('Failed to delete medical history.');
//         }
//       });
//   }
  
// }
