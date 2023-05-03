import React, { ReactNode } from 'react';

import PlusIcon from '../../../icons/PlusIcon';
import styles from './Button1.module.scss';

interface Props {
  children: ReactNode;
  modalOpenHandler?: () => void;
}

const Button1: React.FC<Props> = ({ children, modalOpenHandler }) => {
  return (
    <div className={styles.button} onClick={modalOpenHandler}>
      <PlusIcon className='' /> <span>{children}</span>
    </div>
  );
};

export default Button1;
