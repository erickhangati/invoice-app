import React, { ReactNode } from 'react';
import styles from './Button3.module.scss';

interface Props {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const Button3: React.FC<Props> = ({ children, onClick, disabled, type }) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={styles.button}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button3;
