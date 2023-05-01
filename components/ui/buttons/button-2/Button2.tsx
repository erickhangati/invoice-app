import React, { ReactNode } from 'react';
import styles from './Button2.module.scss';

interface Props {
  children: ReactNode;
  onClick?: () => void;
  type?: 'submit' | 'reset' | 'button' | undefined;
  disabled?: boolean;
}

const Button2: React.FC<Props> = ({ children, onClick, type, disabled }) => {
  return (
    <button
      type={type}
      className={styles.button}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button2;
