import React, { ReactNode } from 'react';
import styles from './Button5.module.scss';

interface Props {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const Button5: React.FC<Props> = ({
  children,
  onClick,
  disabled,
  className,
}) => {
  const classes = `${styles.button}${className ? ` ${className}` : ''}`;
  return (
    <button disabled={disabled} className={classes} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button5;
