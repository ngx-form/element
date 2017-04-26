// external
import { ComponentDecorator, Type } from '@angular/core';

// internal
import { autocomplete, autofocus, disabled, element, FormComponentInterface, input, readonly, required } from '@ngx-form/core';

export interface DestroyInterface {
  onCancelled: boolean;
  onChanged: boolean;
  onSubmitted: boolean;
}

export interface FormElementConfigInterface {
  types: Array<FormComponentInterface>;
}

export interface FormElementDataInterface {
  autocomplete?: autocomplete;
  autofocus?: autofocus;
  destroy?: DestroyInterface;
  disabled?: disabled;
  element: element;
  key: string;
  model: any;
  options?: Array<any>;
  pattern?: string;
  placeholder?: string;
  readonly?: readonly;
  type?: input;
  viewValue?: Array<any>;
}

export interface FormElementInputInterface {
  autocomplete?: autocomplete;
  destroy?: DestroyInterface;
  disabled?: boolean;
  hint: any;
  key: string;
  max?: number;
  min?: number;
  maxlength?: number;
  minlength?: number;
  model: any;
  placeholder?: string;
  required?: required;
  type: input;
  viewValue?: Array<any>;
}

export interface FormSelectInterface {
  destroy?: DestroyInterface;
  disabled?: boolean;
  key: string;
  model: any;
  placeholder?: string;
  required?: boolean;
  viewValue?: Array<any>;
}
