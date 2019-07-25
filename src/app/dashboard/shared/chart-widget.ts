import { uniqueId } from 'lodash';

export enum ChartType {
  Line,
  Bar,
  Column
}

export interface ChartLine {
  name: String;
  color: String;
}

export interface ChartWidgetParams {
  id: number,
  title?: string,
  description?: string,
  type: ChartType,
  series: ChartLine[]
}

export class ChartWidget implements ChartWidgetParams {
  id: number;
  title: string;
  description: string;
  type: ChartType = ChartType.Line;
  series: ChartLine[] = [];

  constructor(params: ChartWidgetParams) {
    const {
      title = '',
      description = '',
      type = ChartType.Line,
      series = [],
      id = uniqueId('chart_')
    } = params;

    this.title = title;
    this.description = description;
    this.type = type;
    this.series = series;
    this.id = id;
  }

  getOptions(): any {
    const options = {
      chart: {
        type: ChartType[this.type].toLowerCase(),
        height: 500
      },
      title: {
        text: this.title,
      },
      subtitle: {
        text: this.description
      },
      credits: {
        enabled: false
      },
      tooltip: {
        crosshairs: true,
        shared: true
      },
      xAxis: {
        type: 'datetime'
      },
      yAxis: {
        title: {
            text: 'Exchange rate'
        }
      },
      plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
      },
      series: []
    };
    
    this.series.forEach(line => {
      options.series.push({
        name: line.name,
        turboThreshold: 500000,
        color: line.color,
        data: []
      });
    });

    return options;
  }

  fromModalContent(content: ChartWidgetParams) {
    this.title = content.title;
    this.description = content.description;
    this.type = content.type;
    this.series = content.series;
  }
}


