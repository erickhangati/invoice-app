import React from 'react';
import Button3 from '../ui/buttons/button-3/Button3';
import Button5 from '../ui/buttons/button-5/Button5';
import styles from './DeleteItem.module.scss';

interface Props {
  id?: string;
  deleteModalHandler: () => void;
  deleteHandler: () => void;
  isUpdating: boolean;
}

const DeleteItem: React.FC<Props> = ({
  id,
  isUpdating,
  deleteModalHandler,
  deleteHandler,
}) => {
  return (
    <div className={styles['delete-item']}>
      <h2>Confirm Deletion</h2>
      <p className={styles['delete-item__text']}>
        Are you sure you want to delete invoice <span>#{id}</span>? This action
        cannot be undone.
      </p>
      <div className={styles['delete-item__buttons']}>
        <Button3 disabled={isUpdating} onClick={deleteModalHandler}>
          Cancel
        </Button3>
        <Button5 disabled={isUpdating} onClick={deleteHandler}>
          {isUpdating ? 'Deleting...' : 'Delete'}
        </Button5>
      </div>
    </div>
  );
};

export default DeleteItem;
