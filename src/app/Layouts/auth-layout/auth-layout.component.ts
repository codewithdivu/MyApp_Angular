import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './auth-layout.component.html',
  styles: ``,
})
export class AuthLayoutComponent {
  router = inject(Router);

  constructor() {
    const auth = localStorage.getItem('accessToken');
    if (auth != null) {
      this.router.navigate(['/dashbaord']);
    }
  }
}
