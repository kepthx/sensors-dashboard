import { Component, OnInit } from '@angular/core';
import { ChartWidget } from './shared/chart-widget';
import { findIndex } from 'lodash';
import { WidgetService } from './shared/widget.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {
  widgets: ChartWidget[] = [];
  dateFilter: Object = {};
  widgetCreatedSubscription: Subscription;
  widgetRemovedSubscription: Subscription;
  constructor(private widgetService: WidgetService) { }

  ngOnInit() {
    this.widgetCreatedSubscription = this.widgetService.onCreate()
      .subscribe((widget: ChartWidget) => this.addWidget(widget));

    this.widgetRemovedSubscription = this.widgetService.onRemove()
      .subscribe((widget: ChartWidget) => this.removeWidget(widget));
  }

  ngOnDestroy(): void {
    this.widgetCreatedSubscription.unsubscribe();
    this.widgetRemovedSubscription.unsubscribe();
  }

  addWidget(widget: ChartWidget) {
    this.widgets.push(widget);
  }

  removeWidget(widget: ChartWidget) {
    const widgetIntex = findIndex(this.widgets, { id: widget.id });

    this.widgets.splice(widgetIntex, 1);
  }
}
