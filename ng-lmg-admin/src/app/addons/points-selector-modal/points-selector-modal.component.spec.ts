import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointsSelectorModalComponent } from './points-selector-modal.component';

describe('PointsSelectorModalComponent', () => {
  let component: PointsSelectorModalComponent;
  let fixture: ComponentFixture<PointsSelectorModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointsSelectorModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointsSelectorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
