import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizedOrderListComponent } from './customized-order-list.component';

describe('CustomizedOrderListComponent', () => {
  let component: CustomizedOrderListComponent;
  let fixture: ComponentFixture<CustomizedOrderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomizedOrderListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomizedOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
