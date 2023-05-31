import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddressPipe } from './pipes/address/address.pipe';
import { PhonePipe } from './pipes/phone/phone.pipe';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';

@NgModule({
  declarations: [
    AddressPipe,
    PhonePipe,
    ConfirmationComponent
  ],
  exports: [
    AddressPipe,
    PhonePipe
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
