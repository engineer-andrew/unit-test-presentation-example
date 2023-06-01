import { NgModule } from '@angular/core';

import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ContactDataService } from '../../app/core';
import { MockContactDataService } from './data-providers';
import { MockNgbActiveModal, MockNgbModal } from './third-party';

@NgModule({
  providers: [
    {
      provide: ContactDataService,
      useClass: MockContactDataService
    },
    {
      provide: NgbActiveModal,
      useClass: MockNgbActiveModal
    },
    {
      provide: NgbModal,
      useClass: MockNgbModal
    }
  ]
})
export class FakeUnitTestPresentationCoreModule {
}
