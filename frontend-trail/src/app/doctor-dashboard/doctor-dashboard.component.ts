import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css']
})
export class DoctorDashboardComponent {
  constructor(private router: Router) {}

  goToSlots() {
    this.router.navigate(['/availability-slot-doc']);
  }
  goToBusySlots(){
    this.router.navigate(['/busy-slots-doc']);
  }
  goToUnBlockSlots(){
    this.router.navigate(['/unblock-busy-slots-doc']);
  }
  goToDocViewMyAppointment(){
    this.router.navigate(['/doc-view-myappointment']);
  }
}
