import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNavButtonsComponent } from './form-nav-buttons.component';

describe('FormNavButtonsComponent', () => {
  let component: FormNavButtonsComponent;
  let fixture: ComponentFixture<FormNavButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormNavButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormNavButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
