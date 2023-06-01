import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'address' })
export class FakeAddressPipe implements PipeTransform {
  public transform(html: string): any {
    return '';
  }
}
