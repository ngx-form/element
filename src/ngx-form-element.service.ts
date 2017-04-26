// external
import { Inject, Injectable, Optional, Type } from '@angular/core';

// internal
// import { component, element } from '@ngx-core/type';
import { element } from '@ngx-form/core';
import { FormComponentInterface } from '@ngx-form/core';
import { FormElementConfigInterface } from './ngx-form-element.interface';

export class FormElementConfig implements FormElementConfigInterface {
  types: Array<FormComponentInterface>;
};

export type component = Type<{}> | null;

@Injectable()
export class FormElementService {

  private _config: FormElementConfig;

  constructor( @Optional() config: FormElementConfig) {
    if (config) {
      this.config = config;
    }
    return this;
  }

  /**
   * Search element name in config types and return component assigned to it
   * @param element name of html element for example 'input'
   */
  element(element: element): any {
    let t: component = null;
    if (element) {
      if (this.config) {
        if (this.config.types instanceof Array && this.config.types.length > 0) {
          this.config.types.forEach((value, index) => {
            if (value['type'] === element) {
              t = value.component;
            }
          });
        }
      }
    }
    return t;
  }

  set config(config: FormElementConfig) {
    this._config = config;
  }
  get config() {
    return this._config;
  }
}
