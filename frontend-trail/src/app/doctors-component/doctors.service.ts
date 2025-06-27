// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { signal } from '@angular/core';
// import { toSignal } from '@angular/core/rxjs-interop';

// @Injectable({ providedIn: 'root' })
// export class DoctorService {
//   private baseUrl = 'http://localhost:8082';

//   constructor(private http: HttpClient) {}

//   getDoctorsSignal() {
//     return toSignal(this.http.get<any[]>(`${this.baseUrl}/Whospitals/profile/doctorsList`), { initialValue: [] });
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of, tap } from 'rxjs';

export interface Doctor {
    doctorId: number; // ✅ Use camelCase to match backend
    name: string;
    gender: string;
    specialization: string;
    qualification: string;
  }
  

@Injectable({ providedIn: 'root' })
export class DoctorService {
  private baseUrl = 'http://localhost:8082';

  constructor(private http: HttpClient) {}

  getDoctorsSignal() {
    return toSignal(
      this.http.get<{ [key: string]: Doctor[] }>(`${this.baseUrl}/Whospitals/user/profile/doctorsList`).pipe(
        tap(data => console.log('Doctors response:', data)),
        catchError(error => {
          console.error('Error fetching doctors:', error);
          return of({});
        })
      ),
      { initialValue: {} }
    );
  }
}


// import { Injectable } from '@angular/core';
// import { signal } from '@angular/core';

// @Injectable({ providedIn: 'root' })
// export class DoctorService {
//   private mockDoctors = [
//     { id: 1, name: 'Dr. Ayesha Khan', specialty: 'Cardiology' },
//     { id: 2, name: 'Dr. Ravi Kumar', specialty: 'Neurology' },
//     { id: 3, name: 'Dr. Meera Iyer', specialty: 'Pediatrics' },
//     { id: 4, name: 'Dr. John Mathew', specialty: 'Orthopedics' }
//   ];

//   getDoctorsSignal() {
//     return signal(this.mockDoctors);
//   }
// }
