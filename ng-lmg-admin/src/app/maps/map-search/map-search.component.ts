import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl} from "@angular/forms";
import {SearchService} from "../../_services/map/search.service";


@Component({
  selector: 'app-map-search',
  templateUrl: './map-search.component.html',
  styleUrls: ['./map-search.component.scss']
})
export class MapSearchComponent implements OnInit {

  // send the position on the result click
  @Output() notifyPosition: EventEmitter<any>=new EventEmitter<any>();

  // pass all the results
  @Output() notifyResults = new EventEmitter();

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
    this.notifyResults.emit(results);
  }

  onResultClick(position, locationName){
    // @ts-ignore
    position.push(locationName)
    this.notifyPosition.emit(position);
  }
}
