import React from 'react';
import Link from 'next/link';

import StatusBadge from '../ui/status-badge/StatusBadge';
import ChevronRight from '../icons/ChevronRight';

import styles from './ListItem.module.scss';

interface Props {
  id?: string;
  dueDate?: string;
  clientName: string;
  amount?: number;
  status?: string;
}

const ListItem: React.FC<Props> = ({
  id,
  dueDate,
  clientName,
  amount,
  status,
}) => {
  const formatedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(dueDate ? dueDate : ''));

  const formatedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'KSh',
  }).format(amount ? amount : 0);

  return (
    <li className={styles['list-item--li']}>
      <Link className={styles['list-item']} href={`${id}`}>
        <div className={styles['list-item__id']}>
          <span className={styles['list-item__id--hash']}>#</span>
          <span className={styles['list-item__id--label']}>{id}</span>
        </div>
        <span className={styles['list-item__date']}>Due {formatedDate}</span>
        <span className={styles['list-item__client']}>{clientName}</span>
        <span className={styles['list-item__amount']}> {formatedAmount}</span>
        <StatusBadge className={styles['list-item__status']} status={status} />
        <ChevronRight className={styles['list-item__icon']} />
      </Link>
    </li>
  );
};

export default ListItem;
