import { Component, OnDestroy, OnInit } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';

import { AddContactComponent } from '../../components/add-contact/add-contact.component';
import { ContactDataService, ContactStateService } from '../../core';
import { Contact, StoreState } from '../../data';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html'
})
export class ContactListComponent implements OnInit, OnDestroy {
  public contacts: Array<Contact> | null | undefined;

  private subscriptions: Subscription = new Subscription();

  constructor(
    private contactDataService: ContactDataService,
    private contactStateService: ContactStateService,
    private modalService: NgbModal
  ) { }

  public ngOnInit(): void {
    this.subscriptions.add(
      this.contactStateService.stateChanged.subscribe((state: StoreState) => this.contacts = state?.contacts)
    );

    this.contactDataService.get().subscribe({
      error: () => {}
    });
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public add(): void {
    this.modalService.open(AddContactComponent);
  }
}
