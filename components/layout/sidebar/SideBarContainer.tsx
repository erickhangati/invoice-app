import React, { ReactNode } from 'react';

import styles from './SideBarContainer.module.scss';

interface Props {
  children: ReactNode;
  className: string;
}

const SideBarContainer: React.FC<Props> = ({ children, className }) => {
  const classes: string = `${styles['sidebar-container']}${
    className ? ` ${className}` : ''
  }`;

  return <div className={classes}>{children}</div>;
};

export default SideBarContainer;
