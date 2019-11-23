import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { PointsService } from './points.service';

describe('AddPointService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: PointsService = TestBed.get(PointsService);
    expect(service).toBeTruthy();
  });
});
