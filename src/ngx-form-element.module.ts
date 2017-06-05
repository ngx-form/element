// external
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// internal
import { FormElementComponent } from './ngx-form-element.component';
import { FormElementService } from './ngx-form-element.service';
import { FormElementConfig } from './ngx-form-element.service';

/**
 * To dynamic create HTML Form Elements.
 * @export
 * @class FormElementModule
 */
@NgModule({
  imports: [ CommonModule ],
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
  static forRoot(config: FormElementConfig): ModuleWithProviders {
    return {
      ngModule: FormElementModule,
      providers: [
        FormElementService,
        {
          provide: FormElementConfig,
          useValue: config
        }
      ]
    };
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
