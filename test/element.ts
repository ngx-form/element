import { FormElementInterface } from '@ngx-form/interface';

export const element: FormElementInterface = {
  attributes: {
    autocomplete: 'off',

    // Material Design
    color: 'accent',
    floatPlaceholder: 'never',
    hideRequiredMarker: true,
    // end

    disabled: false,
    placeholder: 'Firstname',
    required: false,
    type: 'text'
  },
  destroy: {
    onCancelled: false,
    onChanged: false,
    onSubmitted: false
  },
  element: 'input',
  focus: true,
  key: 'firstname'
};
