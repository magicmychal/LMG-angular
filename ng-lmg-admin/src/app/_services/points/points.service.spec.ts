import { TestBed } from '@angular/core/testing';

import { PointsService } from './points.service';

describe('AddPointService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PointsService = TestBed.get(PointsService);
    expect(service).toBeTruthy();
  });
});
