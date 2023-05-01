import React, { ReactNode } from 'react';
import styles from './Button3.module.scss';

interface Props {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const Button3: React.FC<Props> = ({ children, onClick, disabled }) => {
  return (
    <button disabled={disabled} className={styles.button} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button3;
