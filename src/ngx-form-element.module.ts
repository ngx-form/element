// external
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// internal
import { FormElementComponent } from './ngx-form-element.component';
import { FormElementService } from './ngx-form-element.service';
import { FormElementConfig } from './ngx-form-element.service';

@NgModule({
  imports: [ CommonModule ],
  declarations: [ FormElementComponent ],
  exports: [ FormElementComponent ]
})
export class FormElementModule {
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

  static forChild() {
    return {
      ngModule: FormElementModule
    };
  }
}
