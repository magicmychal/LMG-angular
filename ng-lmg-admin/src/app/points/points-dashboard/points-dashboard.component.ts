// https://mdbootstrap.com/docs/angular/tables/basic/
import {Component, OnInit, ElementRef, HostListener, AfterViewInit, ViewChild, ChangeDetectorRef} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {MdbTableDirective, MdbTablePaginationComponent} from "angular-bootstrap-md";
import {PointsService} from "../../_services/points/points.service";
import {NgxSpinnerService} from "ngx-spinner";

// import { MdbTableDirective, MdbTablePaginationComponent } from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-points-dashboard',
  templateUrl: './points-dashboard.component.html',
  styleUrls: ['./points-dashboard.component.scss']
})
export class PointsDashboardComponent implements OnInit, AfterViewInit {
  @ViewChild(MdbTableDirective, {static: true}) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, {static: true}) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild('row', {static: true}) row: ElementRef;

  // variables for the table
  elements: any = [];
  headElements = ['Name', 'Location', 'Short description', 'Action'];

  searchText: string = '';
  previous: string;

  maxVisibleItems: number = 8;

  constructor(
    private titleService: Title,
    private cdRef: ChangeDetectorRef,
    private pointsService: PointsService,
    private spinner: NgxSpinnerService
  ) {
  }

  @HostListener('input') oninput() {
    this.mdbTablePagination.searchText = this.searchText;
  }

  ngOnInit() {
    this.titleService.setTitle("Your Points");
    this.spinner.show();
    // the data will be fetched after the view is created
    this.pointsService.getPoints().subscribe({
      next: response => {
        this.elements = response;
        this.setTheTable()
      },
      error: err => console.log("The error is ", err)
    })

  }

  ngAfterViewInit() {
  }

  setTheTable() {

    this.mdbTable.setDataSource(this.elements);
    this.elements = this.mdbTable.getDataSource();
    this.previous = this.mdbTable.getDataSource();

    this.mdbTablePagination.setMaxVisibleItemsNumberTo(this.maxVisibleItems);

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();

    this.spinner.hide();
    //this.addNewRowAfter();

  }

  addNewRow() {
    this.mdbTable.addRow({
      id: this.elements.length.toString(),
      first: 'Wpis ' + this.elements.length,
      last: 'Last ' + this.elements.length,
      handle: 'Handle ' + this.elements.length
    });
    this.emitDataSourceChange();
  }

  addNewRowAfter() {
    this.mdbTable.addRowAfter(1, {id: '2', first: 'Nowy', last: 'Row', handle: 'Kopytkowy'});
    this.mdbTable.getDataSource().forEach((el: any, index: any) => {
      el.id = (index + 1).toString();
    });
    this.emitDataSourceChange();
  }

  removeLastRow() {
    this.mdbTable.removeLastRow();
    this.emitDataSourceChange();
    this.mdbTable.rowRemoved().subscribe((data: any) => {
      console.log(data);
    });
  }

  removeRow() {
    this.mdbTable.removeRow(1);
    this.mdbTable.getDataSource().forEach((el: any, index: any) => {
      el.id = (index + 1).toString();
    });
    this.emitDataSourceChange();
    this.mdbTable.rowRemoved().subscribe((data: any) => {
      console.log(data);
    });
  }

  emitDataSourceChange() {
    this.mdbTable.dataSourceChange().subscribe((data: any) => {
      console.log(data);
    });
  }

  searchItems() {
    const prev = this.mdbTable.getDataSource();

    if (!this.searchText) {
      this.mdbTable.setDataSource(this.previous);
      this.elements = this.mdbTable.getDataSource();
    }

    if (this.searchText) {
      this.elements = this.mdbTable.searchLocalDataBy(this.searchText);
      this.mdbTable.setDataSource(prev);
    }

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();

    this.mdbTable.searchDataObservable(this.searchText).subscribe(() => {
      this.mdbTablePagination.calculateFirstItemIndex();
      this.mdbTablePagination.calculateLastItemIndex();
    });
  }

}
