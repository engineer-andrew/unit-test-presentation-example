import { Directive, Input } from '@angular/core';

@Directive({
  selector: 'input[mask], textarea[mask]',
  exportAs: 'mask,ngxMask'
})
export class FakeNgxMaskDirective {
  @Input() mask!: string;
  @Input() showMaskTyped!: boolean;
}
