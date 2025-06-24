import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { AppComponent } from './app/app.component';
import { BannerComponent } from './app/banner-component/banner-component.component';
import { DoctorsComponent } from './app/doctors-component/doctors-component.component';
import { LoginComponentComponent } from './app/login-component/login-component.component';
import { PatientDashboardComponent } from './app/patient-dashboard/patient-dashboard.component';
import { DoctorDashboardComponent } from './app/doctor-dashboard/doctor-dashboard.component';
import { CreateAppointmentComponent } from './app/create-appointment/create-appointment.component';
import { UpdateAppointmentComponent } from './app/update-appointment/update-appointment.component';
import { CancelAppointmentComponent } from './app/cancel-appointment/cancel-appointment.component';
import { BookAppointmentComponent } from './app/book-appointment/book-appointment.component';
import { AvailabilitySlotsComponent } from './app/availability-slots/availability-slots.component';
import { AppointmentConfirmationComponent } from './app/appointment-confirmation/appointment-confirmation.component';
import { EditAppointmentComponent } from './app/edit-appointment/edit-appointment.component';
import { YourAppointmentsComponent } from './app/your-appointments/your-appointments.component';
import { ViewPrescriptionComponent } from './app/view-prescription/view-prescription.component';
import { MedicalHistoryComponent } from './app/medical-history/medical-history.component';
import { ProfileComponent } from './app/profile/profile.component';


const routes = [
  { path: '', component: BannerComponent },
  { path: 'doctors', component: DoctorsComponent },
  { path: 'login', component: LoginComponentComponent },
  { path: 'patient-dashboard', component: PatientDashboardComponent },
  { path: 'doctor-dashboard', component: DoctorDashboardComponent },
  { path: 'create-appointment', component: CreateAppointmentComponent },
  { path: 'update-appointment', component: UpdateAppointmentComponent },
  { path: 'your-appointment', component: YourAppointmentsComponent },
  { path: 'book-appointment', component: BookAppointmentComponent },
  { path: 'availability-slots', component: AvailabilitySlotsComponent },
  { path: 'appointment-confirmation', component: AppointmentConfirmationComponent },
  { path: 'edit-appointment', component: EditAppointmentComponent },
  { path: 'view-prescription', component: ViewPrescriptionComponent },
  { path: 'medical-history', component: MedicalHistoryComponent },
  { path: 'profile/:userId', component: ProfileComponent }


  
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient()
  ]
});
