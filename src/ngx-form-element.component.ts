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

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'form-element',
  template: '<div #container></div>'
})
export class FormElementComponent extends FormElementClass implements DoCheck, OnChanges, OnInit {

  constructor(
    componentFactoryResolver: ComponentFactoryResolver,
    @Inject(FormElementService) formElementService: FormElementService
  ) {
    super(componentFactoryResolver, formElementService);
  }

  ngDoCheck() {
    this.updateData(this.data);
  }

  ngOnChanges() { }

  ngOnInit() {
    this.createElement();
  }
}
