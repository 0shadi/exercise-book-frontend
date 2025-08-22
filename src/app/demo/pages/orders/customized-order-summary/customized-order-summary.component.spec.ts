import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizedOrderSummaryComponent } from './customized-order-summary.component';

describe('CustomizedOrderSummaryComponent', () => {
  let component: CustomizedOrderSummaryComponent;
  let fixture: ComponentFixture<CustomizedOrderSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomizedOrderSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomizedOrderSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
