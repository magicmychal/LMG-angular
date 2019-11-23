import {async, getTestBed, TestBed} from '@angular/core/testing';
import {AuthenticationService} from './authentication.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {Test} from "tslint";
import { environment } from '../../environments/environment';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let httpMock: HttpTestingController;
  let loginResponse: any;


  beforeEach(async (() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthenticationService]
    });
    service = TestBed.get(AuthenticationService);
    httpMock = TestBed.get(HttpTestingController);
  }));

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    const service: AuthenticationService = TestBed.get(AuthenticationService);
    expect(service).toBeTruthy();
  });

  it('should send the correct login request', () => {
    loginResponse = {
      "auth_token": "1640bd56-000d-46cc-8e41-8f31672116d0"
    }

    service.login('admin@test.pl', 'test1234')
      .subscribe((response) => {
      expect(response).toEqual(loginResponse);
    });

    const request = httpMock.expectOne(`${environment.apiUrl}/login/admin`);
    expect(request.request.method).toBe('GET');
    request.flush(loginResponse);

  })
});
