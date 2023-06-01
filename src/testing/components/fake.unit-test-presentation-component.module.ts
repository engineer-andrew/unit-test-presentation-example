import { NgModule } from '@angular/core';

import { FakeAddContactComponent, FakeEditContactComponent, FakeViewContactComponent } from './internal';
import { FakeNgIconComponent } from './third-party';

@NgModule({
  declarations: [
    FakeAddContactComponent,
    FakeEditContactComponent,
    FakeNgIconComponent,
    FakeViewContactComponent
  ],
  exports: [
    FakeAddContactComponent,
    FakeEditContactComponent,
    FakeNgIconComponent,
    FakeViewContactComponent
  ]
})
export class FakeUnitTestPresentationComponentModule {
}