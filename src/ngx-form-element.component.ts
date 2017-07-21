// externals
import {
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  DoCheck,
  forwardRef,
  Inject,
  KeyValueDiffers,
  KeyValueChangeRecord,
  OnInit
} from '@angular/core';
import { FormBuilder } from '@angular/forms';

import * as _ from 'lodash-es';

import { FormElementClass } from './ngx-form-element.class';
import { FormElementService } from './ngx-form-element.service';
import { ValidatorService } from './ngx-form-element-validator.service';

/*
  TODO: cannot use template because of error in @ngx-form/material
*/
import template from './ngx-form-element.component.html';
/**
 * Dynamic create HTML Form Elements
 * @export
 * @class FormElementComponent
 * @extends {FormElementClass}
 * @implements {OnInit}
 */
@Component({
  selector: 'ngx-form-element',
  template: '<div #container></div>'
})
export class FormElementComponent extends FormElementClass implements DoCheck, OnInit {
  differ = {};
  step = 0;

  /**
   * Creates an instance of FormElementComponent.
   * @param {ComponentFactoryResolver} componentFactoryResolver
   * @param {FormBuilder} formBuilder
   * @param {FormElementService} formElementService
   * @param {KeyValueDiffers} keyValueDiffers
   * @param {ChangeDetectorRef} changeDetectorRef
   * @param {ValidatorService} validatorService
   * @memberof FormElementComponent
   */
  constructor(
    componentFactoryResolver: ComponentFactoryResolver,
    protected formBuilder: FormBuilder,
    protected formElementService: FormElementService, // @Inject(forwardRef(() => FormElementService)) 
    private keyValueDiffers: KeyValueDiffers,
    private changeDetectorRef: ChangeDetectorRef,
    protected validatorService: ValidatorService // @Inject(forwardRef(() => ValidatorService))
  ) {
    super(
      componentFactoryResolver,
      formBuilder,
      formElementService,
      validatorService
    );
    // KeyValueDiffers
    this.differ['config'] = this.keyValueDiffers.find({}).create();
    this.differ['attributes'] = this.keyValueDiffers.find({}).create();
  }

  /**
   * @param {*} changes
   * @param {boolean} assign
   * @memberof FormElementComponent
   */
  applyChanges(changes: any, assign: boolean): void {
    // add prop
    changes.forEachAddedItem((record: KeyValueChangeRecord<string, any>) => null);
    // changed
    changes.forEachChangedItem((record: KeyValueChangeRecord<string, any>) => {
      switch (record.key) {
        case 'element':
          // remove form element
          if (record.currentValue === null) {
            this.remove(true);
          } else {
            this.create();
          }
          break;
      }
      this.validatorServiceFormControl();
      this.validatorService.patchValidators(record.key, record.currentValue);
      if (assign === true) {
        this.__assign<any>(record.key, record.currentValue);
      }
    });
    // removed
    changes.forEachRemovedItem((record: KeyValueChangeRecord<string, any>) => null);
  }

  /**
   * Changes to `this.config` with apply
   * @memberof FormElementComponent
   */
  ngDoCheck() {
    let changes = null;
    changes = this.differ['config'].diff(this.config);
    if (changes) {
      this.applyChanges(changes, true);
    }

    // do not assign attributes to __component instance
    changes = this.differ['attributes'].diff(this.config['attributes']);
    if (changes) {
      this.applyChanges(changes, false);
    }
  }

  /**
   * create form element on init
   * @memberof FormElementComponent
   */
  ngOnInit() {
    this.create();
  }
}
