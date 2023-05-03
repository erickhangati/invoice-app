import React from 'react';

import StatusBadge from '../ui/status-badge/StatusBadge';
import Button2 from '../ui/buttons/button-2/Button2';
import Button3 from '../ui/buttons/button-3/Button3';
import Button5 from '../ui/buttons/button-5/Button5';
import styles from './EditHeader.module.scss';

interface Props {
  isUpdating: boolean;
  status?: string;
  modalOpenHandler: () => void;
  deleteModalHandler: () => void;
  markPaidHandler: () => void;
}

const EditHeader: React.FC<Props> = ({
  isUpdating,
  status,
  modalOpenHandler,
  markPaidHandler,
  deleteModalHandler,
}) => {
  return (
    <div className={styles['edit-header']}>
      <div className={styles['edit-header__status']}>
        <span className={styles['status-label']}>Status</span>
        <StatusBadge className={styles['status-badge']} status={status} />
      </div>
      <div className={styles['edit-header__buttons']}>
        <Button3 disabled={isUpdating} onClick={modalOpenHandler}>
          Edit
        </Button3>
        <Button5
          className={styles['edit-header__buttons--delete']}
          onClick={deleteModalHandler}
          disabled={isUpdating}
        >
          Delete
        </Button5>
        {status !== 'paid' && (
          <Button2 disabled={isUpdating} onClick={markPaidHandler}>
            {isUpdating ? 'Updating...' : 'Mark as Paid'}
          </Button2>
        )}
      </div>
    </div>
  );
};

export default EditHeader;
