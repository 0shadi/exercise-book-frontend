import { TestBed } from '@angular/core/testing';

import { BookCustomizeService } from './book-customize.service';

describe('BookCustomizeService', () => {
  let service: BookCustomizeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookCustomizeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
