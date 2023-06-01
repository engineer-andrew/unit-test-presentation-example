import { Injectable } from '@angular/core';

@Injectable()
export class MockNgbActiveModal {
  public close(result?: any): void {}

  public dismiss(reason?: any): void {}
}
