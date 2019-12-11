import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointsEditComponent } from './points-edit.component';

describe('PointsEditComponent', () => {
  let component: PointsEditComponent;
  let fixture: ComponentFixture<PointsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
