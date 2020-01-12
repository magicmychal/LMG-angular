import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetModifyComponent } from './target-modify.component';

describe('TargetModifyComponent', () => {
  let component: TargetModifyComponent;
  let fixture: ComponentFixture<TargetModifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TargetModifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
