import { Component } from '@angular/core';
import { HeaderComponent } from './header-component/header-component.component';
import { RouterOutlet } from '@angular/router';


@Component({
    selector: 'app-root',
    standalone: true,
    imports: [HeaderComponent, RouterOutlet],
    template: `
      <app-header></app-header>
      <router-outlet></router-outlet>
    `
  })
  export class AppComponent {}
  