import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Contact, StoreState } from '../../../../app/data';

@Injectable()
export class MockContactStateService {
  public stateChanged!: Observable<StoreState>;

  public set(contacts: Array<Contact> | null): void {
  }
}