import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { Contact } from '../../data';
import { EditContactComponent } from './edit-contact.component';
import { FakeUnitTestPresentationDirectivesModule, FakeUnitTestPresentationCoreModule } from '../../../testing';

describe('EditContactComponent', () => {
  let component: EditContactComponent;
  let fixture: ComponentFixture<EditContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditContactComponent ],
      imports: [
        FakeUnitTestPresentationCoreModule,
        FakeUnitTestPresentationDirectivesModule,
        FormsModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditContactComponent);
    component = fixture.componentInstance;
    component.contact = {
      address: {
        city: 'Anaheim',
        id: 1,
        postalCode: '92802',
        state: 'CA',
        street1: '1313 Disneyland Dr'
      },
      firstName: 'Mickey',
      lastName: 'Mouse',
      phoneNumber: '7147814636'
    } as Contact;
    fixture.detectChanges();
  });

  it('should invoke the dismiss function when the close button is clicked', () => {
    spyOn(component, 'dismiss');  
    const closeButton = fixture.debugElement.query(By.css('.btn-close'));

    closeButton.triggerEventHandler('click', null);

    expect(component.dismiss).toHaveBeenCalledTimes(1);
  });

  it('should invoke the save function when the Save button is clicked', () => {
    spyOn(component, 'save');
    const saveButton = fixture.debugElement.query(By.css('.btn.btn-primary'));

    saveButton.triggerEventHandler('click', null);

    expect(component.save).toHaveBeenCalledTimes(1);
  });
});
