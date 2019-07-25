import { Component } from '@angular/core';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import { WidgetService } from '../shared/widget.service';
@Component({
  selector: 'app-add-chart-widget',
  templateUrl: './add-chart-widget.component.html',
  styleUrls: ['./add-chart-widget.component.less']
})
export class AddChartWidgetComponent {
  faPlusCircle = faPlusCircle;

  constructor(
    private widgetService: WidgetService
  ) { }

  openWidgetModal(event: Event) {
    if (event) {
      event.preventDefault();
    }

    return this.widgetService.openWidgetModal();
  }
}
