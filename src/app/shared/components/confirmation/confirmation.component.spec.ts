import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ConfirmationComponent } from './confirmation.component';
import { FakeUnitTestPresentationCoreModule } from '../../../../testing';

describe('ConfirmationComponent', () => {
  let activeModal: NgbActiveModal;
  let component: ConfirmationComponent;
  let fixture: ComponentFixture<ConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmationComponent ],
      imports: [ FakeUnitTestPresentationCoreModule ]
    })
    .compileComponents();

    activeModal = TestBed.inject(NgbActiveModal);

    spyOn(activeModal, 'close');
    spyOn(activeModal, 'dismiss');

    fixture = TestBed.createComponent(ConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('during initialization', () => {
    it('should use \'Yes\' as the default value of the confirmation button when no value is provided', () => {
      expect(component.confirmationButtonText).toBe('Yes');
    });

    it('should use \'No\' as the default value of the rejection button when no value is provided', () => {
      expect(component.rejectionButtonText).toBe('No');
    });

    it('should use \'Are you sure?\' as the default value of the title when no value is provided', () => {
      expect(component.title).toBe('Are you sure?');
    });
  });

  describe('confirm', () => {
    it('should close the active modal, passing true as the result', () => {
      component.confirm();

      expect(activeModal.close).toHaveBeenCalledOnceWith(true);
    });
  });

  describe('dismiss', () => {
    it('should dismiss the active modal', () => {
      component.dismiss();

      expect(activeModal.dismiss).toHaveBeenCalledOnceWith();
    });
  });

  describe('reject', () => {
    it('should close the active modal, passing false as the result', () => {
      component.reject();

      expect(activeModal.close).toHaveBeenCalledOnceWith(false);
    });
  });
});
