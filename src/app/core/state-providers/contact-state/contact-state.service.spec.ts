import { TestBed } from '@angular/core/testing';

import { ContactStateService } from './contact-state.service';
import { Contact, StoreState } from '../../../data';

describe('ContactStateService', () => {
  let service: ContactStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ ContactStateService ]
    });

    service = TestBed.inject(ContactStateService);
  });

  describe('set', () => {
    it('should set the contacts in state', () => {
      const contacts = [
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
      const currentState = {
        contacts: null
      } as StoreState;
      const expected = {...currentState, contacts};
      spyOn(Object.getPrototypeOf(Object.getPrototypeOf(service)), 'setState');

      service.set(contacts);

      expect(Object.getPrototypeOf(Object.getPrototypeOf(service)).setState).toHaveBeenCalledOnceWith(expected, 'set_contacts_state');
    });
  });
});
