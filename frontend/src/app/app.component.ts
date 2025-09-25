import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  template: `
    <div class="container">
      <div class="header">
        <h1><a routerLink="/">Issue Tracker</a></h1>
      </div>
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {}