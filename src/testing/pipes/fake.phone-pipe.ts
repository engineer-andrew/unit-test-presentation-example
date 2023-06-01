import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'phone' })
export class FakePhonePipe implements PipeTransform {
  public transform(html: string): any {
    return '';
  }
}
