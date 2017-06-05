
import {
  ChangeDetectionStrategy,
  Component,
  ComponentFactoryResolver,
  DoCheck,
  Inject,
  OnChanges,
  OnInit
} from '@angular/core';

import { FormElementClass } from './ngx-form-element.class';
import { FormElementService } from './ngx-form-element.service';

/**
 * Dynamic create HTML Form Elements
 * @export
 * @class FormElementComponent
 * @extends {FormElementClass}
 * @implements {OnInit}
 */
@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'form-element',
  template: '<div #container></div>'
})
export class FormElementComponent extends FormElementClass implements DoCheck, OnInit {

  /**
   * Creates an instance of FormElementComponent.
   * @param {ComponentFactoryResolver} componentFactoryResolver
   * @param {FormElementService} formElementService
   * @memberof FormElementComponent
   */
  constructor(
    componentFactoryResolver: ComponentFactoryResolver,
    formElementService: FormElementService // @Inject(FormElementService)
  ) {
    super(componentFactoryResolver, formElementService);
  }

  ngDoCheck() {
    this.data = this.data;
    // console.log(`ngDoCheck`, this.data);
  }

  ngOnInit() {
    this.init();
  }
}
