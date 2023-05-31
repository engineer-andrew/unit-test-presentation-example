import { Component, Input, OnInit } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ConfirmationComponent } from '../../shared/components';
import { ContactDataService } from '../../core';
import { EditContactComponent } from '../edit-contact/edit-contact.component';
import { Contact } from '../../data/model';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.scss']
})
export class ContactComponent implements OnInit {
  // there's a better way to do this in Angular 16, but this works for now
  @Input() public contact!: Contact;

  constructor(
    private contactDataService: ContactDataService,
    private modalService: NgbModal
  ) { }

  public ngOnInit(): void {
  }

  public delete(): void {
    const modalRef = this.modalService.open(ConfirmationComponent);

    modalRef.componentInstance.message = `Are you sure you want to delete ${this.contact.firstName} ${this.contact.lastName}? This action cannot be undone.`

    modalRef.closed.subscribe({
      next: (result: boolean) => {
        if (result) {
          this.contactDataService.delete(this.contact).subscribe({
            // TODO: show a success message
            next: () => {},
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
