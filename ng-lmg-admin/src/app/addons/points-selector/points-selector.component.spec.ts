import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointsSelectorComponent } from './points-selector.component';

describe('PointsSelectorComponent', () => {
  let component: PointsSelectorComponent;
  let fixture: ComponentFixture<PointsSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointsSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointsSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
