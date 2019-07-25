import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChartWidgetComponent } from './add-chart-widget.component';

describe('AddChartWidgetComponent', () => {
  let component: AddChartWidgetComponent;
  let fixture: ComponentFixture<AddChartWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddChartWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddChartWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
