import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-welcome',
  standalone: true,
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
  imports: [CommonModule, RouterModule]
})
export class WelcomeComponent {
  welcome = 'Welcome to WHospitals';

  constructor(private router: Router) {}

  goToDashboard(){
    this.router.navigate(['/dashboard']);
  }
}
