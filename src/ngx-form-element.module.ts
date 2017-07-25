// external
import { forwardRef, Inject, ModuleWithProviders, NgModule, Optional } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';

// internal
import { FormElementComponent } from './ngx-form-element.component';
import { FormElementConfig, FormElementService } from './ngx-form-element.service';

/**
 * To dynamic create HTML Form Elements.
 * @export
 * @class FormElementModule
 */
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [
    FormElementComponent
  ],
  exports: [
    FormElementComponent
  ]
})
export class FormElementModule {
  /**
   * forRoot with param config to configure before html elements.
   * @static
   * @param {FormElementConfig} config
   * @returns {ModuleWithProviders}
   * @memberof FormElementModule
   */
  static forRoot(@Optional() @Inject(FormElementConfig) config?: FormElementConfig): ModuleWithProviders {
    return {
      ngModule: FormElementModule,
      providers: [
        FormElementService,
        {provide: FormElementConfig, useValue: config, multi: true}
      ]
    }
  }

  /**
   * @static
   * @returns
   * @memberof FormElementModule
   */
  static forChild(config: FormElementConfig): ModuleWithProviders {
    return {
      ngModule: FormElementModule,
      providers: [
        {provide: FormElementConfig, useValue: config, multi: true}
      ]
    };
  }
}
