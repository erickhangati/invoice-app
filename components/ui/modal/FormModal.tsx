import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';

import Backdrop from './backdrop/Backdrop';
import FormOverlay from './form-overlay/FormOverlay';

interface Props {
  children: ReactNode;
  formModalHandler: () => void;
}

const Modal: React.FC<Props> = ({ children, formModalHandler }) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop formModalHandler={formModalHandler} key={Math.random()} />,
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
