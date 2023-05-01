import React from 'react';

import FormInput from './form-input/FormInput';
import ItemInput from './item-input/ItemInput';
import FormSelect from './form-select/FormSelect';

interface Props {
  control: string;
  name: string;
  error?: boolean | string | undefined;
  label?: string | undefined;
  type?: string;
  options?: { key: string; value: string }[];
  placeholder?: string;
  readOnly?: boolean | undefined;
}

const FormControl: React.FC<Props> = ({
  control,
  name,
  error,
  label,
  type,
  options,
  placeholder,
}) => {
  switch (control) {
    case 'input':
      return (
        <FormInput
          name={name}
          error={error}
          label={label}
          type={type}
          placeholder={placeholder}
        />
      );
    case 'select':
      return (
        <FormSelect name={name} error={error} label={label} options={options} />
      );
    case 'item':
      return <ItemInput name={name} type={type} />;
    default:
      return null;
  }
};

export default FormControl;
