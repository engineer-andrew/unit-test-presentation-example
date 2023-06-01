import { NgModule } from '@angular/core';

import { FakeNgxMaskDirective } from './third-party';

@NgModule({
  declarations: [
    FakeNgxMaskDirective
  ],
  exports: [
    FakeNgxMaskDirective
  ]
})
export class FakeUnitTestPresentationDirectivesModule {
}
