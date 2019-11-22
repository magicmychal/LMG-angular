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
      .subscribe(queryField =>this._searchService.search(queryField)
        .subscribe(response => console.log(response)));
  }

}
