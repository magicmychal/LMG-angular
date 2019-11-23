import { TestBed } from '@angular/core/testing';
import { SearchService } from './search.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

fdescribe('SearchService', () => {
  let service: SearchService;
  let httpMock: HttpTestingController;
  let searchResponse: object;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SearchService]
    });
    service = TestBed.get(SearchService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    const service: SearchService = TestBed.get(SearchService);
    expect(service).toBeTruthy();
  });

  it('should return a JSON string of search results'), () => {
      searchResponse = {
        "results": {
          "items": [
            {
              "position": [
                50.8409,
                16.48466
              ],
              "bbox": [
                16.45513,
                50.80817,
                16.5298,
                50.87314
              ],
              "distance": 231696,
              "title": "Świdnica",
              "category": {
                "id": "city-town-village",
                "title": "City, Town or Village",
                "href": "https://places.demo.api.here.com/places/v1/categories/places/city-town-village?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg",
                "type": "urn:nlp-types:category",
                "system": "places"
              },
              "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/35.icon",
              "vicinity": "Powiat Świdnicki, Woj. Dolnośląskie",
              "having": [],
              "type": "urn:nlp-types:place",
              "href": "https://places.demo.api.here.com/places/v1/places/loc-dmVyc2lvbj0xO3RpdGxlPSVDNSU5QXdpZG5pY2E7bGFuZz1wbDtsYXQ9NTAuODQwOTtsb249MTYuNDg0NjY7Y2l0eT0lQzUlOUF3aWRuaWNhO3Bvc3RhbENvZGU9NTgtMTAwO2NvdW50cnk9UE9MO3N0YXRlPVdvai4rRG9sbm8lQzUlOUJsJUM0JTg1c2tpZTtjb3VudHk9UG93aWF0KyVDNSU5QXdpZG5pY2tpO2NhdGVnb3J5SWQ9Y2l0eS10b3duLXZpbGxhZ2U7c291cmNlU3lzdGVtPWludGVybmFsO3Bkc0NhdGVnb3J5SWQ9OTAwLTkxMDAtMDAwMA;context=Zmxvdy1pZD0yNTE5YTI0YS00ZDdjLTUxYjctYTliNi1iNWE0ZjlkZWIxZDVfMTU3NDUxOTc3OTQxNV83MTI2XzYxNDAmYmJveD0xNi40NTUxMyUyQzUwLjgwODE3JTJDMTYuNTI5OCUyQzUwLjg3MzE0JnJhbms9MA?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg",
              "id": "loc-dmVyc2lvbj0xO3RpdGxlPSVDNSU5QXdpZG5pY2E7bGFuZz1wbDtsYXQ9NTAuODQwOTtsb249MTYuNDg0NjY7Y2l0eT0lQzUlOUF3aWRuaWNhO3Bvc3RhbENvZGU9NTgtMTAwO2NvdW50cnk9UE9MO3N0YXRlPVdvai4rRG9sbm8lQzUlOUJsJUM0JTg1c2tpZTtjb3VudHk9UG93aWF0KyVDNSU5QXdpZG5pY2tpO2NhdGVnb3J5SWQ9Y2l0eS10b3duLXZpbGxhZ2U7c291cmNlU3lzdGVtPWludGVybmFsO3Bkc0NhdGVnb3J5SWQ9OTAwLTkxMDAtMDAwMA"
            },
            {
              "position": [
                51.88804,
                15.38879
              ],
              "bbox": [
                15.2318,
                51.83338,
                15.47666,
                51.98609
              ],
              "distance": 232273,
              "title": "Świdnica",
              "category": {
                "id": "city-town-village",
                "title": "City, Town or Village",
                "href": "https://places.demo.api.here.com/places/v1/categories/places/city-town-village?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg",
                "type": "urn:nlp-types:category",
                "system": "places"
              },
              "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/35.icon",
              "vicinity": "Powiat Zielonogórski, Woj. Lubuskie",
              "having": [],
              "type": "urn:nlp-types:place",
              "href": "https://places.demo.api.here.com/places/v1/places/loc-dmVyc2lvbj0xO3RpdGxlPSVDNSU5QXdpZG5pY2E7bGFuZz1wbDtsYXQ9NTEuODg4MDQ7bG9uPTE1LjM4ODc5O2NpdHk9JUM1JTlBd2lkbmljYTtwb3N0YWxDb2RlPTY2LTAwODtjb3VudHJ5PVBPTDtzdGF0ZT1Xb2ouK0x1YnVza2llO2NvdW50eT1Qb3dpYXQrWmllbG9ub2clQzMlQjNyc2tpO2NhdGVnb3J5SWQ9Y2l0eS10b3duLXZpbGxhZ2U7c291cmNlU3lzdGVtPWludGVybmFsO3Bkc0NhdGVnb3J5SWQ9OTAwLTkxMDAtMDAwMA;context=Zmxvdy1pZD0yNTE5YTI0YS00ZDdjLTUxYjctYTliNi1iNWE0ZjlkZWIxZDVfMTU3NDUxOTc3OTQxNV83MTI2XzYxNDAmYmJveD0xNS4yMzE4JTJDNTEuODMzMzglMkMxNS40NzY2NiUyQzUxLjk4NjA5JnJhbms9MQ?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg",
              "id": "loc-dmVyc2lvbj0xO3RpdGxlPSVDNSU5QXdpZG5pY2E7bGFuZz1wbDtsYXQ9NTEuODg4MDQ7bG9uPTE1LjM4ODc5O2NpdHk9JUM1JTlBd2lkbmljYTtwb3N0YWxDb2RlPTY2LTAwODtjb3VudHJ5PVBPTDtzdGF0ZT1Xb2ouK0x1YnVza2llO2NvdW50eT1Qb3dpYXQrWmllbG9ub2clQzMlQjNyc2tpO2NhdGVnb3J5SWQ9Y2l0eS10b3duLXZpbGxhZ2U7c291cmNlU3lzdGVtPWludGVybmFsO3Bkc0NhdGVnb3J5SWQ9OTAwLTkxMDAtMDAwMA"
            },
            {
              "position": [
                50.85496,
                16.53579
              ],
              "bbox": [
                16.33403,
                50.71129,
                16.6047,
                50.90555
              ],
              "distance": 228195,
              "title": "Świdnica (Gmina)",
              "category": {
                "id": "city-town-village",
                "title": "City, Town or Village",
                "href": "https://places.demo.api.here.com/places/v1/categories/places/city-town-village?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg",
                "type": "urn:nlp-types:category",
                "system": "places"
              },
              "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/35.icon",
              "vicinity": "Powiat Świdnicki, Woj. Dolnośląskie",
              "having": [],
              "type": "urn:nlp-types:place",
              "href": "https://places.demo.api.here.com/places/v1/places/loc-dmVyc2lvbj0xO3RpdGxlPSVDNSU5QXdpZG5pY2ErJTI4R21pbmElMjk7bGFuZz1wbDtsYXQ9NTAuODU0OTY7bG9uPTE2LjUzNTc5O2NpdHk9JUM1JTlBd2lkbmljYSslMjhHbWluYSUyOTtjb3VudHJ5PVBPTDtzdGF0ZT1Xb2ouK0RvbG5vJUM1JTlCbCVDNCU4NXNraWU7Y291bnR5PVBvd2lhdCslQzUlOUF3aWRuaWNraTtjYXRlZ29yeUlkPWNpdHktdG93bi12aWxsYWdlO3NvdXJjZVN5c3RlbT1pbnRlcm5hbDtwZHNDYXRlZ29yeUlkPTkwMC05MTAwLTAwMDA;context=Zmxvdy1pZD0yNTE5YTI0YS00ZDdjLTUxYjctYTliNi1iNWE0ZjlkZWIxZDVfMTU3NDUxOTc3OTQxNV83MTI2XzYxNDAmYmJveD0xNi4zMzQwMyUyQzUwLjcxMTI5JTJDMTYuNjA0NyUyQzUwLjkwNTU1JnJhbms9Mg?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg",
              "id": "loc-dmVyc2lvbj0xO3RpdGxlPSVDNSU5QXdpZG5pY2ErJTI4R21pbmElMjk7bGFuZz1wbDtsYXQ9NTAuODU0OTY7bG9uPTE2LjUzNTc5O2NpdHk9JUM1JTlBd2lkbmljYSslMjhHbWluYSUyOTtjb3VudHJ5PVBPTDtzdGF0ZT1Xb2ouK0RvbG5vJUM1JTlCbCVDNCU4NXNraWU7Y291bnR5PVBvd2lhdCslQzUlOUF3aWRuaWNraTtjYXRlZ29yeUlkPWNpdHktdG93bi12aWxsYWdlO3NvdXJjZVN5c3RlbT1pbnRlcm5hbDtwZHNDYXRlZ29yeUlkPTkwMC05MTAwLTAwMDA"
            }
          ]
        },
        "search": {
          "context": {
            "location": {
              "position": [
                52.4157,
                18.6832
              ],
              "address": {
                "text": "Mchówek<br/>87-865 Izbica Kujawska<br/>Poland",
                "street": "Mchówek",
                "postalCode": "87-865",
                "district": "Mchówek",
                "city": "Izbica Kujawska",
                "county": "Powiat Włocławski",
                "stateCode": "Woj. Kujawsko-Pomorskie",
                "country": "Poland",
                "countryCode": "POL"
              }
            },
            "type": "urn:nlp-types:place",
            "href": "https://places.demo.api.here.com/places/v1/places/loc-dmVyc2lvbj0xO3RpdGxlPU1jaCVDMyVCM3dlaztsYXQ9NTIuNDE1Nztsb249MTguNjgzMjtzdHJlZXQ9TWNoJUMzJUIzd2VrO2NpdHk9SXpiaWNhK0t1amF3c2thO3Bvc3RhbENvZGU9ODctODY1O2NvdW50cnk9UE9MO2Rpc3RyaWN0PU1jaCVDMyVCM3dlaztzdGF0ZUNvZGU9V29qLitLdWphd3Nrby1Qb21vcnNraWU7Y291bnR5PVBvd2lhdCtXJUM1JTgyb2MlQzUlODJhd3NraTtjYXRlZ29yeUlkPXN0cmVldC1zcXVhcmU7c291cmNlU3lzdGVtPWludGVybmFs;context=c2VhcmNoQ29udGV4dD0x?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg"
          },
          "ranking": "default"
        }
      }

      service.search('Świdnica')
        .subscribe((response) => {
          expect(response).toEqual(searchResponse);
        });

      const request = httpMock.expectOne('https://places.demo.api.here.com/places/v1/discover/search');
      expect(request.request.method).toBe('GET');
      request.flush(searchResponse);
  };
});
