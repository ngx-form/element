import { FormElementDataInterface } from '@ngx-form/interface';

export const rows = [
  {
    _id: 1,
    firstname: 'Ścibor',
    lastname: 'Rudnicki',
    age: 27,
    birthday: '2017-04-14',
    createdAt: '2019-01-01T15:01',
    month: '2017-04',
    range: '',
    time: '01:04',
    week: '2017-W13'
  },
  {
    _id: 2,
    firstname: 'Stanisław',
    lastname: 'Czorny',
    age: 15,
    birthday: '2017-04-14',
    createdAt: '2019-01-01T15:01',
    month: '2017-04',
    range: '',
    time: '01:04',
    week: '2017-W13'
  },
  {
    _id: 3,
    firstname: 'Kazimierz',
    lastname: 'Wielki',
    age: 3,
    birthday: '2017-04-14',
    createdAt: '2019-01-01T15:01',
    month: '2017-04',
    range: '',
    time: '01:04',
    week: '2017-W13'
  }
];

export const password = 'testpassword';

export const inputs: Array<FormElementDataInterface> = [
  {
    disabled: "",
    element: 'input',
    key: 'birthday',
    model: rows[0],
    placeholder: 'Date',
    required: 'required',
    type: 'date'
  }, {
    destroy: {
      onChanged: false,
      onSubmitted: false,
      onCancelled: false
    },
    disabled: "",
    element: 'input',
    key: 'createdAt',
    model: rows[0],
    placeholder: 'Date time local',
    required: 'required',
    type: 'datetime-local'
  }, {
    destroy: {
      onChanged: false,
      onSubmitted: false,
      onCancelled: false
    },
    disabled: "",
    element: 'input',
    key: 'email',
    model: rows[0],
    placeholder: 'Email',
    required: 'required',
    type: 'email'
  }, {
    destroy: {
      onChanged: false,
      onSubmitted: false,
      onCancelled: false
    },
    disabled: "",
    element: 'input',
    key: 'month',
    model: rows[0],
    placeholder: 'Month',
    required: 'required',
    type: 'month'
  }, {
    destroy: {
      onChanged: false,
      onSubmitted: false,
      onCancelled: false
    },
    disabled: "",
    element: 'input',
    key: 'age',
    max: 99,
    min: 1,
    model: rows[0],
    placeholder: 'Age',
    required: 'required',
    type: 'number'
  }, {
    destroy: {
      onChanged: false,
      onSubmitted: false,
      onCancelled: false
    },
    disabled: "",
    element: 'input',
    key: 'password',
    model: password,
    placeholder: 'Password',
    required: 'required',
    type: 'password'
  }, {
    autocomplete: 'off',
    destroy: {
      onChanged: false,
      onSubmitted: false,
      onCancelled: false
    },
    disabled: "",
    element: 'input',
    key: 'firstname',
    model: rows[0],
    placeholder: 'Firstname',
    required: 'required',
    type: 'text'
  }, {
    destroy: {
      onChanged: false,
      onSubmitted: false,
      onCancelled: false
    },
    disabled: "",
    element: 'input',
    key: 'time',
    model: rows[0],
    placeholder: 'Time',
    required: 'required',
    type: 'time'
  }, {
    destroy: {
      onChanged: false,
      onSubmitted: false,
      onCancelled: false
    },
    disabled: "",
    element: 'input',
    key: 'week',
    model: rows[0],
    placeholder: 'Week',
    required: 'required',
    type: 'week'
  }
];
