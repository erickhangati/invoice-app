import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';

import Backdrop from './backdrop/Backdrop';
import DeleteOverlay from './delete-overlay/DeleteOverlay';
import styles from './DeleteModal.module.scss';

interface Props {
  children: ReactNode;
  isUpdating?: boolean;
  deleteModalHandler: () => void;
  modalCloseHandler: () => void;
}

const Modal: React.FC<Props> = ({
  children,
  isUpdating,
  deleteModalHandler,
}) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop
          modalCloseHandler={isUpdating ? () => {} : deleteModalHandler}
          className={styles.backdrop}
        />,
        document.getElementById('backdrop')! as HTMLDivElement
      )}
      ,
      {ReactDOM.createPortal(
        <DeleteOverlay children={children} />,
        document.getElementById('overlay')! as HTMLDivElement
      )}
      ,
    </>
  );
};

export default Modal;
