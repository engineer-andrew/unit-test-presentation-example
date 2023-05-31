import { Injectable } from '@angular/core';

import { ObservableStore } from '@codewithdan/observable-store';

import { Contact, StoreState } from '../../../data/model';

@Injectable({
  providedIn: 'root'
})
export class ContactStateService extends ObservableStore<StoreState> {
  constructor() {
    super({
      stateSliceSelector: state => ({
        contacts: state?.contacts
      })
    });

    this.setState({ contacts: null }, 'init_contacts_state');
  }

  public set(contacts: Array<Contact> | null): void {
    this.setState({contacts}, 'set_contacts_state');
  }
}
