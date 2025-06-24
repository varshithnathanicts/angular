// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-login-component',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './login-component.component.html',
//   styleUrls: ['./login-component.component.css']
// })
// export class LoginComponentComponent {
//   email = '';
//   password = '';

//   constructor(private http: HttpClient, private router: Router) {}

//   login() {
//     const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

//     this.http.post<any>('http://localhost:8082/Whospitals/auth/login', {
//       email: this.email,
//       password: this.password
//     }, { headers }).subscribe({
//       next: (response) => {
//         console.log('Login response:', response);

//         const role = response.role?.toUpperCase().trim();

//         if (role === 'PATIENT') {
//           this.router.navigate(['/patient-dashboard']);
//         } else if (role === 'DOCTOR') {
//           this.router.navigate(['/doctor-dashboard']);
//         } else {
//           alert('Unknown role. Please contact support.');
//         }
//       },
//       error: (error) => {
//         console.error('Login error:', error);
//         alert('Login failed. Please check your credentials.');
//       }
//     });
//   }
// }

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent {
  email = '';
  password = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  login() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post<any>('http://localhost:8082/Whospitals/auth/login', {
      email: this.email,
      password: this.password
    }, { headers }).subscribe({
      next: (response) => {
        console.log('Login response:', response);

        this.authService.setLoginStatus(true);

        if (response.userId) {
          this.authService.setUserId(response.userId);
        }

        if (response.patientId) {
          this.authService.setPatientId(response.patientId);
        }

        if (response.role) {
          this.authService.setUserRole(response.role);
        }

        const role = response.role?.toUpperCase().trim();
        if (role === 'PATIENT') {
          this.router.navigate(['/patient-dashboard']);
        } else if (role === 'DOCTOR') {
          this.router.navigate(['/doctor-dashboard']);
        } else {
          alert('Unknown role. Please contact support.');
        }
      },
      error: (error) => {
        console.error('Login error:', error);
        alert('Login failed. Please check your credentials.');
      }
    });
  }
}


// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { AuthService } from '../auth.service'; // ✅ Ensure path is correct

// @Component({
//   selector: 'app-login-component',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './login-component.component.html',
//   styleUrls: ['./login-component.component.css']
// })
// export class LoginComponentComponent {
//   email = '';
//   password = '';

//   constructor(
//     private http: HttpClient,
//     private router: Router,
//     private authService: AuthService
//   ) {}



//   login() {
//     const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

//     this.http.post<any>('http://localhost:8082/Whospitals/auth/login', {
//       email: this.email,
//       password: this.password
//     }, { headers }).subscribe({
//       next: (response) => {
//         console.log('Login response:', response);

//         this.authService.setLoginStatus(true); // ✅ Set login status

//         if (response.patientId) {
//           this.authService.setPatientId(response.patientId); // ✅ Store patientId
//         }

//         if (response.role) {
//           this.authService.setUserRole(response.role); // ✅ Store user role
//         }

//         const role = response.role?.toUpperCase().trim();
//         if (role === 'PATIENT') {
//           this.router.navigate(['/patient-dashboard']);
//         } else if (role === 'DOCTOR') {
//           this.router.navigate(['/doctor-dashboard']);
//         } else {
//           alert('Unknown role. Please contact support.');
//         }
//       },
      
//       error: (error) => {
//         console.error('Login error:', error);
//         alert('Login failed. Please check your credentials.');
//       }
//     });
    
//   }
// }

// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { AuthService } from '../auth.service'; // ✅ Make sure this path is correct

// @Component({
//   selector: 'app-login-component',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './login-component.component.html',
//   styleUrls: ['./login-component.component.css']
// })
// export class LoginComponentComponent {
//   email = '';
//   password = '';

//   constructor(
//     private http: HttpClient,
//     private router: Router,
//     private authService: AuthService
//   ) {}

//   login() {
//     const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

//     this.http.post<any>('http://localhost:8082/Whospitals/auth/login', {
//       email: this.email,
//       password: this.password
//     }, { headers }).subscribe({
//       next: (response) => {
//         console.log('Login response:', response);
//         this.authService.setLoginStatus(true); // ✅ Set login status

//         const role = response.role?.toUpperCase().trim();
//         if (role === 'PATIENT') {
//           this.router.navigate(['/patient-dashboard']);
//         } else if (role === 'DOCTOR') {
//           this.router.navigate(['/doctor-dashboard']);
//         } else {
//           alert('Unknown role. Please contact support.');
//         }
//       },
//       error: (error) => {
//         console.error('Login error:', error);
//         alert('Login failed. Please check your credentials.');
//       }
//     });
//   }
// }
