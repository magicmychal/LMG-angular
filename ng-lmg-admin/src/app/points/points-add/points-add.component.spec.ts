import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointsAddComponent } from './points-add.component';

describe('PointsAddComponent', () => {
  let component: PointsAddComponent;
  let fixture: ComponentFixture<PointsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
