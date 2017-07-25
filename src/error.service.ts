import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { availableValidators } from './available-validators.shared';

export interface ErrorSourceInterface {
  message: {
    [index: string]: string
  },
  originalError: any
}

@Injectable()
export class ErrorService {
  private availableValidators: Array<string> = availableValidators;
  private errorSource: Subject<ErrorSourceInterface> = new Subject<ErrorSourceInterface>();

  /**
   * asObservable - subscribe to errorSource
   * @type {*}
   * @memberof ErrorService
   */
  public errors: Observable<any>;

  // private
  private error: ErrorSourceInterface;
  private formControl: AbstractControl;

  constructor() {
    this.errors = this.errorSource.asObservable();
  }

  check() {
    if (this.formControl['errors']) {
      this.availableValidators.forEach((validator, index) => {
        if (this.formControl.hasError(validator)) {
          if (typeof this[validator] === 'function') {
            this.error = {
              message: this[validator](),
              originalError: this.formControl.errors
            };
          }
        }
      });
      this.errorSource.next(this.error);
    }
  }

  required() {
    return `Required`;
  }

  max() {
    if (this.formControl.errors) {
      return `Maximum value is ${this.formControl.errors.max.max} (${this.formControl.errors.max.actual})`;
    }
  }

  maxlength() {
    if (this.formControl.errors) {
      return `Maximum length is ${this.formControl.errors.maxlength.requiredLength} (${this.formControl.errors.maxlength.actualLength})`;
    }
  }

  min() {
    if (this.formControl.errors) {
      return `Minimum value is ${this.formControl.errors.min.min} (${this.formControl.errors.min.actual})`;
    }
  }

  minlength() {
    if (this.formControl.errors) {
      return `Minimum length is ${this.formControl.errors.minlength.requiredLength} (${this.formControl.errors.minlength.actualLength})`;
    }
  }

  setFormControl(formControl: AbstractControl): this {
    this.formControl = formControl;
    return this;
  }
}
