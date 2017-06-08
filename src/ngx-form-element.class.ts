// external
import {
  ComponentFactoryResolver,
  EventEmitter,
  Inject,
  Input,
  Output
} from '@angular/core';

import * as _ from 'lodash-es';
// TODO: remove when test in karma ...
import { DestroyInterface, FormElementDataInterface } from '@ngx-form/interface';
import { component, DynamicComponentClass } from '@ngx-core/common';
import { autocomplete, disabled, element, event, input, required } from '@ngx-form/type';

// internal
import { FormElementService } from './ngx-form-element.service';

/**
 * @export
 * @abstract
 * @class FormElementClass
 * @extends {DynamicComponentClass}
 */
export abstract class FormElementClass extends DynamicComponentClass {

  /**
   * Service to find in provided by user config connection real `component` from `entryComponents` with provided name.
   * @protected
   * @type {FormElementService}
   * @memberof FormElementClass
   */
  protected formElementService: FormElementService;

  /**
   * Property to use or not `autocomplete` functionality of input HTML Form Element.
   * @protected
   * @type {autocomplete}
   * @memberof FormElementClass
   */
  protected _autocomplete: autocomplete = 'off';

  /**
   * Setter to define `_autocomplete` in extended class and created dynamic component instance property `__component`.
   * @memberof FormElementClass
   */
  set autocomplete(autocomplete: autocomplete) {
    // const z = arguments.callee.name;
    // console.log(z);
    this._autocomplete = autocomplete;
    this.__set('autocomplete');
  };
  /**
   * @readonly
   * @memberof FormElementClass
   */
  get autocomplete() {
    return this._autocomplete;
  }

  /**
   * When to destroy dynamic component instance from property `__component`.
   * @protected
   * @type {DestroyInterface}
   * @memberof FormElementClass
   */
  protected _destroy: DestroyInterface = {
    onCancelled: false,
    onChanged: false,
    onSubmitted: false
  };
  /**
   * Setter to define `_destroy` in extended class and created dynamic component instance property `__component`.
   * @memberof FormElementClass
   */
  set destroy(destroy: DestroyInterface) {
    this._destroy = destroy;
    this.__set('destroy');
  }
  /**
   * @readonly
   * @memberof FormElementClass
   */
  get destroy() {
    return this._destroy;
  }

  /**
   * Property to disable or not functionality of specific HTML Form Element.
   * @protected
   * @type {disabled}
   * @memberof FormElementClass
   */
  protected _disabled: disabled = '';
  /**
   * Setter to define `_disabled` in extended class and created dynamic component instance property `__component`.
   * @memberof FormElementClass
   */
  set disabled(disabled: disabled) {
    this._disabled = disabled;
    this.__set('disabled');
  };
  /**
   * @readonly
   * @memberof FormElementClass
   */
  get disabled() {
    return this._disabled;
  }

  /**
   * HTML Form Element of component name like for example 'checkbox' 'input' in config to dynamic create.
   * Important thing the same time you set property `elementComponent` will be set to just founded component from `FormElementService`
   * @protected
   * @type {element}
   * @memberof FormElementClass
   */
  protected _element: element;
  /**
   * Setter to define `_element` in extended class and created dynamic component instance property `__component`.
   * @memberof FormElementClass
   */
  removed = false;
  set element(element: element) {
    this._element = element;
    if (element === null) {
      // console.log(`test`, element);
      this.remove(true);
    } else {
      this.elementComponent = this.formElementService.find(element);
      if (this.elementComponent === null) {
        throw new Error(`
          You need to define config for example as below:
          FormElementModule.forRoot({
              elements: [
                {
                  name: 'input',
                  component: YourInputComponent
                },
                {
                  name: 'select',
                  component: YourSelectComponent
                }
              ]
            }),
        `);
      } else {
        if (!this.createdElementComponent() && this.removed === true) {
          this.init();
        }
      }
    }
  }
  /**
   * @readonly
   * @memberof FormElementClass
   */
  get element() {
    return this._element;
  }

  /**
   * Main @Input('data') that is used to assign all possible `properties` specified in its interface.
   * @type {FormElementDataInterface}
   * @memberof FormElementClass
   */
  _data: FormElementDataInterface;
  /**
   * Setter to define `_data` in extended class and created dynamic component instance property `__component`.
   * @memberof FormElementClass
   */
  @Input() set data(data: FormElementDataInterface) {
    console.log(`data`, data);
    this._data = data;
    this.properties(data);
  }
  /**
   * @readonly
   * @memberof FormElementClass
   */
  get data() {
    return this._data;
  }

