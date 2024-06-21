import { Component, inject } from '@angular/core';
import { SpinnerLoadingComponent } from '../../Common/spinner-loading/spinner-loading.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HotToastService } from '@ngxpert/hot-toast';
import { PATH_AUTH } from '../../../Constants/path';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [SpinnerLoadingComponent, ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent {
  otpForm: FormGroup;
  private toastService = inject(HotToastService);

  validationMessages = {
    email: {
      required: 'Email is required.',
      email: 'Please enter a valid email address.',
    },
    newPassword: {
      required: 'Password is required.',
    },
    otp1: {
      required: 'OTP is required.',
    },
    otp2: {
      required: 'OTP is required.',
    },
    otp3: {
      required: 'OTP is required.',
    },
    otp4: {
      required: 'OTP is required.',
    },
    otp5: {
      required: 'OTP is required.',
    },
    otp6: {
      required: 'OTP is required.',
    },
  };
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
    this.otpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      newPassword: ['', [Validators.required]],
      otp1: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
      otp2: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
      otp3: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
      otp4: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
      otp5: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
      otp6: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
    });

    const forgotEmail = localStorage.getItem('forgotPasswordEmail');

    if (forgotEmail) {
      this.otpForm.patchValue({
        email: forgotEmail,
      });
    } else {
      this.router.navigate([PATH_AUTH.forgotPassword]);
    }
  }
  // const otp = Object.values(this.otpForm.value).join('');

  onSubmit(): void {
    if (this.otpForm.valid) {
      console.log('this.otpForm.value', this.otpForm.value);
      this.spinner.show();
      const formData = this.otpForm.value;
      const otp = [
        formData.otp1,
        formData.otp2,
        formData.otp3,
        formData.otp4,
        formData.otp5,
        formData.otp6,
      ].join('');

      setTimeout(() => {
        this.http
          .post('http://localhost:8888/api/v1/auth/reset-password', {
            email: formData.email,
            newPassword: formData.newPassword,
            otp: Number(otp),
          })
          .subscribe(
            (res: any) => {
              console.log('res', res);
              if (res.success) {
                localStorage.removeItem('forgotPasswordEmail');
                this.toastService.success(res.msg);
                this.spinner.hide();
                this.router.navigate([PATH_AUTH.signin]);
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
      this.otpForm.markAllAsTouched();
    }
  }

  moveToNext(event: KeyboardEvent, index: number): void {
    const input = event.target as HTMLInputElement;
    if (input.value && index < 6) {
      const nextInput = document.querySelectorAll('input')[index];
      if (nextInput) {
        nextInput.focus();
      }
    }
  }
}
