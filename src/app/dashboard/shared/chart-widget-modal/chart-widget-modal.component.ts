import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { SENSORS_NAMES } from '../mock-sensors';
import { filter, some, every } from 'lodash';
import { ChartLine, ChartType } from '../chart-widget';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-chart-widget-modal',
  templateUrl: './chart-widget-modal.component.html',
  styleUrls: ['./chart-widget-modal.component.less']
})
export class ChartWidgetModalComponent implements OnInit {
  public faTrashAlt = faTrashAlt;
  public SENSORS_NAMES: string[] = SENSORS_NAMES;
  public ChartTypes = ChartType;

  public id: string;
  public title: string;
  public description: string;
  public type: ChartType;
  public series: ChartLine[] = [];

  public removed: boolean = false;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
    if (!this.id) {      
      this.addSensor();
    }
  }

  public get headerTitle() {
    return this.id ? 'Edit Chart Widget' : 'Create New Chart Widget';
  }

  public get sensorNames() {
    return filter(this.SENSORS_NAMES, name => !some(this.series, line => line.name === name));
  }

  public selectSensorName(line: ChartLine, sensorName) {
    line.name = sensorName;
  }

  addSensor() {
    this.series.push({ name: '', color: this.getRandomColor() });
  }

  removeSensor(lineIndex: number) {
    this.series.splice(lineIndex, 1);
  }

  get canSave() {
    return this.title
      && every(this.series, line => !!line.name && !!line.color);
  }

  public closeModal() {
    this.resetWidget();
    this.bsModalRef.hide();
  }

  public removeWidget() {
    this.removed = true;
    this.bsModalRef.hide();
  }

  public resetWidget() {
    this.id = '';
    this.title = '';
    this.description = '';
    this.series = [];
  }

  private getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}