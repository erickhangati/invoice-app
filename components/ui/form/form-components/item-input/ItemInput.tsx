import React from 'react';
import { Field, useField } from 'formik';

import styles from './ItemInput.module.scss';

interface Props {
  name: string;
  error?: boolean | string | undefined;
  type?: string;
}

const ItemInput: React.FC<Props> = ({ name, type }) => {
  const [field, meta] = useField(name);

  return (
    <div className={styles['form-input']}>
      <Field
        id={name}
        name={name}
        className={meta.touched && meta.error ? styles['border-error'] : ''}
        type={type}
      />
    </div>
  );
};

export default ItemInput;
