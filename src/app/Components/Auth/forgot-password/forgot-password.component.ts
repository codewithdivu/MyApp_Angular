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
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerLoadingComponent } from '../../Common/spinner-loading/spinner-loading.component';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, SpinnerLoadingComponent],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  private toastService = inject(HotToastService);

  validationMessages = {
    email: {
      required: 'Email is required.',
      email: 'Please enter a valid email address.',
    },
  };

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
    // creating signin form
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      this.spinner.show();
      const formData = this.forgotPasswordForm.value;
      setTimeout(() => {
        this.http
          .post('http://localhost:8888/api/v1/auth/forgot-password', {
            email: formData.email,
          })
          .subscribe(
            (res: any) => {
              console.log('res', res);
              if (res.success) {
                localStorage.setItem('forgotPasswordEmail', formData.email);
                this.toastService.success(res.msg);
                this.spinner.hide();
                this.router.navigate(['/auth/reset-password']);
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
      this.forgotPasswordForm.markAllAsTouched();
    }
  }
}
