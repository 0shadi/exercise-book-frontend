import { TestBed } from '@angular/core/testing';

import { EmployeeRegistrationServiceService } from './employee-registration-service.service';

describe('EmployeeRegistrationServiceService', () => {
  let service: EmployeeRegistrationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeRegistrationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
