import { TestBed } from '@angular/core/testing';

import { AssesmentSharedService } from './assesment-shared.service';

describe('AssesmentSharedService', () => {
  let service: AssesmentSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssesmentSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
