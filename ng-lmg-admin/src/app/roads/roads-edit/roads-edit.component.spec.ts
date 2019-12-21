import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadsEditComponent } from './roads-edit.component';

describe('RoadsEditComponent', () => {
  let component: RoadsEditComponent;
  let fixture: ComponentFixture<RoadsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoadsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoadsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
