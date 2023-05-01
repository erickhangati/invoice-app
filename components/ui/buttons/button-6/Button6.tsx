import React, { ReactNode } from 'react';
import styles from './Button6.module.scss';

interface Props {
  children: ReactNode;
  onClick?: () => void;
}

const Button6: React.FC<Props> = ({ children, onClick }) => {
  return (
    <div className={styles.button} onClick={onClick}>
      {children}
    </div>
  );
};

export default Button6;
