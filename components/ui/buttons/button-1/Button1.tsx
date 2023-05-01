import React, { ReactNode } from 'react';

import PlusIcon from '../../../icons/PlusIcon';
import styles from './Button1.module.scss';

interface Props {
  children: ReactNode;
  modalHandler?: () => void;
}

const Button1: React.FC<Props> = ({ children, modalHandler }) => {
  return (
    <div className={styles.button} onClick={modalHandler}>
      <PlusIcon className='' /> <span>{children}</span>
    </div>
  );
};

export default Button1;
