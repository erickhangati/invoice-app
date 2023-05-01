import React from 'react';
import ChevronDown from '../../../icons/ChevronDown';
import styles from './DropDown.module.scss';

interface Props {
  id: string;
  options: string[];
  label: string;
}

const DropDown: React.FC<Props> = ({ id, options, label }) => {
  return (
    <div className={styles.dropdown}>
      <label htmlFor={id}>{label}</label>
      <div className={styles['dropdown__container']}>
        <select name={id} id={id}>
          {options.map((option, index) => (
            <option
              key={Math.random()}
              value={option.replace(' ', '-').toLowerCase()}
            >
              {option}
            </option>
          ))}
        </select>
        <ChevronDown className={styles['dropdown__icon']} />
      </div>
    </div>
  );
};

export default DropDown;
