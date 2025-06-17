import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    const body = { username: this.username, password: this.password };
    this.http.post('http://localhost:8080/api/auth/login', body, { responseType: 'text' })
      .subscribe({
        next: () => {
          localStorage.setItem('loggedIn', 'true');
          this.router.navigate(['/dashboard']);
        },
        error: () => {
          this.errorMessage = 'Invalid username or password';
        }
      });
  }

  goToRegister() {
    this.router.navigate(['/create-account']);
  }
}
