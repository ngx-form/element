import {
  Component,
  ComponentFactoryResolver,
  EventEmitter,
  Output,
  OnInit
} from '@angular/core';

import { FormBuilder } from '@angular/forms';

import { FormElementClass } from './../src/ngx-form-element.class';
import { FormElementService } from './../src/ngx-form-element.service';
import { ValidatorService } from './ngx-form-element-validator.service';

@Component({
  selector: 'form-element-test-component',
  template: 'test test'
})
export class FormElementTestComponent extends FormElementClass implements OnInit {
// export class FormElementTestComponent implements OnInit {
  constructor(
    componentFactoryResolver: ComponentFactoryResolver,
    protected formBuilder: FormBuilder,
    protected formElementService: FormElementService, // @Inject(forwardRef(() => FormElementService))
    protected validatorService: ValidatorService // @Inject(forwardRef(() => ValidatorService))
  ) {
    super(
      componentFactoryResolver,
      formBuilder,
      formElementService,
      validatorService
    );
  }

  ngOnInit() { }
}
