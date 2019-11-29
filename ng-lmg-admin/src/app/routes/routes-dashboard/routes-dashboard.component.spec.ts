import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutesDashboardComponent } from './routes-dashboard.component';

describe('RoutesDashboardComponent', () => {
  let component: RoutesDashboardComponent;
  let fixture: ComponentFixture<RoutesDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoutesDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutesDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
