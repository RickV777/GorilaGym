import { TestBed } from '@angular/core/testing';

import { ClaseServiceService } from './clase-service.service';

describe('ClaseServiceService', () => {
  let service: ClaseServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClaseServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
