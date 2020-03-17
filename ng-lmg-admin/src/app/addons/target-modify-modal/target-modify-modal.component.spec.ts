import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetModifyModalComponent } from './target-modify-modal.component';

describe('TargetModifyModalComponent', () => {
  let component: TargetModifyModalComponent;
  let fixture: ComponentFixture<TargetModifyModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TargetModifyModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetModifyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
