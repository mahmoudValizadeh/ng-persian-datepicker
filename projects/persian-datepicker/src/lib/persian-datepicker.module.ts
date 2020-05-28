import { NgModule } from '@angular/core';
import { PersianDatepickerComponent } from './persian-datepicker.component';
import { BrowserModule } from '@angular/platform-browser'


@NgModule({
  declarations: [PersianDatepickerComponent],
  imports: [
    BrowserModule
  ],
  exports: [PersianDatepickerComponent]
})
export class PersianDatepickerModule { }
