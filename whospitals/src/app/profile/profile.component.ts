import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  username = '';
  password = '';
  imageUrl = '';

  ngOnInit(): void {
    this.username = localStorage.getItem('username') || 'Guest';
    this.password = localStorage.getItem('password') || '••••••••';
    this.imageUrl = localStorage.getItem('imageUrl') || 'assets/default-profile.png';
  }
}
