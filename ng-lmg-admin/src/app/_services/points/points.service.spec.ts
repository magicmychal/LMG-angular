import {async, TestBed} from '@angular/core/testing';
import { PointsService } from './points.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import { environment } from '@environments/environment';
import {HttpResponse} from "@angular/common/http";

describe('AddPointService', () => {
  let service: PointsService;
  let httpMock: HttpTestingController;
  let pointsResponse: object;
  let addPointResponse: any;

  beforeEach(async (() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PointsService]
    });
    service = TestBed.get(PointsService);
    httpMock = TestBed.get(HttpTestingController);
  }));

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    const service: PointsService = TestBed.get(PointsService);
    expect(service).toBeTruthy();
  });

  it('should make a request to get points', function () {
    pointsResponse = [
      {
        "id": "bff66d65-1ba1-48ea-856a-5d530c3c68a1",
        "name": "dupa",
        "description": "description",
        "code": "dupa",
        "location": {
          "latitude": 123.123,
          "longitude": 321.321,
          "name": "location.name"
        }
      },
      {
        "id": "8702bef7-b409-4083-a931-bfd3f1fab947",
        "name": "dupa",
        "description": "description",
        "code": "845936",
        "location": {
          "latitude": 123.123,
          "longitude": 321.321,
          "name": "location.name"
        }
      },
      {
        "id": "6f0f08ea-8ef0-4b5d-acab-44781dc79f68",
        "name": "Katowice",
        "description": "Katowice sa super",
        "code": "873816",
        "location": {
          "latitude": 50.28889,
          "longitude": 19.11215,
          "name": "location"
        }
      },
      {
        "id": "4aa4623f-4b98-459c-812e-b4121467b38c",
        "name": "śWIDNICA",
        "description": "Świdnica zajebista jest",
        "code": "913309",
        "location": {
          "latitude": 50.8409,
          "longitude": 16.48466,
          "name": "location"
        }
      }
    ]

    service.getPoints()
      .subscribe((response) => {
        expect(response).toEqual(pointsResponse);
      });

    const request = httpMock.expectOne(`${environment.apiUrl}/point`);
    expect(request.request.method).toBe('GET');
    request.flush(pointsResponse);

  });

  it('should send a request to add a new point', function () {
    addPointResponse = {
      "id": "3e1fe4af-617f-4758-a457-32033fce2cc9",
      "name": "Location name",
      "description": "Location description",
      "code": "403150",
      "location": {
        "latitude": 50.28889,
        "longitude": 19.11215,
        "name": "Katowice"
      }
    }

    service.addNewPoint('Location name', 'Location description',
      50.28889, 19.11215, 'Katowice')
      .subscribe((response) => {
        console.log('to jest response, ', response);
        expect(response).toEqual(addPointResponse);
      });

    const request = httpMock.expectOne(`${environment.apiUrl}/point`);
    expect(request.request.method).toBe('POST')
    request.flush(addPointResponse);

  });
});
