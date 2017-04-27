import {
  ComponentFactoryResolver,
  EventEmitter,
  Inject,
  Input,
  Output
} from '@angular/core';
const lodash = require('lodash');

import {
  DestroyInterface,
  FormElementDataInterface,
  FormElementInputInterface,
  FormSelectInterface,
} from '@ngx-form/interface';

import { component, DynamicComponentClass } from '@ngx-core/common';
import { autocomplete, element, event, input, required } from '@ngx-form/type';
import { FormElementService } from './ngx-form-element.service';

export abstract class FormElementClass extends DynamicComponentClass {

  protected formElementService: FormElementService;

  protected _autocomplete: autocomplete = 'off';
  set autocomplete(autocomplete: autocomplete) {
    this._autocomplete = autocomplete;
    this._set('autocomplete');
  };
  get autocomplete() {
    return this._autocomplete;
  }

  /*
    onDestroy what to do
  */
  protected destroy: DestroyInterface = {
    onCancelled: false,
    onChanged: false,
    onSubmitted: false
  };

  // Form Element is disabled
  protected _disabled = false;
  set disabled(disabled: boolean) {
    this._disabled = disabled;
    this._set('disabled');
  };
  get disabled() {
    return this._disabled;
  }

  /*
    specify html element name for example 'checkbox' | 'input' | 'select' to create new component configured before
    and could be find in FormElementService
  */
  protected _element: element;
  set element(element: element) {
    this._element = element;
    this.elementComponent = this.formElementService.element(element);
  }
  get element() {
    return this._element;
  }

  /*
    This is main @input data that you assign all possible variables specified in interface
  */
  _data: FormElementDataInterface;
  @Input() set data(data: FormElementDataInterface) {
    this._data = data;
    this.set(data);
  }
  get data() { return this._data; }

  protected hint: any;

  // provide input element
  @Input() input: FormElementInputInterface;

  protected key: string;
  protected max: number;
  protected min: number;
  protected maxlength: number;
  protected minlength: number;
  protected model: any;
  protected placeholder: string;

  /*
    component that is assigned when element is found in FormElementService
  */
  protected elementComponent: component;

  protected _required: required;
  set required(required: required) {
    this._required = required;
    this._set('required');
  };
  get required() {
    return this._required;
  }

  // element select html form
  // protected select: FormSelectInterface;

  protected type: input;

  protected viewValue: Array<any>;

  // Events
  @Output() cancelled: EventEmitter<any>  = new EventEmitter(false);
  @Output() changed: EventEmitter<any>    = new EventEmitter(false);
  @Output() submitted: EventEmitter<any>  = new EventEmitter(false);

  constructor(
    componentFactoryResolver: ComponentFactoryResolver,
    @Inject(FormElementService) service: FormElementService
  ) {
    super(componentFactoryResolver);
    this.formElementService = service;
  }

  protected createElement() {
    if (this.type && this.model && this.elementComponent) {
      this
        ._create(this.elementComponent)
        ._set([
          'autocomplete',
          'destroy',
          'disabled',
          'element',
          'hint',
          'key',
          'model',
          'placeholder',
          'required',
          'max',
          'min',
          'maxlength',
          'minlength',
          'type',
          'viewValue'
        ])
        ._subscribe('cancelled', this.onCancelled)
        ._subscribe('changed', this.onChanged)
        ._subscribe('submitted', this.onSubmitted);
    }
  }

  // on cancel destroy true or false
  private onCancelled = () => {
    if (this.destroy && this.destroy.onCancelled === true) {
      this.removeElement(this.destroy.onCancelled);
    }
  }

  // on change destroy true or false
  private onChanged = () => {
    if (this.destroy && this.destroy.onChanged === true) {
      this.removeElement(this.destroy.onChanged);
    }
  }

  // on submit destroy true or false
  private onSubmitted = (result: any) => {
    if (this.destroy && this.destroy.onSubmitted === true) {
      this.removeElement(this.destroy.onSubmitted);
    }
  }

  // removeElement
  private removeElement(destroy?: boolean): void {
    if (destroy === true) {
      this._destroy();
    }
  }

  private remove_() {
    const t = Object.assign({}, this);
    lodash.forEach(t, (value: any, key: any) => {
      if (key.indexOf('_') > -1) {
        t[key.replace('_', '')] = t[key];
        delete t[key];
      }
    });
    return t;
  }

  protected set(data: FormElementDataInterface): void {
    if (data) {
      lodash.forEach(data, (value: any, key: any) => {
        if (key !== 'data') {
          if (key && value) {
            this[key] = value;
          }
        }
      });
    }
  }

  protected updateData(data: FormElementDataInterface): void {
    if (data) {
      data = Object.assign({}, data);
      const t = this.remove_();
      lodash.reduce(data, (result: any, value: any, key: any) => {
        if (lodash.isEqual(value, t[key]) === false) {
          this[key] = this.data[key];
        }
      }, []);
    }
  }
}
