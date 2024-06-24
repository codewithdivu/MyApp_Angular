import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAddressComponent } from './product-address.component';

describe('ProductAddressComponent', () => {
  let component: ProductAddressComponent;
  let fixture: ComponentFixture<ProductAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductAddressComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
