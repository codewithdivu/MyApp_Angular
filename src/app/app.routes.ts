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
import { ProductCheckoutComponent } from './Components/Products/product-checkout/product-checkout.component';
import { ProductBillingComponent } from './Components/Products/product-billing/product-billing.component';
import { ProductAddressComponent } from './Components/Products/product-address/product-address.component';
import { ContactComponent } from './Components/Dashboard/contact/contact.component';
import { AboutComponent } from './Components/Dashboard/about/about.component';

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
        component: ProductListComponent,
        pathMatch: 'full',
        title: 'Home',
      },
      // {
      //   path:'products',
      //   component:ProductListComponent,
      //   pathMatch: 'full',
      //   title:"Product List"
      // },
      {
        path:'products/:id',
        component:ProductDetailsComponent,
        title:"Product Detail"        
      },
      {
        path:'checkout',
        component:ProductCheckoutComponent,
        title:"Cart Checkout"
      },
      {
        path:'address',
        component:ProductAddressComponent,
        title:"Order Address"
      },
      {
        path:'billing',
        component:ProductBillingComponent,
        title:"Order Billing"
      },
      {
        path:'contact-us',
        component:ContactComponent,
        title:"Contact Us"
      },
      {
        path:'about',
        component:AboutComponent,
        title:"About"
      },
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
