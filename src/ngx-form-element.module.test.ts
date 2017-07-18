// external
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
// internal
import { FormElementModule } from './ngx-form-element.module';
import { InputComponent } from './../test/input.component';

@NgModule({
  declarations: [
    InputComponent
  ],
  entryComponents: [
    InputComponent
  ],
  imports: [
    CommonModule,
    FormElementModule.forRoot({
      elements: [ { name: 'input', component: InputComponent } ]
    }),
    ReactiveFormsModule
  ]
})
export class TestFormElementModule {
  constructor() { }
}
