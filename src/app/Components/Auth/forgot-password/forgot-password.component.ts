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
import { PATH_AUTH } from '../../../Constants/path';
import { CommonModule } from '@angular/common';
import { AuthServiceService } from '../../../Services/auth-service.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, SpinnerLoadingComponent, CommonModule],
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
    private authService: AuthServiceService,
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
        this.authService.forgotPassword(formData.email).subscribe(
          (res: any) => {
            if (res.success) {
              this.toastService.success(res.msg);
              this.router.navigate([PATH_AUTH.resetPassword]);
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
      this.forgotPasswordForm.markAllAsTouched();
    }
  }
}
