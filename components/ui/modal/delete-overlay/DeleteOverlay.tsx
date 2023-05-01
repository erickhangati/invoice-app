import React, { ReactNode } from 'react';

import styles from './DeleteOverlay.module.scss';

interface Props {
  children: ReactNode;
}

const DeleteOverlay: React.FC<Props> = ({ children }) => {
  return <div className={styles.overlay}>{children}</div>;
};

export default DeleteOverlay;
