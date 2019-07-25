import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { ChartWidgetComponent } from './chart-widget/chart-widget.component';
import { DateRangePickerComponent } from './filters/date-range-picker/date-range-picker.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { FiltersComponent } from './filters/filters.component';
import { SensorsService } from './shared/sensors.service';
import { AddChartWidgetComponent } from './add-chart-widget/add-chart-widget.component';
import { ChartWidgetModalComponent } from './shared/chart-widget-modal/chart-widget-modal.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ColorPickerModule } from 'ngx-color-picker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { WidgetService } from './shared/widget.service';
import { EnumToArrayPipe } from './shared/enum-to-array.pipe';
import { FormsModule } from '@angular/forms';
import { FiltersService } from './filters/filters.service';
import { HighchartsModule } from './shared/highcharts.module';

@NgModule({
  declarations: [
    DashboardComponent,
    ChartWidgetComponent,
    DateRangePickerComponent,
    FiltersComponent,
    AddChartWidgetComponent,
    ChartWidgetModalComponent,
    EnumToArrayPipe
  ],
  imports: [
    CommonModule,
    BsDatepickerModule,
    ModalModule,
    TooltipModule,
    FontAwesomeModule,
    ColorPickerModule,
    BsDropdownModule,
    FormsModule,
    HighchartsModule
  ],
  exports: [
    DashboardComponent,
    EnumToArrayPipe
  ],
  providers: [
    SensorsService,
    WidgetService,
    FiltersService
  ],
  entryComponents: [
    ChartWidgetModalComponent
  ]
})
export class DashboardModule { }
