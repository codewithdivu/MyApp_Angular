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

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, SpinnerLoadingComponent],
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
  }

  onSubmit() {
    if (this.signinForm.valid) {
      this.spinner.show();
      const loginData = this.signinForm.value;
      setTimeout(() => {
        this.http
          .post('http://localhost:8888/api/v1/auth/login', {
            email: loginData.email,
            password: loginData.password,
          })
          .subscribe(
            (res: any) => {
              console.log('res', res);
              if (res.success) {
                localStorage.setItem('accessToken', res.accessToken);
                localStorage.setItem('myAppAuth', JSON.stringify(res.data));
                this.toastService.success(res.msg);
                this.spinner.hide();
                this.router.navigate([PATH_DASHBOARD.root]);
              } else {
                this.toastService.error(res.msg);
                this.spinner.hide();
              }
            },
            (error: HttpErrorResponse) => {
              this.toastService.error(error.error.msg);
              console.log('error', error);
              this.spinner.hide();
            }
          );
      }, 2000);
    } else {
      this.signinForm.markAllAsTouched();
    }
  }

  handleSignInWithGoogle() {
    console.log('signing...with....google');
  }
}