  /**
   * @protected
   * @type {*}
   * @memberof FormElementClass
   */
  protected hint: any;

  /**
   * Key for the model property.
   * @protected
   * @type {string}
   * @memberof FormElementClass
   */
  protected _key: string;
  set key(key: string) {
    this._key = key;
  }
  get key(): string {
    return this._key;
  }

  /**
   * HTML Form Element attribute used in for example `input`.
   * @protected
   * @type {number}
   * @memberof FormElementClass
   */
  protected _max: number;
  set max(max: number) {
    this._max = max;
  }
  get max(): number {
    return this._max;
  }

  /**
   * @protected
   * @type {number}
   * @memberof FormElementClass
   */
  protected _min: number;
  set min(min: number) {
    this._min = min;
  }
  get min(): number {
    return this._min;
  }

  /**
   * HTML Form Element attribute used in for example `input`.
   * @protected
   * @type {number}
   * @memberof FormElementClass
   */
  protected _maxlength: number;
  /**
   * Set property `_maxlength` value to this and to component instance from this `_component`.
   * @param {number} type - The type of element
   * @memberof FormElementClass
   */
  set maxlength(maxlength: number) {
    this._maxlength = maxlength;
    this.__set('maxlength');
  }
  /**
   * Get property `minlength` from this component
   * @returns {number} `_maxlength`
   */
  get maxlength() {
    return this._maxlength;
  }

  /***
   * Set property `minlength` value to this component and to created component instance in property _component
   * @param {number} minlength
   */
  protected _minlength: number;
  set minlength(minlength: number) {
    this._minlength = minlength;
    this.__set('minlength');
  }
  /**
   * Get property `minlength` from this component
   * @returns {number} `_minlength`
   */
  get minlength(): number {
    return this._minlength;
  }

  /**
   * Property of `any` type for html angular attribute `[(NgModel)]` or for formGroup.
   */
  protected _model: any;
  /**
   * Set property `model` value to this component and to created component instance in property _component.
   * @param {any} model - in most case json
   */
  set model(model: any) {
    this._model = model;
    this.__set('model');
  }
  /**
   * Get property `model` from this component
   * @returns {any} `_model`
   */
  get model(): any {
    return this._model;
  }

  /**
   * Property of `string` type for html attribute `placeholder`.
   */
  protected _placeholder: string;
  /**
   * Set property `placeholder` value to this component and to created component instance in property _component.
   * @param {string} placeholder
   */
  set placeholder(placeholder: string) {
    this._placeholder = placeholder;
    this.__set('placeholder');
  }
  /**
   * Get property `placeholder` from this component
   * @returns {string} placeholder
   */
  get placeholder(): string {
    return this._placeholder;
  }

  /**
   * property is assigned when element is found in FormElementService
   */
  protected _elementComponent: component;
  set elementComponent(component: component) {
    this._elementComponent = component;
  }
  get elementComponent(): component {
    return this._elementComponent;
  }

  /**
   * Set property `required` value to this component and to created component instance in property _component
   * @param {required} required - Html element is required
   */
  protected _required: required;
  set required(required: required) {
    this._required = required;
    this.__set('required');
  };
  /**
   * Get property `type` from this component
   * @returns {required} required
   */
  get required(): required {
    return this._required;
  }

  /**
   * html attribute property for input
   * @protected
   * @type {input}
   * @memberof FormElementClass
   */
  protected _type: input;
  /**
   * Setter: set property `_type` value to this component and to created component instance in property _component
   * @param {input} type - The type of element
   * @memberof FormElementClass
   */
  set type(type: input) {
    this._type = type;
    this.__set('type');
  }
  /**
   * @readonly
   * @type {input}
   * @memberof FormElementClass
   */
  get type(): input {
    return this._type;
  }

  /**
   *
   * @protected
   * @type {Array<any>}
   * @memberof FormElementClass
   */
  protected viewValue: Array<any>;

  // Events
  @Output() cancelled: EventEmitter<any> = new EventEmitter();
  @Output() changed: EventEmitter<any> = new EventEmitter();
  @Output() created: EventEmitter<any> = new EventEmitter();
  @Output() destroyed: EventEmitter<any> = new EventEmitter();
  @Output() submitted: EventEmitter<any> = new EventEmitter();

  /**
   * Creates an instance of FormElementClass.
   * @param {ComponentFactoryResolver} componentFactoryResolver
   * @param {FormElementService} service
   *
   * @memberof FormElementClass
   */
  constructor(
    componentFactoryResolver: ComponentFactoryResolver,
    service: FormElementService
    // @Inject(FormElementService) service: FormElementService
  ) {
    super(componentFactoryResolver);
    this.formElementService = service;
  }

