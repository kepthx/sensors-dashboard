import { NgModule } from '@angular/core';

import * as Highcharts from 'highcharts';

// Highcharts modules
import BoostCanvas from 'highcharts/modules/boost-canvas';
import Boost from 'highcharts/modules/boost';
import HighchartsMore from 'highcharts/highcharts-more';
import Exporting from 'highcharts/modules/exporting';
import Heatmap from 'highcharts/modules/heatmap';
import NoDataToDisplay from 'highcharts/modules/no-data-to-display';
import OfflineExporting from 'highcharts/modules/offline-exporting';
import SolidGauge from 'highcharts/modules/solid-gauge';

@NgModule({

})
export class HighchartsModule {
  constructor() {
    const globalOptions: Highcharts.GlobalOptions = {
      timezoneOffset: new Date().getTimezoneOffset()
    };

    Highcharts.setOptions({
      global: globalOptions
    });

    // Load modules
    BoostCanvas(Highcharts);
    Boost(Highcharts);
    HighchartsMore(Highcharts);
    Exporting(Highcharts);
    Heatmap(Highcharts);
    NoDataToDisplay(Highcharts);
    OfflineExporting(Highcharts);
    SolidGauge(Highcharts);
  }
}
