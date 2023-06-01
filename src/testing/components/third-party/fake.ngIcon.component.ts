import { Component, Input } from '@angular/core';

@Component({
  selector: 'ng-icon',
  template: ''
})
export class FakeNgIconComponent {
  @Input() public name!: string;
  @Input() public size!: string;
}
