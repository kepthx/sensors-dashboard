import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumToArray'
})
export class EnumToArrayPipe implements PipeTransform {
  transform(data: Object) {
    const keys = [];
    for (var enumMember in data) {
      const isValueProperty = parseInt(enumMember, 10) >= 0
      if (isValueProperty) {
        keys.push({ key: enumMember, value: data[enumMember] });
      } 
    }
    return keys;
  }
}
