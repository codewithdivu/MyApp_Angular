import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngxpert/hot-toast';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule],
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
    private router: Router
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
      const loginData = this.signinForm.value;
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
              this.router.navigate(['/dashbaord']);
            } else {
              this.toastService.error(res.msg);
            }
          },
          (error: HttpErrorResponse) => {
            this.toastService.error(error.error.msg);
            console.log('error', error);
          }
        );
    } else {
      this.signinForm.markAllAsTouched();
    }
  }

  handleSignInWithGoogle() {
    console.log('signing...with....google');
  }
}
