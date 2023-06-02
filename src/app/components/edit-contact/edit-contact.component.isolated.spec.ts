import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of, throwError } from 'rxjs';

import { ContactDataService } from '../../core';
import { Address, Contact } from '../../data';
import { EditContactComponent } from './edit-contact.component';
import { FakeUnitTestPresentationDirectivesModule, FakeUnitTestPresentationCoreModule } from '../../../testing';

describe('EditContactComponent', () => {
  let activeModal: NgbActiveModal;
  let component: EditContactComponent;
  let contactDataService: ContactDataService;
  let fixture: ComponentFixture<EditContactComponent>;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditContactComponent ],
      imports: [
        FakeUnitTestPresentationDirectivesModule,
        FakeUnitTestPresentationCoreModule,
        FormsModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();

    activeModal = TestBed.inject(NgbActiveModal);
    contactDataService = TestBed.inject(ContactDataService);
    formBuilder = TestBed.inject(FormBuilder);

    spyOn(activeModal, 'close');
    spyOn(activeModal, 'dismiss');

    fixture = TestBed.createComponent(EditContactComponent);
    component = fixture.componentInstance;

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

  describe('during initialization', () => {
    let formBuilderGroupSpy: jasmine.Spy;

    beforeEach(() => formBuilderGroupSpy = spyOn(formBuilder, 'group').and.callThrough());

    it('should build the form', () => {
      fixture.detectChanges();

      expect(formBuilder.group).toHaveBeenCalledTimes(2);

      expect(formBuilderGroupSpy.calls.argsFor(0)[0].city).toBeDefined();
      expect(formBuilderGroupSpy.calls.argsFor(0)[0].city[0]).toBe('Anaheim');
      expect(formBuilderGroupSpy.calls.argsFor(0)[0].city[1].length).toBe(1);
      expect(formBuilderGroupSpy.calls.argsFor(0)[0].city[1]).toEqual(Validators.required);

      expect(formBuilderGroupSpy.calls.argsFor(0)[0].postalCode).toBeDefined();
      expect(formBuilderGroupSpy.calls.argsFor(0)[0].postalCode[0]).toBe('92802');
      expect(formBuilderGroupSpy.calls.argsFor(0)[0].postalCode[1].length).toBe(1);
      expect(formBuilderGroupSpy.calls.argsFor(0)[0].postalCode[1]).toEqual(Validators.required);

      expect(formBuilderGroupSpy.calls.argsFor(0)[0].state).toBeDefined();
      expect(formBuilderGroupSpy.calls.argsFor(0)[0].state[0]).toBe('CA');
      expect(formBuilderGroupSpy.calls.argsFor(0)[0].state[1].length).toBe(1);
      expect(formBuilderGroupSpy.calls.argsFor(0)[0].state[1]).toEqual(Validators.required);

      expect(formBuilderGroupSpy.calls.argsFor(0)[0].street1).toBeDefined();
      expect(formBuilderGroupSpy.calls.argsFor(0)[0].street1[0]).toBe('1313 Disneyland Dr');
      expect(formBuilderGroupSpy.calls.argsFor(0)[0].street1[1].length).toBe(1);
      expect(formBuilderGroupSpy.calls.argsFor(0)[0].street1[1]).toEqual(Validators.required);

      expect(formBuilderGroupSpy.calls.argsFor(0)[0].street2).toBeDefined();
      expect(formBuilderGroupSpy.calls.argsFor(0)[0].street2.length).toBe(1);
      expect(formBuilderGroupSpy.calls.argsFor(0)[0].street2[0]).toBeUndefined();

      expect(formBuilderGroupSpy.calls.mostRecent().args[0].firstName).toBeDefined();
      expect(formBuilderGroupSpy.calls.mostRecent().args[0].firstName[0]).toBe('Mickey');
      expect(formBuilderGroupSpy.calls.mostRecent().args[0].firstName[1].length).toBe(1);
      expect(formBuilderGroupSpy.calls.mostRecent().args[0].firstName[1]).toEqual(Validators.required);

      expect(formBuilderGroupSpy.calls.mostRecent().args[0].lastName).toBeDefined();
      expect(formBuilderGroupSpy.calls.mostRecent().args[0].lastName[0]).toBe('Mouse');
      expect(formBuilderGroupSpy.calls.mostRecent().args[0].lastName[1].length).toBe(1);
      expect(formBuilderGroupSpy.calls.mostRecent().args[0].lastName[1]).toEqual(Validators.required);

      expect(formBuilderGroupSpy.calls.mostRecent().args[0].phoneNumber).toBeDefined();
      expect(formBuilderGroupSpy.calls.mostRecent().args[0].phoneNumber[0]).toBe('7147814636');
      expect(formBuilderGroupSpy.calls.mostRecent().args[0].phoneNumber[1].length).toBe(1);
      expect(formBuilderGroupSpy.calls.mostRecent().args[0].phoneNumber[1]).toEqual(Validators.required);
    });
  });

  describe('dismiss', () => {
    beforeEach(() => fixture.detectChanges());

    it('should dismiss the active modal', () => {
      component.dismiss();

      expect(activeModal.dismiss).toHaveBeenCalledOnceWith();
    });
  });

  describe('save', () => {
    let getContactsResult: Observable<Array<Contact>>;
    let saveContactResult: Observable<boolean>;

    beforeEach(() => {
      fixture.detectChanges();

      (component.editForm.controls['address'] as FormGroup).controls['city'].setValue('Anaheim');
      (component.editForm.controls['address'] as FormGroup).controls['postalCode'].setValue('92802');
      (component.editForm.controls['address'] as FormGroup).controls['state'].setValue('CA');
      (component.editForm.controls['address'] as FormGroup).controls['street1'].setValue('1313 Disneyland Dr');
      component.editForm.controls['firstName'].setValue('Mickey');
      component.editForm.controls['lastName'].setValue('Mouse');
      component.editForm.controls['phoneNumber'].setValue('7147814636');

      spyOn(contactDataService, 'get').and.callFake(() => getContactsResult);
      spyOn(contactDataService, 'save').and.callFake(() => saveContactResult);

      getContactsResult = of([]);
      saveContactResult = of(true);
    });

    it('should not try to save the contact when the form is invalid', () => {
      component.editForm.controls['firstName'].setValue(undefined);

      component.save();

      expect(contactDataService.save).not.toHaveBeenCalled();
    });

    it('should try to save the contact when the form is valid', () => {
      const expected = {
        address: {
          city: 'Anaheim',
          postalCode: '92802',
          state: 'CA',
          street1: '1313 Disneyland Dr',
          street2: null
        } as any as Address,
        firstName: 'Mickey',
        lastName: 'Mouse',
        phoneNumber: '7147814636'
      } as Contact;

      component.save();

      expect(contactDataService.save).toHaveBeenCalledOnceWith(expected);
    });

    it('should refresh the contact list when saving the contact is successful', () => {
      component.save();

      expect(contactDataService.get).toHaveBeenCalledOnceWith();
    });

    it('should close the active modal when saving the contact is successful', () => {
      component.save();

      expect(activeModal.close).toHaveBeenCalledOnceWith();
    });

    it('should not close the active modal when saving the contact throws an error', () => {
      saveContactResult = throwError(() => 'Error');

      component.save();

      expect(activeModal.close).not.toHaveBeenCalled();
    });

    it('should not close the active modal when saving the contact fails', () => {
      saveContactResult = of(false);

      component.save();

      expect(activeModal.close).not.toHaveBeenCalled();
    });
  });
});
