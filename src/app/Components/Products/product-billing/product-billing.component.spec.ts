import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBillingComponent } from './product-billing.component';

describe('ProductBillingComponent', () => {
  let component: ProductBillingComponent;
  let fixture: ComponentFixture<ProductBillingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductBillingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
