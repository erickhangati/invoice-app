import React from 'react';

import styles from './Calender.module.scss';

interface Props {
  id: string;
  label: string;
}

const Calender: React.FC<Props> = ({ id, label }) => {
  return (
    <div className={styles.calender}>
      <label htmlFor={id}>{label}</label>
      <input type='date' name={id} id={id} />
    </div>
  );
};

export default Calender;
