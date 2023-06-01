import { Address } from './address.model';

export interface Contact {
  address: Address;
  id?: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}
