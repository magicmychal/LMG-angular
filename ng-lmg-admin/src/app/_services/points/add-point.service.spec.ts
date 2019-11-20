import { TestBed } from '@angular/core/testing';

import { AddPointService } from './add-point.service';

describe('AddPointService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddPointService = TestBed.get(AddPointService);
    expect(service).toBeTruthy();
  });
});
