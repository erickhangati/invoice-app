import React, { ReactNode } from 'react';
import SideBar from './sidebar/SideBar';
import styles from './Layout.module.scss';

interface Props {
  children: ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <SideBar />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
