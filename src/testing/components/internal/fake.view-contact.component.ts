import { Component, Input } from '@angular/core';

import { Contact } from '../../../app/data';

@Component({
  selector: 'app-view-contact',
  template: ''
})
export class FakeViewContactComponent {
  @Input() public contact!: Contact;
}
