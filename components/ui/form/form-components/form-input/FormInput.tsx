import React from 'react';
import { Field, ErrorMessage } from 'formik';

import styles from './FormInput.module.scss';

interface Props {
  label?: string | undefined;
  name: string;
  error: boolean | string | undefined;
  type?: string;
  placeholder?: string;
  readOnly?: boolean | undefined;
}

const FormInput: React.FC<Props> = ({
  label,
  name,
  error,
  type,
  placeholder,
}) => {
  return (
    <div className={styles['form-input']}>
      <div className={styles['form-input__labels']}>
        {label && (
          <label htmlFor={name} className={error ? styles['label-error'] : ''}>
            {label}
          </label>
        )}
        <ErrorMessage name={name} component='span' />
      </div>
      <Field
        id={name}
        name={name}
        className={error ? styles['border-error'] : ''}
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
};

export default FormInput;
