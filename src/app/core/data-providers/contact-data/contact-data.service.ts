import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { catchError, map, Observable, of, throwError } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { Contact } from '../../../data';
import { ContactStateService } from '../../state-providers';

@Injectable({
  providedIn: 'root'
})
export class ContactDataService {
  constructor(
    private httpClient: HttpClient,
    private contactStateService: ContactStateService
  ) {
  }

  public add(contact: Contact): Observable<boolean> {
    return this.httpClient.post<boolean>(`${environment.baseDataUrl}/contacts`, contact)
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );
  }

  public delete(contact: Contact): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${environment.baseDataUrl}/contacts/${contact.id}`)
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );
  }

  public get(): Observable<Array<Contact>> {
    return this.httpClient.get<Array<Contact>>(`${environment.baseDataUrl}/contacts`)
      .pipe(
        map((contacts: Array<Contact>) => {
          this.contactStateService.set(contacts);
          return contacts;
        }),
        catchError((error: any) => {
          this.contactStateService.set(null);

          return throwError(() => error);
        })
      );
  }

  public save(contact: Contact): Observable<boolean> {
    return this.httpClient.put<boolean>(`${environment.baseDataUrl}/contacts/${contact.id}`, contact)
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );
  }
}
