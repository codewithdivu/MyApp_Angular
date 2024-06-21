import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  signupForm: FormGroup;

  validationMessages = {
    username: {
      require: 'Username is required',
    },
    name: {
      require: 'Name is required',
    },
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
    private router: Router,
    private http: HttpClient
  ) {
    // creating singup form
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      username: ['', [Validators.required]],
      name: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const signUpData = this.signupForm.value;
      this.http
        .post('http://localhost:8888/api/v1/auth/register', {
          ...signUpData,
        })
        .subscribe(
          (res: any) => {
            if (res.success) {
              this.router.navigate(['/auth/signin']);
            } else {
              alert(`error : ${res.message}`);
            }
          },
          (error: HttpErrorResponse) => {
            console.log('error', error);
          }
        );
    } else {
      this.signupForm.markAllAsTouched();
    }
  }
}
