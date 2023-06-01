import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

import { MockNgbModalRef } from '../../data';

export class MockNgbModal {
  public open(content: any, options: NgbModalOptions = {}): MockNgbModalRef {
    return {} as MockNgbModalRef;
  }

  get activeInstance(): Array<MockNgbModalRef> { return [] as Array<MockNgbModalRef>; }

  public dismissAll(reason?: any): void { }

  public hasOpenModals(): boolean {
    return false;
  }
}