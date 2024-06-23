import { Component, ElementRef, ViewChild } from '@angular/core';
import { ProductService } from '../../../Services/Product/product.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SpinnerLoadingComponent } from '../../Common/spinner-loading/spinner-loading.component';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [SpinnerLoadingComponent, CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  product: any;
  productId!:string;


  constructor(
    private productService: ProductService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    
  }


  ngOnInit() {
    
    this.route.params.subscribe(params => {
      this.productId = params['id'];
      this.loadProduct(this.productId);
    });
  }

  
  loadProduct(id:string) {
    this.spinner.show();
    setTimeout(() => {
      this.productService.getProduct(id).subscribe(
        (data: any) => {
          this.product = data.data;
          console.log('data', data.data);
          this.spinner.hide();

        },
        (error: any) => {
          console.error('Error fetching products:', error);
          this.spinner.hide();
        }
      );
    }, 500);
  }




}
