import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, of, Subscription } from 'rxjs';

import { AddContactComponent } from '../../components/add-contact/add-contact.component';
import { ContactListComponent } from './contact-list.component';
import { ContactDataService, ContactStateService } from '../../core';
import { Address, Contact, StoreState } from '../../data';
import { FakeUnitTestPresentationComponentModule, FakeUnitTestPresentationCoreModule } from '../../../testing';

describe('ContactListComponent', () => {
  let component: ContactListComponent;
  let fixture: ComponentFixture<ContactListComponent>;
  let contactDataService: ContactDataService;
  let contactStateService: ContactStateService;
  const contactStateSubject: BehaviorSubject<StoreState> = new BehaviorSubject<StoreState>({} as StoreState);
  let modalService: NgbModal;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactListComponent ],
      imports: [
        FakeUnitTestPresentationComponentModule,
        FakeUnitTestPresentationCoreModule
      ]
    })
    .compileComponents();

    contactDataService = TestBed.inject(ContactDataService);
    contactStateService = TestBed.inject(ContactStateService);
    modalService = TestBed.inject(NgbModal);

    contactStateSubject.next({
      contacts: [
        {
          address: {
            city: 'Anaheim',
            id: 1,
            postalCode: '92802',
            state: 'CA',
            street1: '1313 Disneyland Dr'
          } as Address,
          firstName: 'Mickey',
          lastName: 'Mouse',
          phoneNumber: '7147814636'
        } as Contact
      ] as Array<Contact>
    } as StoreState);

    contactStateService.stateChanged = contactStateSubject.asObservable();

    fixture = TestBed.createComponent(ContactListComponent);
    component = fixture.componentInstance;
  });

  describe('during initialization', () => {
    beforeEach(() => {
      spyOn(contactDataService, 'get').and.callFake(() => of(
        [
          {
            address: {
              city: 'Anaheim',
              id: 1,
              postalCode: '92802',
              state: 'CA',
              street1: '1313 Disneyland Dr'
            } as Address,
            firstName: 'Donald',
            lastName: 'Duck',
            phoneNumber: '7147814636'
          } as Contact
        ] as Array<Contact>
      ));
    });

    it('should get contacts from the server', () => {
      fixture.detectChanges();

      expect(contactDataService.get).toHaveBeenCalledOnceWith();
    });

    it('should monitor the contacts in state and bind them to the contacts on the component when they change', () => {
      expect(component.contacts).toBeUndefined();

      fixture.detectChanges();

      expect(component.contacts).toEqual([
        {
          address: {
            city: 'Anaheim',
            id: 1,
            postalCode: '92802',
            state: 'CA',
            street1: '1313 Disneyland Dr'
          } as Address,
          firstName: 'Mickey',
          lastName: 'Mouse',
          phoneNumber: '7147814636'
        } as Contact
      ] as Array<Contact>);

      contactStateSubject.next({
        contacts: [
          {
            address: {
              city: 'Valencia',
              id: 2,
              postalCode: '91355',
              state: 'CA',
              street1: '26101 Magic Mountain Pkwy'
            } as Address,
            firstName: 'Bugs',
            lastName: 'Bunny',
            phoneNumber: '6612554100'
          } as Contact
        ] as Array<Contact>
      } as StoreState);

      expect(component.contacts).toEqual([
        {
          address: {
            city: 'Valencia',
            id: 2,
            postalCode: '91355',
            state: 'CA',
            street1: '26101 Magic Mountain Pkwy'
          } as Address,
          firstName: 'Bugs',
          lastName: 'Bunny',
          phoneNumber: '6612554100'
        } as Contact
      ] as Array<Contact>);
    });
  });

  describe('during destruction', () => {
    beforeEach(() => {
      fixture.detectChanges();

      spyOn(Subscription.prototype, 'unsubscribe');
    });

    it('should unsubscribe from all subscriptions', () => {
      component.ngOnDestroy();

      expect(Subscription.prototype.unsubscribe).toHaveBeenCalledOnceWith();
    });
  });

  describe('add', () => {
    beforeEach(() => {
      fixture.detectChanges();

      spyOn(modalService, 'open');
    });

    it('should open the Add Contact component in a modal', () => {
      component.add();

      expect(modalService.open).toHaveBeenCalledOnceWith(AddContactComponent);
    });
  });
});
