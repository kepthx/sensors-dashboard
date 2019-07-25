import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartWidgetModalComponent } from './chart-widget-modal.component';

describe('ChartWidgetModalComponent', () => {
  let component: ChartWidgetModalComponent;
  let fixture: ComponentFixture<ChartWidgetModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartWidgetModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartWidgetModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
