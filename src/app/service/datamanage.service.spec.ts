import { TestBed } from '@angular/core/testing';

import { DatamanageService } from './datamanage.service';

describe('DatamanageService', () => {
  let service: DatamanageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatamanageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
