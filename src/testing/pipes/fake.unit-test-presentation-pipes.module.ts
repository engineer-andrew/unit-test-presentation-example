import { NgModule } from '@angular/core';

import { FakeAddressPipe } from './fake.address-pipe copy';
import { FakePhonePipe } from './fake.phone-pipe';

@NgModule({
  declarations: [
    FakeAddressPipe,
    FakePhonePipe
  ],
  exports: [
    FakeAddressPipe,
    FakePhonePipe
  ]
})
export class FakeUnitTestPresentationPipesModule {
}
