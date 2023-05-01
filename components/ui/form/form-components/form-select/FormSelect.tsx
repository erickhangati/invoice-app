import React from 'react';
import { Field, ErrorMessage } from 'formik';

import styles from './FormSelect.module.scss';
import ChevronDown from '../../../../icons/ChevronDown';

interface Props {
  label?: string | undefined;
  name: string;
  error: boolean | string | undefined;
  options?: { key: string; value: string }[];
}

const FormSelect: React.FC<Props> = ({ label, name, error, options }) => {
  return (
    <div className={styles['form-input']}>
      <div className={styles['form-input__labels']}>
        <label htmlFor={name} className={error ? styles['label-error'] : ''}>
          {label}
        </label>
        <ErrorMessage name={name} component='span' />
      </div>
      <div className={styles['form-input__container']}>
        <Field
          as='select'
          id={name}
          name={name}
          className={error ? styles['border-error'] : ''}
        >
          {options?.map((option, index) => (
            <option key={Math.random()} value={option.value}>
              {option.key}
            </option>
          ))}
        </Field>
        <ChevronDown className={styles['form-input__icon']} />
      </div>
    </div>
  );
};

export default FormSelect;
