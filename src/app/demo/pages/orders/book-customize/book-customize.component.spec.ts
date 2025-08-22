import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCustomizeComponent } from './book-customize.component';

describe('BookCustomizeComponent', () => {
  let component: BookCustomizeComponent;
  let fixture: ComponentFixture<BookCustomizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookCustomizeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookCustomizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
