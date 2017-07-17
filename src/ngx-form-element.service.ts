// external
import { Injectable, Optional } from '@angular/core';

// internal
import { component } from '@ngx-core/common';
import { element } from '@ngx-form/type';
import { FormElementConfigInterface, ConfigElementInterface } from '@ngx-form/interface';

/**
 * forRoot config with possible elements to create.
 * @export
 * @class FormElementConfig
 * @implements {FormElementConfigInterface}
 */
export class FormElementConfig implements FormElementConfigInterface {
  elements: Array<ConfigElementInterface>;
  errorMessages?: {};
};

/**
 * Service to hold the config with configured elements component
 * @export
 * @class FormElementServiceFormElementConfig
 */
@Injectable()
export class FormElementService {
  private _config: FormElementConfig;
  set config(config: FormElementConfig) {
    this._config = config;
  }
  get config(): FormElementConfig {
    return this._config;
  }

  /**
   * Creates an instance of FormElementService.
   * @param {FormElementConfig} config
   * @memberof FormElementService
   */
  constructor( @Optional() config: FormElementConfig) {
    if (config) {
      this.config = config;
    }
    return this;
  }

  /**
   * Search element `name` in config `elements` and return component assigned to it.
   * @param {e} element name of html element for example 'input'
   * @returns {null | any}
   */
  find(e: element): null | any {
    let t: component | null = null;
    if (e) {
      if (this.config) {
        if (this.config.elements instanceof Array && this.config.elements.length > 0) {
          this.config.elements.forEach((value, index) => {
            if (value['name'] === e) {
              t = value.component;
            }
          });
        }
      }
    }
    return t;
  }
}
