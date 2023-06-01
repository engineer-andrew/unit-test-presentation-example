import { Contact } from '.';

export interface StoreState {
  contacts: Array<Contact> | null | undefined;
}
