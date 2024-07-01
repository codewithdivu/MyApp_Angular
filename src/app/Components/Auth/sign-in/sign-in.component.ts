import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, NgModule, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngxpert/hot-toast';
import { NgxSpinner, NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { SpinnerLoadingComponent } from '../../Common/spinner-loading/spinner-loading.component';
import { PATH_DASHBOARD } from '../../../Constants/path';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../Services/Auth/auth.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, SpinnerLoadingComponent, CommonModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {
  signinForm: FormGroup;
  private toastService = inject(HotToastService);

  validationMessages = {
    email: {
      required: 'Email is required.',
      email: 'Please enter a valid email address.',
    },
    password: {
      required: 'Password is required.',
    },
  };

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
    // creating signin form
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      remember_me: [false],
    });

    const loginCredentialString = localStorage.getItem('loginCredential');

    if (loginCredentialString) {
      const loginCredential = JSON.parse(loginCredentialString);

      if (loginCredential) {
        this.signinForm.patchValue({
          email: loginCredential.email,
          password: loginCredential.password,
        });
      }
    }
  }

  onSubmit() {
    if (this.signinForm.valid) {
      this.spinner.show();
      const loginData = this.signinForm.value;
      setTimeout(() => {
        this.authService
          .login({
            email: loginData.email,
            password: loginData.password,
          })
          .subscribe(
            (res: any) => {
              console.log('res', res);
              if (res.success) {
                this.toastService.success(res.msg);
                if (loginData.remember_me) {
                  localStorage.setItem(
                    'loginCredential',
                    JSON.stringify({
                      email: loginData.email,
                      password: loginData.password,
                    })
                  );
                }
                this.router.navigate([PATH_DASHBOARD.root]);
              } else {
                this.toastService.error(res.msg);
              }
              this.spinner.hide();
            },
            (error: any) => {
              this.toastService.error(error.error.msg);
              console.log('error', error);
              this.spinner.hide();
            }
          );
      }, 1000);
    } else {
      this.signinForm.markAllAsTouched();
    }
  }

  handleSignInWithGoogle() {
    console.log('signing...with....google');
  }
}
