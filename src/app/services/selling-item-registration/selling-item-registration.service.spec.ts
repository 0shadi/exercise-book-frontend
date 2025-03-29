import { TestBed } from '@angular/core/testing';

import { SellingItemRegistrationService } from './selling-item-registration.service';

describe('SellingItemRegistrationService', () => {
  let service: SellingItemRegistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SellingItemRegistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
