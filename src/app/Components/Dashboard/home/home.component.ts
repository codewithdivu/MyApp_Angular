import { Component } from '@angular/core';
import { ProductService } from '../../../Services/Product/product.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerLoadingComponent } from '../../Common/spinner-loading/spinner-loading.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SpinnerLoadingComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  products: any[] = [];

  constructor(
    private productService: ProductService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.spinner.show();
    setTimeout(() => {
      this.productService.getAllProducts().subscribe(
        (data: any) => {
          this.products = data;
          console.log('data', data);
          this.spinner.hide();
        },
        (error: any) => {
          console.error('Error fetching products:', error);
          this.spinner.hide();
        }
      );
    }, 2000);
  }
}
