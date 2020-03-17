import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetStepperComponent } from './target-stepper.component';

describe('TargetStepperComponent', () => {
  let component: TargetStepperComponent;
  let fixture: ComponentFixture<TargetStepperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TargetStepperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
