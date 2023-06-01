import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of, throwError } from 'rxjs';

import { ConfirmationComponent } from '../../shared/components';
import { ContactDataService } from '../../core';
import { Contact } from '../../data';
import { EditContactComponent } from '../edit-contact/edit-contact.component';
import { FakeUnitTestPresentationCoreModule, FakeUnitTestPresentationPipesModule, MockNgbModal, MockNgbModalRef } from '../../../testing';
import { ViewContactComponent } from './view-contact.component';

describe('ContactComponent', () => {
  let component: ViewContactComponent;
  let contactDataService: ContactDataService;
  let fixture: ComponentFixture<ViewContactComponent>;
  let modalRef: MockNgbModalRef;
  let modalService: MockNgbModal;

  beforeEach(async () => {
    modalRef = new MockNgbModalRef();
    modalService = new MockNgbModal();

    await TestBed.configureTestingModule({
      declarations: [ ViewContactComponent ],
      imports: [
        FakeUnitTestPresentationCoreModule,
        FakeUnitTestPresentationPipesModule
      ],
      providers: [ { provide: NgbModal, useValue: modalService } ]
    })
    .compileComponents();

    contactDataService = TestBed.inject(ContactDataService);

    spyOn(modalService, 'open').and.callFake(() => modalRef);

    fixture = TestBed.createComponent(ViewContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.contact = {
      address: {
        city: 'Anaheim',
        id: 1,
        postalCode: '92802',
        state: 'CA',
        street1: '1313 Disneyland Dr'
      },
      firstName: 'Mickey',
      lastName: 'Mouse',
      phoneNumber: '7147814636'
    } as Contact;
  });

  describe('delete', () => {
    let deleteContactResult: Observable<boolean>;
    let getContactsResult: Observable<Array<Contact>>;

    beforeEach(() => {
      spyOn(contactDataService, 'delete').and.callFake(() => deleteContactResult);
      spyOn(contactDataService, 'get').and.callFake(() => getContactsResult);

      deleteContactResult = of(true);
      getContactsResult = of([]);
    });

    it('should open the Confirmation component', () => {
      component.delete();

      expect(modalService.open).toHaveBeenCalledOnceWith(ConfirmationComponent);
    });

    it('should set the message on the Confirmation component', () => {
      component.delete();

      expect(modalRef.componentInstance).toEqual({
        message: 'Are you sure you want to delete Mickey Mouse? This action cannot be undone.'
      })
    });

    it('should not try to delete the contact when the user rejects the confirmation', () => {
      component.delete();
      modalRef.setClosedResult(false);

      expect(contactDataService.delete).not.toHaveBeenCalled();
    });

    it('should try to delete the contact when the user confirms', () => {
      component.delete();
      modalRef.setClosedResult(true);

      expect(contactDataService.delete).toHaveBeenCalledOnceWith(component.contact);
    });

    it('should refresh the contact list when deleting the contact is successful', () => {
      component.delete();
      modalRef.setClosedResult(true);

      expect(contactDataService.get).toHaveBeenCalledOnceWith();
    });

    it('should not refresh the contact list when deleting the contact throws an error', () => {
      deleteContactResult = throwError(() => 'Error');

      component.delete();
      modalRef.setClosedResult(true);

      expect(contactDataService.get).not.toHaveBeenCalled();
    });

    it('should not refresh the contact list when deleting the contact fails', () => {
      deleteContactResult = of(false);

      component.delete();
      modalRef.setClosedResult(true);

      expect(contactDataService.get).not.toHaveBeenCalled();
    });
  });

  describe('edit', () => {
    it('should open the Edit Contact component in a modal', () => {
      component.edit();

      expect(modalService.open).toHaveBeenCalledOnceWith(EditContactComponent);
    });

    it('should set the contact on the Edit Contact component to the contact on the component', () => {
      component.contact = {
        id: 999
      } as Contact;

      component.edit();

      expect(modalRef.componentInstance).toEqual({
        contact: { id: 999 } as Contact
      })
    });
  });
});
