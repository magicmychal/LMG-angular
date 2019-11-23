import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { RequestService } from './request.service';

describe('RequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: RequestService = TestBed.get(RequestService);
    expect(service).toBeTruthy();
  });
});
