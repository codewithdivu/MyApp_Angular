import { Component } from '@angular/core';

@Component({
  selector: 'app-product-billing',
  standalone: true,
  imports: [],
  templateUrl: './product-billing.component.html',
  styleUrl: './product-billing.component.css'
})
export class ProductBillingComponent {
  constructor() { }

 
  onSubmit(formData: any) {
    // Log the form data to the console
    console.log(formData.value);
    // You can reset the form after submission
    formData.resetForm();
  }
  
}
