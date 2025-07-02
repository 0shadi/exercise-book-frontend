import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingDetailsDialogComponent } from './billing-details-dialog.component';

describe('BillingDetailsDialogComponent', () => {
  let component: BillingDetailsDialogComponent;
  let fixture: ComponentFixture<BillingDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillingDetailsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillingDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
