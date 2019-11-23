import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {SearchService} from "../../_services/map/search.service";


@Component({
  selector: 'app-map-search',
  templateUrl: './map-search.component.html',
  styleUrls: ['./map-search.component.scss']
})
export class MapSearchComponent implements OnInit {


  results: any[] = [];
  queryField: FormControl = new FormControl();

  constructor(private _searchService: SearchService) {
  }

  ngOnInit(): void {
    this.queryField.valueChanges
      .subscribe(queryField => this._searchService.search(queryField)
        .subscribe(response => {
          // TODO: Response status not working properly.
          if (response === 400) {
            return;
          } else {
            this.showResults(response)
            //this.results = response.json().artists.items;
          }
        }));
  }

  showResults(results) {
    console.log(results)
    this.results['results'] = results.results['items'];
    this.results = this.results['results']
    console.warn('results only, ', this.results)
    console.log('1 result: ', this.results[0])
  }
}
