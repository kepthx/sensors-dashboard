import { uniqueId } from 'lodash';

export enum SensorType {
  Temperature,
  Humidity,
  Light
}

export class Sensor {
  id: Number = uniqueId('sensor_');
  name: String;
  type: SensorType;
  timestamp: Number;
  value: Number;

  constructor(name: String, type: SensorType, timestamp: Number, value: Number) {
    this.name = name;
    this.type = type;
    this.timestamp = timestamp;
    this.value = value;
  }

  toChartData() {
    return [this.timestamp, this.value];
  }
}