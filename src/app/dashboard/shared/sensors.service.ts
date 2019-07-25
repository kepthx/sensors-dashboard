import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Sensor, SensorType } from './sensor';
import { Observable, from } from 'rxjs';
import { filter, toArray, mergeMap, map } from 'rxjs/operators';
import { random } from 'lodash';
import { SENSORS_NAMES } from './mock-sensors';
import { DateFilter } from '../filters/filters';

@Injectable({
  providedIn: 'root'
})
export class SensorsService {
  constructor(private http: HttpClient) {}

  getSensor(): Observable<Sensor> {
    return this.http.get(`https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/usdeur.json`)
      .pipe(
        mergeMap((data: [][]) => from(data)),
        map((item: Number[]) => {
          const name = SENSORS_NAMES[random(0, 9)];
          const type = this.randomEnum(SensorType) as SensorType;
          const [timestamp, value] = item;
          return new Sensor(name, type, timestamp, value);
        })
      );
  }

  getSensors() {
    return this.getSensor()
      .pipe(
        toArray()
      );
  }

  getSensorsByName(name: String, dateFilter: DateFilter = {}): Observable<Sensor[]> {
    return this.getSensor()
      .pipe(
        filter(sensor => {
          const isNameTheSame = sensor.name === name;
          if (!dateFilter.from || !dateFilter.to) return isNameTheSame;

          return sensor.timestamp > dateFilter.from.getTime()
            &&  sensor.timestamp < dateFilter.to.getTime()
            && isNameTheSame;
        }),
        toArray()
      );
  }

  private randomEnum<T>(anEnum: T): T[keyof T] {
    const enumValues = Object.keys(anEnum)
      .map(n => Number.parseInt(n))
      .filter(n => !Number.isNaN(n)) as unknown as T[keyof T][]
    const randomIndex = Math.floor(Math.random() * enumValues.length)
    const randomEnumValue = enumValues[randomIndex]
    return randomEnumValue;
  }
}
