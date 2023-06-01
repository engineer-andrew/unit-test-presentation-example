import { TestBed } from '@angular/core/testing';

import { ContactStateService } from './contact-state.service';

xdescribe('ContactStateService', () => {
  let service: ContactStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
