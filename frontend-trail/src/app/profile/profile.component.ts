// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-profile',
//   imports: [CommonModule],
//   templateUrl: './profile.component.html',
//   styleUrls: ['./profile.component.css']
// })
// export class ProfileComponent implements OnInit {
//   profile: any = null;

//   constructor(private route: ActivatedRoute, private http: HttpClient) {}

//   ngOnInit(): void {
//     const userId = this.route.snapshot.paramMap.get('userId');
//     if (userId) {
//       this.http.get(`http://localhost:8082/Whospitals/profile/myProfile/${userId}`)
//         .subscribe({
//           next: (data: any) => {
//             this.profile = data['Profile details (PATIENT) '] || data['Profile details (DOCTOR) '];
//           },
//           error: (err) => console.error('Error fetching profile:', err)
//         });
//     }
//   }
// }


import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile: any = null;
  isEditing = false;

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    if (userId) {
      this.http.get(`http://localhost:8082/Whospitals/user/profile/${userId}`)
        .subscribe({
          next: (data: any) => {
            this.profile = data['Profile details (PATIENT) '] || data['Profile details (DOCTOR) '];
          },
          error: (err) => console.error('Error fetching profile:', err)
        });
    }
  }

  enableEdit(): void {
    this.isEditing = true;
  }

  updateProfile(): void {
    const userId = this.authService.getUserId();
    if (!userId) {
      alert('User ID not found. Please log in again.');
      return;
    }

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.put(`http://localhost:8082/Whospitals/user/profile/update/${userId}`, this.profile, {
      headers,
      responseType: 'text' // Avoids JSON parsing error
    }).subscribe({
      next: () => {
        alert('Profile updated successfully!');
        this.isEditing = false;
      },
      error: (err) => {
        console.error('Update error:', err);
        alert('Update failed. Please try again.');
      }
    });
  }

  deleteProfile(): void {
    const userId = this.authService.getUserId();
    if (!userId) {
      alert('User ID not found. Please log in again.');
      return;
    }

    if (!confirm('Are you sure you want to delete your profile? This action cannot be undone.')) {
      return;
    }

    this.http.delete(`http://localhost:8082/Whospitals/user/profile/deleteProfile/${userId}`, {
      observe: 'response'
    }).subscribe({
      next: () => {
        alert('Profile deleted successfully!');
        this.authService.setLoginStatus(false);
        this.authService.setUserId(null);
        this.authService.setPatientId(null);
        this.authService.setUserRole(null);
        window.location.href = '/login';
      },
      error: (err) => {
        console.error('Delete error:', err);
        alert('Failed to delete profile. Please try again.');
      }
    });
  }
}


// import { Component, OnInit } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { AuthService } from '../auth.service';

// @Component({
//   selector: 'app-profile',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './profile.component.html',
//   styleUrls: ['./profile.component.css']
// })
// export class ProfileComponent implements OnInit {
//   profile: any = null;
//   isEditing = false;

//   constructor(private http: HttpClient, private authService: AuthService) {}

//   ngOnInit(): void {
//     const userId = this.authService.getUserId();
//     if (userId) {
//       this.http.get(`http://localhost:8082/Whospitals/profile/myProfile/${userId}`)
//         .subscribe({
//           next: (data: any) => {
//             this.profile = data['Profile details (PATIENT) '] || data['Profile details (DOCTOR) '];
//           },
//           error: (err) => console.error('Error fetching profile:', err)
//         });
//     }
//   }

//   enableEdit(): void {
//     this.isEditing = true;
//   }

//   updateProfile(): void {
//     const userId = this.authService.getUserId();
//     if (!userId) {
//       alert('User ID not found. Please log in again.');
//       return;
//     }

//     const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

//     this.http.put(`http://localhost:8082/Whospitals/profile/myProfile/update/${userId}`, this.profile, {
//       headers,
//       responseType: 'text' // 👈 This avoids JSON parsing error
//     }).subscribe({
//       next: () => {
//         alert('Profile updated successfully!');
//         this.isEditing = false;
//       },
//       error: (err) => {
//         console.error('Update error:', err);
//         alert('Update failed. Please try again.');
//       }
//     });
//   }
// }


// import { Component, OnInit } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { AuthService } from '../auth.service';

// @Component({
//   selector: 'app-profile',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './profile.component.html',
//   styleUrls: ['./profile.component.css']
// })
// export class ProfileComponent implements OnInit {
//   profile: any = null;
//   isEditing = false;

//   constructor(private http: HttpClient, private authService: AuthService) {}

//   ngOnInit(): void {
//     const userId = this.authService.getUserId();
//     if (userId) {
//       this.http.get(`http://localhost:8082/Whospitals/profile/myProfile/${userId}`)
//         .subscribe({
//           next: (data: any) => {
//             this.profile = data['Profile details (PATIENT) '] || data['Profile details (DOCTOR) '];
//           },
//           error: (err) => console.error('Error fetching profile:', err)
//         });
//     }
//   }

//   enableEdit(): void {
//     this.isEditing = true;
//   }

//   updateProfile(): void {
//     const userId = this.authService.getUserId();
//     if (!userId) {
//       alert('User ID not found. Please log in again.');
//       return;
//     }

//     const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

//     this.http.put(`http://localhost:8082/Whospitals/profile/myProfile/update/${userId}`, this.profile, { headers })
//       .subscribe({
//         next: () => {
//           alert('Profile updated successfully!');
//           this.isEditing = false;
//         },
//         error: (err) => {
//           console.error('Update error:', err);
//           alert('Update failed. Please try again.');
//         }
//       });
//   }
// }
