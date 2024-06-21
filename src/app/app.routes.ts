import { SignUpComponent } from './Components/Auth/sign-up/sign-up.component';
import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './Layouts/auth-layout/auth-layout.component';
import { SignInComponent } from './Components/Auth/sign-in/sign-in.component';
import { DashboardLayoutComponent } from './Layouts/dashboard-layout/dashboard-layout.component';
import { AuthGuard } from './Guards/auth.guard';
import { HomeComponent } from './Components/Dashboard/home/home.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/signin',
    pathMatch: 'full',
  },
  // Auth
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'signup',
        component: SignUpComponent,
        title: 'SignUp',
      },
      {
        path: 'signin',
        component: SignInComponent,
        title: 'SignIn',
      },
    ],
  },
  // Dashboard
  {
    path: 'dashbaord',
    component: DashboardLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: HomeComponent,
        pathMatch: 'full',
        title: 'Home',
      },
    ],
  },
];
