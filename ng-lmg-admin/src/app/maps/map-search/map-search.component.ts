import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {SearchService} from "../../_services/map/search.service";
import {Observable} from "rxjs";


@Component({
  selector: 'app-map-search',
  templateUrl: './map-search.component.html',
  styleUrls: ['./map-search.component.scss']
})
export class MapSearchComponent implements OnInit {

  // send the position on the result click
  @Output() notifyPosition: EventEmitter<any> = new EventEmitter<any>();

  // pass all the results
  @Output() notifyResults = new EventEmitter();

  @Input() locationName: Observable<any>;


  results: any[] = [];
  queryField: FormControl = new FormControl('', Validators.required);

  constructor(private _searchService: SearchService) {
  }


  ngOnInit(): void {
    this.queryField.valueChanges
      .subscribe(queryField => this._searchService.search(queryField)
        .subscribe(response => {
          if (response === 400) {
            return;
          } else {
            this.showResults(response)
          }
        }));
    this.queryField.setValue(this.locationName)

  }

  showResults(results) {
    console.log(results)
    this.results['results'] = results.results['items'];
    this.results = this.results['results']
    this.notifyResults.emit(results);
  }

  onResultClick(position, locationName) {
    // @ts-ignore
    position.push(locationName)
    this.notifyPosition.emit(position);
  }
}
