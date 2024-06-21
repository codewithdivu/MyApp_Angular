import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngxpert/hot-toast';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  user: any = {};
  private toastService = inject(HotToastService);

  constructor(private router: Router) {
    if (localStorage.getItem('myAppAuth')) {
      const user: any = JSON.parse(localStorage.getItem('myAppAuth')!);
      this.user = user;
    }
  }

  handleLogout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('myAppAuth');
    this.toastService.success('Successfully Logout.');
    this.router.navigate(['/auth/signin']);
  }
}
