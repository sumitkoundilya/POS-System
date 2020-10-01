import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopUpComponent } from './pop-up.component';

@NgModule({
  declarations: [PopUpComponent],
  imports: [CommonModule],
  exports: [PopUpComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class PopUpModule { }
