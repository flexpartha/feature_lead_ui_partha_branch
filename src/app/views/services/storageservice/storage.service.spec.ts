import { TestBed } from '@angular/core/testing';

import { StorageManageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageManageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageManageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
