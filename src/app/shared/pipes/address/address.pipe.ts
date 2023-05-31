import { Pipe, PipeTransform } from '@angular/core';

import { Address } from '../../../data/model';

@Pipe({
  name: 'address'
})
export class AddressPipe implements PipeTransform {
  public transform(input: Address | null | undefined): string {
    if (!input || !input.street1 || !input.city || !input.state || !input.postalCode) {
      return 'No address available';
    }

    let formattedAddress = input.street1;

    if (input.street2) {
      formattedAddress += ` ${input.street2}`;
    }

    formattedAddress += `, ${input.city} ${input.state} ${input.postalCode}`;

    return formattedAddress;
  }
}
