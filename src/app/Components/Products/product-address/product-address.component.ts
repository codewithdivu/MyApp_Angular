import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PATH_DASHBOARD } from '../../../Constants/path';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-address',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './product-address.component.html',
  styleUrl: './product-address.component.css'
})
export class ProductAddressComponent {
  infoForm!: FormGroup;

  constructor(private fb: FormBuilder,private router:Router) { }

  ngOnInit(): void {
    const addressData = localStorage.getItem('CheckOutAddress');
    const parsedAddressData = addressData ? JSON.parse(addressData) : null;

    this.infoForm = this.fb.group({
      name: [parsedAddressData ? parsedAddressData.name : '', Validators.required],
      phone: [parsedAddressData ? parsedAddressData.phone : '', Validators.required],
      address: [parsedAddressData ? parsedAddressData.address : '', Validators.required],
      zipcode: [parsedAddressData ? parsedAddressData.zipcode : '', Validators.required],
      city: [parsedAddressData ? parsedAddressData.city : '', Validators.required],
      state: [parsedAddressData ? parsedAddressData.state : '', Validators.required]
    });
  }

  onSubmit() {
    if (this.infoForm.valid) {
      console.log('Form Data:', this.infoForm.value);
      localStorage.setItem("CheckOutAddress",JSON.stringify(this.infoForm.value))
      this.router.navigate([PATH_DASHBOARD.general.billing])
    } else {
      console.error('Form is invalid');
    }
  }
}
