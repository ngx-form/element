// external
import {
  ComponentFactoryResolver,
  EventEmitter,
  Injectable,
  Input,
  Output
} from '@angular/core';
import { component, DynamicComponentClass } from '@ngx-core/common';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash-es';

// TODO: remove when test in karma ...
import {
  DestroyInterface,
  FormElementInterface,
  ValidatorsHolderInterface
} from '@ngx-form/interface';

import { element } from '@ngx-form/type';

// internal
import { FormElementService } from './ngx-form-element.service';
import { ValidatorService } from './ngx-form-element-validator.service';

/**
 * @export
 * @abstract
 * @class FormElementClass
 * @extends {DynamicComponentClass}
 */
export abstract class FormElementClass extends DynamicComponentClass {
  /**
   * Main @Input('config') that is used to assign all possible `properties` specified in its interface.
   * @type {FormElementDataInterface}
   * @memberof FormElementClass
   */
  @Input('config') config: FormElementInterface;

    /**
   * @type {FormGroup}
   * @memberof FormElementClass
   */
  _formGroup: FormGroup;
  @Input('form') set formGroup(formGroup: FormGroup) {
    this._formGroup = formGroup;
  }
  get formGroup(): FormGroup {
    return this._formGroup;
  }

  /**
   * Property of `any` type for html angular attribute `[(NgModel)]` or for formGroup.
   */
  @Input('model') model: Object;

  /**
   * HTML Form Element of component name like for example 'checkbox' 'input' in config to dynamic create.
   * Important thing the same time you set property `elementComponent` will be set to just founded component from `FormElementService`
   * @type {element}
   * @memberof FormElementClass
   */
  _element: element;
  set element(e: element) {
    this._element = e;
    this.elementComponent = this.formElementService.find(e);
    if (!this.elementComponent) {
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
    }
  }
  get element() {
    return this._element;
  }

  /**
   * property is assigned when element is found in FormElementService
   */
  elementComponent: component;

  /**
   * @type {formGroupName}
   * @memberof FormElementClass
  _formGroupName: string;
  @Input() set formGroupName(formGroupName: string) {
    this._formGroupName = formGroupName;
    this.__set('formGroupName');
  }
  get formGroupName(): string {
    return this._formGroupName;
  }
  */

  /**
   * Service to find in provided by user config connection real `component` from `entryComponents` with provided name.
   * @protected
   * @type {FormElementService}
   * @memberof FormElementClass
   */
  // formElementService: FormElementService;

  removed = false;

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
    protected formElementService: FormElementService,
    protected validatorService: ValidatorService
  ) {
    super(componentFactoryResolver);
  }

  /**
   * Dynamically create new component from property `elementComponent`
   * @memberof FormElementClass
   */
  public create(): void {
    this.element = this.config.element;
    if (this.elementComponent) {
      this.__create(this.elementComponent);
      this.removed = false;

      this.__assign<Object>('model', this.model);
      this.__assign<FormGroup>('formGroup', this.formGroup);
      this.formGroup.controls[this.config.key] = new FormControl();
      this.validatorService.formControl = this.formGroup.controls[this.config.key];

      // assign config to __component instance
      if (this.config) {
        Object.keys(this.config).forEach((key, index) => {
          if (this.config[key] instanceof Object) {
            Object.keys(this.config[key]).forEach(subkey => {
              this.validatorService.patchValidators(subkey, this.config[key][subkey]);
            });
          }
        })
        for (const prop in this.config) {
          if (prop) {
            this.validatorService.patchValidators(prop, this.config[prop]);
            this.__assign(prop, this.config[prop]);
          }
        }

        this.__subscribe('cancelled', this.onCancelled);
        this.__subscribe('changed', this.onChanged);
        this.__subscribe('submitted', this.onSubmitted);

        this.created.emit(true);
        this.destroyed.emit(false);

        // subscribe to valueChanges in formGroup
        this.formControl().valueChanges.subscribe(model => this.updateValueAndValidity());
      }
    } else {
      throw new Error('Provide property element.');
    }
  }

  /**
   * returns form control of specified key
   * @param {string} [key]
   * @returns {AbstractControl}
   * @memberof FormElementClass
   */
  public formControl(key?: string): AbstractControl {
    return this.formGroup.controls[key ? key : this.config.key];
  }

  /**
   * On submit emit event `cancelled` and if property `destroy.onCancelled` is true remove `__component` instance
   * @private
   * @memberof FormElementClass
   */
  private onCancelled = (result: any) => {
    this.cancelled.emit(result);
    if (this.config.destroy && this.config.destroy.onCancelled === true) {
      this.remove(this.config.destroy.onCancelled);
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
    if (this.config.destroy && this.config.destroy.onChanged === true) {
      this.remove(true);
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
    if (this.config.destroy && this.config.destroy.onSubmitted === true) {
      console.log(`onSubmitted`);
      this.remove(true);
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
      this.__destroy();
      this.removed = true;

      // emit created and destroyed
      this.created.emit(false);
      this.destroyed.emit(true);

      // remove form control
      this.removeFormControl();
    }
  }

  /**
   * Remove formGroup control with timeout
   * @memberof FormElementClass
   */
  removeFormControl() {
    setTimeout(() => {
      this.formGroup.removeControl(this.config.key);
    });
  }

  /**
   * formGroup updateValueAndValidity with timeout
   * @memberof FormElementClass
   */
  updateValueAndValidity() {
    setTimeout(() => {
      this.formGroup.updateValueAndValidity();
    });
  }
}
