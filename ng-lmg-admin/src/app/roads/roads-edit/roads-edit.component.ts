import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RoadService} from "../../_services/roads/road.service";
import {ActivatedRoute} from "@angular/router";
import {MapViewService} from "../../_services/map/map-view.service";
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-roads-edit',
  templateUrl: './roads-edit.component.html',
  styleUrls: ['./roads-edit.component.scss']
})
export class RoadsEditComponent implements OnInit, AfterViewInit {

  spinner = false;

  roadsForm: FormGroup;

  roadId: string;
  roadLocationName: any;

  // for the leaf map
  leafMap: any;
  leafMarker: any;

  selectedArray: Array<any>;

  constructor(
    private _formBuilder: FormBuilder,
    private roadService: RoadService,
    private route: ActivatedRoute,
    private mapViewService: MapViewService,
  ) { }

  get f() {
    return this.roadsForm.controls;
  }

  ngOnInit() {
    this.route.params.subscribe(params => this.roadId = params.id);

    this.roadsForm = this._formBuilder.group({
      name: ['', Validators.required],
      decoy: ['', Validators.required],
      lat: ['', Validators.required],
      lng: ['', Validators.required],
      locName: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(250)]],
      points: new FormArray([])
    })

    this.editInit();
  }

  ngAfterViewInit() {
    this.leafMap = this.mapViewService.setLeafMap();
  }

  editInit() {
    // fetch the point
    this.roadService.getRoadById(this.roadId)
      .subscribe(response => {
        this.f.name.setValue(response['name']);
        this.f.decoy.setValue(response['decoy']);
        this.f.description.setValue(response['description']);

        this.roadLocationName = response['location']['name'];

        const position = [
          response['location']['latitude'],
          response['location']['longitude'],
          response['location']['name']
        ];

        this.onResultClick(position);

        /*
        move the targets to the selected location
         */
          /*for (let target of response['targets']) {
            let something = {
              id: target['id'],
              name: target['point']['name'],
              description: target['point']['description'],
              code: target['point']['code'],
              location: {
                latitude: target['point']['location']['latitude'],
                longitude: target['point']['location']['longitude']
              }
            };
            // @ts-ignore
            this.selectedArray.push(something)

          }*/
        this.selectedArray = response['targets']
        console.log('selectedarraytype', typeof(this.selectedArray), this.selectedArray);
        //this.initiateEditPoints();

        this.spinner = false;
      })
  }

  onResultClick(position) {
    // set the map in the right position and show the marker

    this.f.lat.setValue(position[0]);
    this.f.lng.setValue(position[1]);
    this.f.locName.setValue(position[2]);

    if (this.leafMarker) {
      this.leafMarker.remove();
    }
    // @ts-ignore
    this.leafMap.setView(L.latLng(position[0], position[1]), 10);
    // @ts-ignore
    this.leafMarker = L.marker([position[0], position[1]]).addTo(this.leafMap);

  }

  movies = [
    'Episode I - The Phantom Menace',
    'Episode II - Attack of the Clones',
    'Episode III - Revenge of the Sith',
    'Episode IV - A New Hope',
    'Episode V - The Empire Strikes Back',
    'Episode VI - Return of the Jedi',
    'Episode VII - The Force Awakens',
    'Episode VIII - The Last Jedi'
  ];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.selectedArray, event.previousIndex, event.currentIndex);
  }

}
