import React from 'react';
import Bullet from '../../icons/Bullet';
import styles from './StatusBadge.module.scss';

interface Props {
  status?: string;
  className?: string;
}

const StatusBadge: React.FC<Props> = ({ status, className }) => {
  const label = status ? `${status[0].toUpperCase()}${status.slice(1)}` : '';

  return (
    <div
      className={`${styles['status-badge']} ${
        styles[`status-badge--${status}`]
      } ${className}`}
    >
      <Bullet className={styles[`status-badge__bullet--${status}`]} />
      <span className={styles[`status-badge__label--${status}`]}>{label}</span>
    </div>
  );
};

export default StatusBadge;
