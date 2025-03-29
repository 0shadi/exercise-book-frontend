import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellingItemRegistrationComponent } from './selling-item-registration.component';

describe('SellingItemRegistrationComponent', () => {
  let component: SellingItemRegistrationComponent;
  let fixture: ComponentFixture<SellingItemRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellingItemRegistrationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellingItemRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
