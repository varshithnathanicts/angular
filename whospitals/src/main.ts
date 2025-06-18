import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter, Routes } from '@angular/router';
import { WelcomeComponent } from './app/welcome/welcome.component';
import { DashboardComponent } from './app/dashboard/dashboard.component';

import { provideHttpClient } from '@angular/common/http';
import { LoginComponent } from './app/login/login.component';
import { CreateAccountComponent } from './app/create-account/create-account.component';
import { ProfileComponent } from './app/profile/profile.component';
import { CreateAppointmentComponent } from './app/create-appointment/create-appointment.component';
import { NewAppointmentComponent } from './app/new-appointment/new-appointment.component';

// ✅ Fix: use '=' not just ':' when declaring 'routes'
const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'create-account', component: CreateAccountComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'create-appointment', component: CreateAppointmentComponent },
  { path: 'new-appointment/:id', component: NewAppointmentComponent }
];


bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient()
  ]
});
