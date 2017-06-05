// external
import { Inject, Injectable, Optional, Type } from '@angular/core';

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
};

/**
 * Service to hold the config with configured elements component
 * @export
 * @class FormElementService
 */
@Injectable()
export class FormElementService {

  private _config: FormElementConfig;

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
   * @param {element} element name of html element for example 'input'
   * @returns {null | any}
   */
  find(element: element): null | any {
    let t: component | null = null;
    if (element) {
      if (this.config) {
        if (this.config.elements instanceof Array && this.config.elements.length > 0) {
          this.config.elements.forEach((value, index) => {
            if (value['name'] === element) {
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
  get config(): FormElementConfig {
    return this._config;
  }
}