  /**
   * Dynamically create new component from property `elementComponent` with properties `type` and `model`
   * @private
   * @memberof FormElementClass
   */
  private create(component: component, properties?: string | Array<string>): void {
    if (this.type && this.model) {
      this.__create(component);
      this.created.emit(true);
      this.destroyed.emit(false);
      if (properties) {
        this.set(properties);
      }
    }
  }

  /**
   * Get property `__component` from `DynamicComponentClass` using `__get`
   * @returns {*}
   * @memberof FormElementClass
   */
  public createdElementComponent(): any {
    return this.__get('__component');
  }

  public get(property: string): any {
    return this.__get(property);
  }

  /**
   * Init create of new dynamic component using property elementComponent
   * @protected
   * @memberof FormElementClass
   */
  public init(): void {
    if (this.elementComponent) {
      this.create(this.elementComponent);
      this.set([
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
      ]);
      this.subscribe('cancelled', this.onCancelled);
      this.subscribe('changed', this.onChanged);
      this.subscribe('submitted', this.onSubmitted);
    }
  }

  /**
   * On submit emit event `cancelled` and if property `destroy.onCancelled` is true remove `__component` instance
   * @private
   * @memberof FormElementClass
   */
  private onCancelled = (result: any) => {
    this.cancelled.emit(result);
    if (this.destroy && this.destroy.onCancelled === true) {
      this.remove(this.destroy.onCancelled);
    }
  }

  /**
   * On submit emit event `changed` and if property `destroy.onChanged` is true remove `__component` instance
   * @private
   * @memberof FormElementClass
   */
  private onChanged = (result: any) => {
    if (result) {
      this.changed.emit(result);
    }
    if (this.destroy && this.destroy.onChanged === true) {
      this.remove(this.destroy.onChanged);
    }
  }

  /**
   * On submit emit event `submitted` and if property `destroy.onSubmitted` is true remove `__component` instance
   * @private
   * @memberof FormElementClass
   */
  private onSubmitted = (result: any) => {
    if (result) {
      this.submitted.emit(result);
    }
    if (this.destroy && this.destroy.onSubmitted === true) {
      this.remove(this.destroy.onSubmitted);
    }
  }

  /**
   * Set all properties from @param data to this object
   * @protected
   * @param {FormElementDataInterface} data - provide properties you want to use
   * @memberof FormElementClass
   */
  protected properties(data: FormElementDataInterface): void {
    if (data) {
      // console.log(`properties`, data, this);
      const oldThis = Object.assign(this);
      _.forEach(data, (value: any, key: any) => {
        // console.log(`key: `, key, `, this[key]: `, this[key], ` === `, `oldThis[key]`, oldThis[key], `value: `, value);
        if (key !== 'data') {
          if (value !== oldThis[key]) {
            this[key] = value;
          }
        }
      });
    }
  }

  /**
   * If true destroy created component in property `__component` and set to null
   * @public
   * @param {boolean} [destroy]
   * @memberof FormElementClass
   */
  public remove(destroy?: boolean): void {
    if (destroy === true) {
      this.removed = destroy;
      this.__destroy();
      this.created.emit(false);
      this.destroyed.emit(true);
    }
  }

  /**
   * Define properties in property `__component` instance
   * @param {(string | Array<string>)} property
   * @memberof FormElementClass
   */
  private set(property: string | Array<string>) {
    this.__set(property);
  }

  /**
   * Subscribe to @Output property in property `__component` instance
   * @public
   * @param {string} property - property from dynamic component
   * @param {*} [callback]
   * @param {*} [error]
   * @param {*} [complete]
   * @memberof FormElementClass
   */
  public subscribe(property: string, callback?: any, error?: any, complete?: any): void {
    this.__subscribe(property, callback, error, complete);
  }

  /*
  protected updateData(data: FormElementDataInterface): void {
    if (data) {
      const oldInstance = Object.assign({}, this.CreatedElementComponent().instance);
      _.reduce(data, (result: any, value: any, key: any) => {
        console.log(`key: `, key, `this.${key.replace('_', '')}: `, this[key.replace('_', '')], '===',
          this.CreatedElementComponent().instance[key.replace('_', '')], `oldInstance: `, oldInstance[key.replace('_', '')]);
        /*
        if (_.isEqual(value, t[key]) === false) {
          this[key] = this.data[key];
        }
        *
      }, []);
    }
  }
  */
}
