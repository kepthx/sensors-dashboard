import { Component } from '@angular/core';
import { FiltersService } from '../filters.service';

@Component({
  selector: 'app-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.less']
})
export class DateRangePickerComponent {
  minDate: Date = new Date(1167609600000);
  maxDate: Date = new Date(1514505600000);

  constructor(private filterService: FiltersService) {}

  dateRangeSelected(dates: Array<Date>) {
    const from = dates[0];
    const to = dates[1];
    this.filterService.setDateFilter({ from, to });
  }
}
