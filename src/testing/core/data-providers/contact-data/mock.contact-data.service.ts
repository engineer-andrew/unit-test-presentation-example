import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Contact } from '../../../../app/data';

@Injectable({
  providedIn: 'root'
})
export class MockContactDataService {
  public add(contact: Contact): Observable<boolean> {
    return of(false);
  }

  public delete(contact: Contact): Observable<boolean> {
    return of(false);
  }

  public get(): Observable<Array<Contact>> {
    return of([] as Array<Contact>);
  }

  public save(contact: Contact): Observable<boolean> {
    return of(false);
  }
}
