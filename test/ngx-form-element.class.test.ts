import {
  Component,
  ComponentFactoryResolver,
  EventEmitter,
  Output,
  OnInit
} from '@angular/core';

import {
} from '@angular/core';

import { FormElementClass } from './../src/ngx-form-element.class';
import { FormElementService } from './../src/ngx-form-element.service';

@Component({
  selector: 'form-element-test-component',
  template: 'test test'
})
export class FormElementTestComponent extends FormElementClass implements OnInit {
// export class FormElementTestComponent implements OnInit {
  constructor(
    componentFactoryResolver: ComponentFactoryResolver,
    service: FormElementService
  ) {
    super(componentFactoryResolver, service);
  }

  ngOnInit() { }
}
