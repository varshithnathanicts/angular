// import { Component } from '@angular/core';
// import { RouterModule, Router } from '@angular/router';
// import { AuthService } from '../auth.service'; // adjust path
// import { CommonModule } from '@angular/common';
// @Component({
//   selector: 'app-header',
//   standalone: true,
//   imports: [RouterModule,CommonModule],
//   templateUrl: './header-component.component.html',
//   styleUrls: ['./header-component.component.css']
// })
// export class HeaderComponent {
//   constructor(public authService: AuthService, private router: Router) {}

//   logout() {
//     this.authService.logout();
//     this.router.navigate(['/login']);
//   }

  
// }

import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../auth.service'; // Adjust path as needed
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header-component.component.html',
  styleUrls: ['./header-component.component.css']
})
export class HeaderComponent {
  constructor(public authService: AuthService, private router: Router) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  goToProfile(): void {
    const userId = this.authService.getUserId(); // Ensure this method exists
    if (!userId) {
      alert('User ID not found. Please log in again.');
      return;
    }
  
    this.router.navigate(['/profile', userId]);
  }
  
  goToDashboard(): void {
    const role = this.authService.getUserRole();
    console.log('Retrieved role from AuthService:', role); // ✅ Debug log
  
    if (role?.toUpperCase().trim() === 'PATIENT') {
      this.router.navigate(['/patient-dashboard']);
    } else if (role?.toUpperCase().trim() === 'DOCTOR') {
      this.router.navigate(['/doctor-dashboard']);
    } else {
      alert('Unknown role. Cannot navigate to dashboard.');
    }
  }
  
}
