import { Component, Input, OnInit } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ConfirmationComponent } from '../../shared/components';
import { ContactDataService } from '../../core';
import { Contact } from '../../data';
import { EditContactComponent } from '../edit-contact/edit-contact.component';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html'
})
export class ViewContactComponent {
  // there's a better way to do this in Angular 16, but this works for now
  @Input() public contact!: Contact;

  constructor(
    private contactDataService: ContactDataService,
    private modalService: NgbModal
  ) { }

  public delete(): void {
    const modalRef = this.modalService.open(ConfirmationComponent);

    modalRef.componentInstance.message = `Are you sure you want to delete ${this.contact.firstName} ${this.contact.lastName}? This action cannot be undone.`

    modalRef.closed.subscribe({
      next: (result: boolean) => {
        if (result) {
          this.contactDataService.delete(this.contact).subscribe({
            // TODO: show a success message
            next: (result: boolean) => {
              if (result) {
                this.contactDataService.get().subscribe({
                  error: () => {}
                });
              }
            },
            // TODO: show an error message
            error: () => {}
          })
        }
      }
    });
  }

  public edit(): void {
    const modalRef = this.modalService.open(EditContactComponent);

    modalRef.componentInstance.contact = this.contact;
  }
}
