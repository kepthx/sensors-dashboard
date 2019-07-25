import { Injectable, EventEmitter } from '@angular/core';
import { DateFilter } from './filters';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {
  public dateFilterChanged: Subject<DateFilter> = new Subject();
  private _dateFilter: DateFilter;
  constructor() {}

  setDateFilter(dateFilter: DateFilter) {
    this._dateFilter = dateFilter;
    this.dateFilterChanged.next(dateFilter);
  }

  get dateFilter() {
    return this._dateFilter;
  }

  dateFilterUpdated() {
    return this.dateFilterChanged.asObservable();
  }
}
