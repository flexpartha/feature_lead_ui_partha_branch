import { TestBed } from '@angular/core/testing';

import { ExpertassessmentService } from './expertassessment.service';

describe('ExpertassessmentService', () => {
  let service: ExpertassessmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpertassessmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
