import React from 'react';

import styles from './TextField.module.scss';

interface Props {
  id: string;
  type: string;
  label: string;
  placeholder: string;
}

const TextField: React.FC<Props> = ({ id, type, label, placeholder }) => {
  return (
    <div className={styles['text-field']}>
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type} name={id} placeholder={placeholder} />
    </div>
  );
};

export default TextField;
