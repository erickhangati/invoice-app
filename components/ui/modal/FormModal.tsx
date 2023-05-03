import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';

import Backdrop from './backdrop/Backdrop';
import FormOverlay from './form-overlay/FormOverlay';

interface Props {
  children: ReactNode;
  modalCloseHandler: () => void;
}

const Modal: React.FC<Props> = ({ children, modalCloseHandler }) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop key={Math.random()} modalCloseHandler={modalCloseHandler} />,
        document.getElementById('backdrop')! as HTMLDivElement
      )}
      {ReactDOM.createPortal(
        <FormOverlay children={children} key={Math.random()} />,
        document.getElementById('overlay')! as HTMLDivElement
      )}
    </>
  );
};

export default Modal;
