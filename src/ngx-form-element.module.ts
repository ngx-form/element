// external
import { Inject, ModuleWithProviders, NgModule, Optional } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// internal
import { FormElementComponent } from './ngx-form-element.component';
import { FormElementConfig, FormElementService } from './ngx-form-element.service';
import { ValidatorService } from './ngx-form-element-validator.service';

/**
 * To dynamic create HTML Form Elements.
 * @export
 * @class FormElementModule
 */
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [ FormElementComponent ],
  exports: [ FormElementComponent ]
})
export class FormElementModule {
  /**
   * forRoot with param config to configure before html elements.
   * @static
   * @param {FormElementConfig} config
   * @returns {ModuleWithProviders}
   * @memberof FormElementModule
   */
  static forRoot( @Optional() @Inject(FormElementConfig) config?: FormElementConfig): ModuleWithProviders {
    return {
      ngModule: FormElementModule,
      providers: (config) ?
        [
          FormElementService,
          ValidatorService,
          { provide: FormElementConfig, useValue: config }
        ] :
        [
          FormElementService,
          ValidatorService
        ]
    }
  }

  /**
   * @static
   * @returns
   * @memberof FormElementModule
   */
  static forChild() {
    return {
      ngModule: FormElementModule
    };
  }
}
