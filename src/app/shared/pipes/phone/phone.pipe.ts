import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {
  public transform(input: string | null | undefined): string {
    if (!input) {
      return '';
    }

    const value = input.toString().trim().replace(/^\+/, '');

    if (value.match(/[^0-9]/)) {
      return input;
    }

    let country: string;
    let city: string;
    let tel: string;

    switch (value.length) {
      case 10: // +1PPP####### -> C (PPP) ###-####
        country = '1';
        city = value.slice(0, 3);
        tel = value.slice(3);
        break;
      case 11: // +CPPP####### -> CCC (PP) ###-####
        country = value[0];
        city = value.slice(1, 4);
        tel = value.slice(4);
        break;
      case 12: // +CCCPP####### -> CCC (PPP) ##-####
        country = value.slice(0, 3);
        city = value.slice(3, 5);
        tel = value.slice(5);
        break;
      default:
        return input;
    }

    if (country === '1') {
      country = '';
    }

    tel = tel.slice(0, 3) + '-' + tel.slice(3);

    return (country + ' (' + city + ') ' + tel).trim();
  }
}
