import React from 'react';
import ChevronLeft from '../../../icons/ChevronLeft';

import styles from './BackButton.module.scss';

interface Props {
  label: string;
}

const BackButton: React.FC<Props> = ({ label }) => {
  return (
    <div className={styles['back-button']}>
      <ChevronLeft />
      <span>{label}</span>
    </div>
  );
};

export default BackButton;
