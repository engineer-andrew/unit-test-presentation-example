import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { PhoneNumberMask, states } from '../../data/constants';
import { ContactDataService } from '../../core';
import { Address, Contact, StateOrProvince } from '../../data/model';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss']
})
export class EditContactComponent implements OnInit {
  @Input() public contact!: Contact;

  public editForm!: UntypedFormGroup;
  public items: Array<StateOrProvince> = states;
  public PhoneNumberMask: typeof PhoneNumberMask = PhoneNumberMask;

  constructor(
    private activeModal: NgbActiveModal,
    private contactDataService: ContactDataService,
    private formBuilder: FormBuilder
  ) { }

  public ngOnInit(): void {
    this.editForm = this.formBuilder.group({
      address: this.formBuilder.group({
        city: [this.contact?.address?.city, Validators.required],
        postalCode: [this.contact?.address?.postalCode, Validators.required],
        state: [this.contact?.address.state, Validators.required],
        street1: [this.contact?.address?.street1, Validators.required],
        street2: [this.contact?.address?.street2]
      }),
      firstName: [this.contact?.firstName, Validators.required],
      lastName: [this.contact?.lastName, Validators.required],
      phoneNumber: [this.contact?.phoneNumber, Validators.required]
    });
  }

  public dismiss(): void {
    this.activeModal.dismiss();
  }

  public save(): void {
    this.contact.address = {
      city: this.editForm.get('address.city')?.value,
      postalCode: this.editForm.get('address.postalCode')?.value,
      state: this.editForm.get('address.state')?.value,
      street1: this.editForm.get('address.street1')?.value,
      street2: this.editForm.get('address.street2')?.value
    } as Address;
    this.contact.firstName = this.editForm.controls['firstName'].value;
    this.contact.lastName = this.editForm.controls['lastName'].value;
    this.contact.phoneNumber = this.editForm.controls['phoneNumber'].value;

    this.contactDataService.save(this.contact).subscribe({
      next: (result: boolean) => {
        if (result) {
          this.contactDataService.get().subscribe({
            error: () => {}
          });
          this.activeModal.close();
        } else {
          // TODO: display an error message
        }
      },
      error: () => {
        // TODO: display an error message
      }
    });
  }
}
