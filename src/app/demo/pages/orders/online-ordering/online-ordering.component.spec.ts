import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineOrderingComponent } from './online-ordering.component';

describe('OnlineOrderingComponent', () => {
  let component: OnlineOrderingComponent;
  let fixture: ComponentFixture<OnlineOrderingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnlineOrderingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnlineOrderingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
