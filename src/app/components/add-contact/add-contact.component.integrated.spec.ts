import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { AddContactComponent } from './add-contact.component';
import { FakeUnitTestPresentationDirectivesModule, FakeUnitTestPresentationCoreModule } from '../../../testing';

describe('AddContactComponent', () => {
  let component: AddContactComponent;
  let fixture: ComponentFixture<AddContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddContactComponent ],
      imports: [
        FakeUnitTestPresentationCoreModule,
        FakeUnitTestPresentationDirectivesModule,
        FormsModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddContactComponent);
    component = fixture.componentInstance;
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
