import { SignUpComponent } from './Components/Auth/sign-up/sign-up.component';
import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './Layouts/auth-layout/auth-layout.component';
import { SignInComponent } from './Components/Auth/sign-in/sign-in.component';
import { DashboardLayoutComponent } from './Layouts/dashboard-layout/dashboard-layout.component';
import { AuthGuard } from './Guards/auth.guard';
import { HomeComponent } from './Components/Dashboard/home/home.component';
import { ForgotPasswordComponent } from './Components/Auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './Components/Auth/reset-password/reset-password.component';
import { NotFoundComponent } from './Components/Common/not-found/not-found.component';
import { ProductDetailsComponent } from './Components/Products/product-details/product-details.component';
import { ProductListComponent } from './Components/Products/product-list/product-list.component';

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
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        title: 'Forgot Password',
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent,
        title: 'Reset Password',
      },
    ],
  },
  // Dashboard
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: HomeComponent,
        pathMatch: 'full',
        title: 'Home',
      },
      {
        path:'products',
        component:ProductListComponent,
        title:"Product List"
      },
      {
        path:'products/:id',
        component:ProductDetailsComponent,
        title:"Product Detail"        
      }
    ],
  },
  // Not-Found
  // Catch-all route for 404 Not Found
  {
    path: '**',
    component: NotFoundComponent,
    title: 'Page Not Found',
  },
];
