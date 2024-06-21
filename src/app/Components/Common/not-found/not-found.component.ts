import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PATH_DASHBOARD } from '../../../Constants/path';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css',
})
export class NotFoundComponent {
  constructor(private router: Router) {}

  handleBackHome = () => {
    this.router.navigate([PATH_DASHBOARD.root]);
  };
}
