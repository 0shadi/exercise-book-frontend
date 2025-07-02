import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizedOrderCheckoutComponent } from './customized-order-checkout.component';

describe('CustomizedOrderCheckoutComponent', () => {
  let component: CustomizedOrderCheckoutComponent;
  let fixture: ComponentFixture<CustomizedOrderCheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomizedOrderCheckoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomizedOrderCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
