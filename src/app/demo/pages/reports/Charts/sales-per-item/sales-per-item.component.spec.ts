import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesPerItemComponent } from './sales-per-item.component';

describe('SalesPerItemComponent', () => {
  let component: SalesPerItemComponent;
  let fixture: ComponentFixture<SalesPerItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesPerItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesPerItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
