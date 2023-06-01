import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ContactDataService } from './contact-data.service';
import { Contact } from '../../../data';
import { environment } from 'src/environments/environment';
import { ContactStateService } from '../../state-providers';

describe('ContactDataService', () => {
  let contact: Contact;
  let contactStateService: ContactStateService;
  let httpTestingController: HttpTestingController;
  let service: ContactDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [ ContactDataService ]
    });

    contactStateService = TestBed.inject(ContactStateService);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ContactDataService);

    contact = {
      address: {
        city: 'Anaheim',
        postalCode: '92802',
        state: 'CA',
        street1: '1313 Disneyland Dr'
      },
      firstName: 'Mickey',
      id: 987,
      lastName: 'Mouse',
      phoneNumber: '7147814636'
    } as Contact;
  });

  afterEach(() => httpTestingController.verify());

  describe('add', () => {
    it('should create the contact on the server', () => {
      service.add(contact).subscribe({
        next: () => {},
        error: () => {}
      });

      const httpRequest = httpTestingController.expectOne(`${environment.baseDataUrl}/contacts`);
      expect(httpRequest.request.method).toBe('POST');
      expect(httpRequest.request.body).toEqual(contact);

      httpRequest.flush({ status: 201 });
    });

    it('should return true when adding the contact is successful', () => {
      let result: boolean = false;
      service.add(contact).subscribe({
        next: (response: boolean) => result = response,
        error: () => {}
      });

      const httpRequest = httpTestingController.expectOne(`${environment.baseDataUrl}/contacts`);
      httpRequest.flush({ status: 200 });

      expect(result).toBe(true);
    });

    it('should return false when adding the contact fails', () => {
      let result: boolean = true;
      service.add(contact).subscribe({
        next: (response: boolean) => result = response,
        error: () => {}
      });

      const httpRequest = httpTestingController.expectOne(`${environment.baseDataUrl}/contacts`);
      httpRequest.flush('deliberate 400 error', { status: 400, statusText: 'Bad Request' });

      expect(result).toBe(false);
    });
  });

  describe('delete', () => {
    it('should delete the contact on the server', () => {
      service.delete(contact).subscribe({
        next: () => {},
        error: () => {}
      });

      const httpRequest = httpTestingController.expectOne(`${environment.baseDataUrl}/contacts/987`);
      expect(httpRequest.request.method).toBe('DELETE');

      httpRequest.flush({ status: 201 });
    });

    it('should return true when deleting the contact is successful', () => {
      let result: boolean = false;
      service.delete(contact).subscribe({
        next: (response: boolean) => result = response,
        error: () => {}
      });

      const httpRequest = httpTestingController.expectOne(`${environment.baseDataUrl}/contacts/987`);
      httpRequest.flush({ status: 200 });

      expect(result).toBe(true);
    });

    it('should return false when deleting the contact fails', () => {
      let result: boolean = true;
      service.delete(contact).subscribe({
        next: (response: boolean) => result = response,
        error: () => {}
      });

      const httpRequest = httpTestingController.expectOne(`${environment.baseDataUrl}/contacts/987`);
      httpRequest.flush('deliberate 400 error', { status: 400, statusText: 'Bad Request' });

      expect(result).toBe(false);
    });
  });

  describe('get', () => {
    let contacts: Array<Contact>;

    beforeEach(() => {
      contacts = [
        {
          address: {
            city: 'Anaheim',
            postalCode: '92802',
            state: 'CA',
            street1: '1313 Disneyland Dr'
          },
          firstName: 'Mickey',
          id: 987,
          lastName: 'Mouse',
          phoneNumber: '7147814636'
        } as Contact,
        {
          address: {
            city: 'Anaheim',
            postalCode: '92802',
            state: 'CA',
            street1: '1313 Disneyland Dr'
          },
          firstName: 'Donald',
          id: 986,
          lastName: 'Duck',
          phoneNumber: '7147814636'
        } as Contact
      ];

      spyOn(contactStateService, 'set');
    });

    it('should get the contacts from the server', () => {
      service.get().subscribe({
        next: () => {},
        error: () => {}
      });

      const httpRequest = httpTestingController.expectOne(`${environment.baseDataUrl}/contacts`);
      expect(httpRequest.request.method).toBe('GET');

      httpRequest.flush({ status: 201 });
    });

    it('should set the contacts in state when retrieving the contacts from the server is successful', () => {
      service.get().subscribe({
        next: () => {},
        error: () => {}
      });

      const httpRequest = httpTestingController.expectOne(`${environment.baseDataUrl}/contacts`);
      httpRequest.flush(contacts);

      expect(contactStateService.set).toHaveBeenCalledOnceWith([
        {
          address: {
            city: 'Anaheim',
            postalCode: '92802',
            state: 'CA',
            street1: '1313 Disneyland Dr'
          },
          firstName: 'Mickey',
          id: 987,
          lastName: 'Mouse',
          phoneNumber: '7147814636'
        } as Contact,
        {
          address: {
            city: 'Anaheim',
            postalCode: '92802',
            state: 'CA',
            street1: '1313 Disneyland Dr'
          },
          firstName: 'Donald',
          id: 986,
          lastName: 'Duck',
          phoneNumber: '7147814636'
        } as Contact
      ]);
    });

    it('should return the contacts to the caller when retrieving the contacts from the server is successful', () => {
      let result: Array<Contact> = [];
      service.get().subscribe({
        next: (results: Array<Contact>) => result = results,
        error: () => {}
      });

      const httpRequest = httpTestingController.expectOne(`${environment.baseDataUrl}/contacts`);
      httpRequest.flush(contacts);

      expect(result).toEqual([
        {
          address: {
            city: 'Anaheim',
            postalCode: '92802',
            state: 'CA',
            street1: '1313 Disneyland Dr'
          },
          firstName: 'Mickey',
          id: 987,
          lastName: 'Mouse',
          phoneNumber: '7147814636'
        } as Contact,
        {
          address: {
            city: 'Anaheim',
            postalCode: '92802',
            state: 'CA',
            street1: '1313 Disneyland Dr'
          },
          firstName: 'Donald',
          id: 986,
          lastName: 'Duck',
          phoneNumber: '7147814636'
        } as Contact
      ]);
    });

    it('should clear the contacts from state when retrieving the contacts from the server fails', () => {
      let result: boolean = true;
      service.get().subscribe({
        next: () => {},
        error: () => {}
      });

      const httpRequest = httpTestingController.expectOne(`${environment.baseDataUrl}/contacts`);
      httpRequest.flush('deliberate 400 error', { status: 400, statusText: 'Bad Request' });

      expect(contactStateService.set).toHaveBeenCalledOnceWith(null);
    });
  });

  describe('save', () => {
    it('should update the contact on the server', () => {
      service.save(contact).subscribe({
        next: () => {},
        error: () => {}
      });

      const httpRequest = httpTestingController.expectOne(`${environment.baseDataUrl}/contacts/987`);
      expect(httpRequest.request.method).toBe('PUT');
      expect(httpRequest.request.body).toEqual(contact);

      httpRequest.flush({ status: 201 });
    });

    it('should return true when updating the contact is successful', () => {
      let result: boolean = false;
      service.save(contact).subscribe({
        next: (response: boolean) => result = response,
        error: () => {}
      });

      const httpRequest = httpTestingController.expectOne(`${environment.baseDataUrl}/contacts/987`);
      httpRequest.flush({ status: 200 });

      expect(result).toBe(true);
    });

    it('should return false when updating the contact fails', () => {
      let result: boolean = true;
      service.save(contact).subscribe({
        next: (response: boolean) => result = response,
        error: () => {}
      });

      const httpRequest = httpTestingController.expectOne(`${environment.baseDataUrl}/contacts/987`);
      httpRequest.flush('deliberate 400 error', { status: 400, statusText: 'Bad Request' });

      expect(result).toBe(false);
    });
  });
});
