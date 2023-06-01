import { Observable, ReplaySubject } from 'rxjs';

export class MockNgbModalRef {
  private _closed = new ReplaySubject<any>();
  private _dismissed = new ReplaySubject<any>();

  public componentInstance: any = {};

  get closed(): Observable<any> {
    return this._closed.asObservable();
  }

  get dismissed(): Observable<any> {
    return this._dismissed.asObservable();
  }

  public close(reason?: any): void {
  }

  public dismiss(reason?: any): void {
  }

  public setClosedResult(result: any): void {
    this._closed.next(result);
  }

  public setDismissedResult(result: any): void {
    this._dismissed.next(result);
  }
}