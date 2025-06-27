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
import { AppointmentConfirmationComponent } from './app/appointment-confirmation/appointment-confirmation.component';
import { EditAppointmentComponent } from './app/edit-appointment/edit-appointment.component';
import { YourAppointmentsComponent } from './app/your-appointments/your-appointments.component';
import { ViewPrescriptionComponent } from './app/view-prescription/view-prescription.component';
import { MedicalHistoryComponent } from './app/medical-history/medical-history.component';
import { ProfileComponent } from './app/profile/profile.component';
import { AvailabilitySlotDocComponent } from './app/availability-slot-doc/availability-slot-doc.component';
import { BusySlotsDocComponent } from './app/busy-slots-doc/busy-slots-doc.component';
import { UnblockBusySlotsDocComponent } from './app/unblock-busy-slots-doc/unblock-busy-slots-doc.component';
import { DocViewMyappointmentComponent } from './app/doc-view-myappointment/doc-view-myappointment.component';
import { CreateConsultationComponent } from './app/create-consultation/create-consultation.component';
import { EditConsultationComponent } from './app/edit-consultation/edit-consultation.component';
import { DocViewMedicalHistoryComponent } from './app/doc-view-medical-history/doc-view-medical-history.component';
import { CreateAccountComponent } from './app/create-account/create-account.component';
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
  { path: 'appointment-confirmation', component: AppointmentConfirmationComponent },
  { path: 'edit-appointment', component: EditAppointmentComponent },
  { path: 'view-prescription', component: ViewPrescriptionComponent },
  { path: 'medical-history', component: MedicalHistoryComponent },
  { path: 'profile/:userId', component: ProfileComponent },
  { path: 'availability-slot-doc', component: AvailabilitySlotDocComponent },
  { path: 'busy-slots-doc', component: BusySlotsDocComponent },
  {path:'unblock-busy-slots-doc', component: UnblockBusySlotsDocComponent},
  { path: 'doc-view-myappointment', component: DocViewMyappointmentComponent },
  { path: 'create-consultation', component: CreateConsultationComponent },
  { path: 'edit-consultation', component: EditConsultationComponent },
  { path: 'doc-view-medical-history', component: DocViewMedicalHistoryComponent },
  { path: 'create-account', component: CreateAccountComponent }
];


bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient()
  ]
});
