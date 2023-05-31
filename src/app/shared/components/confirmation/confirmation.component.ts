import { Component, Input, OnInit } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {
  @Input() public confirmationButtonText: string = 'Yes';
  @Input() public message!: string;
  @Input() public rejectionButtonText: string = 'No';
  @Input() public title: string = 'Are you sure?';

  constructor(private activeModal: NgbActiveModal) { }

  public ngOnInit(): void {
  }

  public confirm(): void {
    this.activeModal.close(true);
  }

  public dismiss(): void {
    this.activeModal.dismiss();
  }

  public reject(): void {
    this.activeModal.close(false);
  }
}
