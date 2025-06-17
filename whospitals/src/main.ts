import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter, Routes } from '@angular/router';
import { WelcomeComponent } from './app/welcome/welcome.component';
import { DashboardComponent } from './app/dashboard/dashboard.component';

import { provideHttpClient } from '@angular/common/http';
import { LoginComponent } from './app/login/login.component';
import { CreateAccountComponent } from './app/create-account/create-account.component';

// ✅ Fix: use '=' not just ':' when declaring 'routes'
const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'create-account', component: CreateAccountComponent }
];




bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient()
  ]
});
