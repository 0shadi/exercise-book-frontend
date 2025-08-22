import { TestBed } from '@angular/core/testing';

import { OnlineOrderingService } from './online-ordering.service';

describe('OnlineOrderingService', () => {
  let service: OnlineOrderingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnlineOrderingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
