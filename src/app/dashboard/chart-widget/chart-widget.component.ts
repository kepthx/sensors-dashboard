import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ChartWidget } from '../shared/chart-widget';

import * as Highcharts from 'highcharts';
import * as _ from 'lodash';
import { SensorsService } from '../shared/sensors.service';
import { Sensor } from '../shared/sensor';
import { DateFilter } from '../filters/filters';
import { FiltersService } from '../filters/filters.service';
import { Subscription } from 'rxjs';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { WidgetService } from '../shared/widget.service';

@Component({
  selector: 'app-chart-widget',
  templateUrl: './chart-widget.component.html',
  styleUrls: ['./chart-widget.component.less']
})
export class ChartWidgetComponent implements OnInit {
  faEdit = faEdit;
  dateFilter: DateFilter;
  @Input() widget: ChartWidget;
  @ViewChild('container', { static: true }) container: ElementRef;
  public options:Highcharts.Options = {};
  private widgetUpdateSubscription: Subscription;

  filterSubscription: Subscription;
  constructor(
    private sensorsService: SensorsService,
    private filterService: FiltersService,
    private widgetService: WidgetService
  ) {}

  ngOnInit() {
    this.getDateFilter();
    this.initChart();

    this.widgetUpdateSubscription = this.widgetService.onUpdate()
      .subscribe((widget: ChartWidget) => this.updateWidget(widget));
  }

  ngOnDestroy() {
    this.widgetUpdateSubscription.unsubscribe();
    this.filterSubscription.unsubscribe();
  }

  public initChart() {
    if (!this.widget) return false;

    this.options = this.widget.getOptions();

    this.requestChartData();
  }

  public editWidget() {
    return this.widgetService.openWidgetModal(this.widget);
  }

  public updateWidget(widget: ChartWidget) {
    if (this.widget.id !== widget.id) return false;

    this.widget = widget;

    this.initChart();
  }

  private requestChartData() {
    this.options.series.forEach(line => {
      this.sensorsService.getSensorsByName(line.name, this.dateFilter)
        .subscribe(data => {
          line.data = _.map(data, (sensor: Sensor) => sensor.toChartData());
          Highcharts.chart(this.container.nativeElement, this.options);
        });
    });
  }

  private getDateFilter() {
    this.dateFilter = { ...this.filterService.dateFilter };
    this.filterSubscription = this.filterService.dateFilterUpdated()
      .subscribe(dateFilter => {
        this.dateFilter = dateFilter;
        this.requestChartData();
      });
  }
}
