import { Component } from '@angular/core';
import { ProductService } from '../../../Services/Product/product.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonModule } from '@angular/common';
import { SpinnerLoadingComponent } from '../../Common/spinner-loading/spinner-loading.component';
import { Router } from '@angular/router';
import { PATH_DASHBOARD } from '../../../Constants/path';
import { CartState } from '../../../../store/reducers/cart.reducer';
import { Store } from '@ngrx/store';
import * as CartActions from '../../../../store/actions/cart.actions';


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [SpinnerLoadingComponent, CommonModule,],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  
  products: any[] = [];
  filteredProducts: any[] = [];
  searchQuery: string = '';
  selectedCategory: string = 'all';
  selectedSort: string = 'default';



  constructor(
    private productService: ProductService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private store: Store<{ cart: CartState }>
  ) {
   
  }

  ngOnInit() {
    this.loadProducts();
  }
  
  loadProducts() {
    this.spinner.show();
    setTimeout(() => {
      this.productService.getAllProducts().subscribe(
        (data: any) => {
          this.products = data.data;
          this.filteredProducts = [...this.products];
          this.spinner.hide();
        },
        (error: any) => {
          console.error('Error fetching products:', error);
          this.spinner.hide();
        }
      );
    }, 500);
  }

  addProduct(productId: string): void {
    this.store.dispatch(CartActions.addProductToCart({ productId, quantity: 1 }));
  }

  onSearch(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.searchQuery = inputElement.value;
    this.applyFilters();
  }

  onCategoryFilter(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedCategory = selectElement.value;
    this.applyFilters();
  }

  onSort(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedSort = selectElement.value;
    this.applyFilters();
  }

  applyFilters() {
    let filtered = [...this.products];

    // Search Filter
    if (this.searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    // Category Filter
    if (this.selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === this.selectedCategory);
    }

    // Sort Filter
    switch (this.selectedSort) {
      case 'nameAsc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'nameDesc':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'priceAsc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'priceDesc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'ratingAsc':
        filtered.sort((a, b) => a.rating - b.rating);
        break;
      case 'ratingDesc':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    this.filteredProducts = filtered;
  }

  seeProductDetails(id: string) {
    this.router.navigate(['/dashboard/products', id]);
  }
}
