import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { PhoneNumberMask, states } from '../../data/constants';
import { ContactDataService } from '../../core';
import { Address, Contact, StateOrProvince } from '../../data/model';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {
  public addForm!: FormGroup;
  public items: Array<StateOrProvince> = states;
  public PhoneNumberMask: typeof PhoneNumberMask = PhoneNumberMask;

  constructor(
    private activeModal: NgbActiveModal,
    private contactDataService: ContactDataService,
    private formBuilder: FormBuilder
  ) { }

  public ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      address: this.formBuilder.group({
        city: [null, Validators.required],
        postalCode: [null, Validators.required],
        state: [null, Validators.required],
        street1: [null, Validators.required],
        street2: [null]
      }),
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      phoneNumber: [null, Validators.required]
    });
  }

  public dismiss(): void {
    this.activeModal.dismiss();
  }

  public save(): void {
    if (!this.addForm.valid) {
      return;
    }

    const contact = {
      address: {
        city: this.addForm.get('address.city')?.value,
        postalCode: this.addForm.get('address.postalCode')?.value,
        state: this.addForm.get('address.state')?.value,
        street1: this.addForm.get('address.street1')?.value,
        street2: this.addForm.get('address.street2')?.value
      } as Address,
      firstName: this.addForm.controls['firstName'].value,
      lastName: this.addForm.controls['lastName'].value,
      phoneNumber: this.addForm.controls['phoneNumber'].value
    } as Contact;

    this.contactDataService.add(contact).subscribe({
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
