import { times } from 'lodash';

export const SENSORS_NAMES: string[] = times(10).map(item => `Sensor ${item + 1}`);