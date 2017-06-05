import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComponentFactoryResolver, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DynamicComponent } from './dynamic.component';
import { FormElementModule } from './../src';
import { FormElementService } from './../src/ngx-form-element.service';
import { TestComponent } from './test.component';
import { InputComponent } from './input.component';

@NgModule({
  imports: [
    CommonModule,
    FormElementModule.forRoot({
      elements: [
        {
          name: 'input',
          component: InputComponent
        }
      ]
    }),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    DynamicComponent,
    InputComponent,
    TestComponent
  ],
  entryComponents: [
    DynamicComponent,
    InputComponent
  ],
  providers: [FormElementService]
})
export class TestModule { }
