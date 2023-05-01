import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import LogoIcon from '../../icons/LogoIcon';
import SideBarContainer from './SideBarContainer';
import ThemeSwitcher from '../../theme-switcher/ThemeSwitcher';
import styles from './SideBar.module.scss';

const SideBar = () => {
  return (
    <article className={styles.sidebar}>
      <Link className={styles['sidebar__logo-icon']} href='/'>
        <LogoIcon className='' />
      </Link>
      <SideBarContainer className=''>
        <ThemeSwitcher />
      </SideBarContainer>
      <SideBarContainer className={styles['sidebar__profile']}>
        <Image
          priority
          src='/images/profile.png'
          alt='profile'
          width={40}
          height={40}
        />
      </SideBarContainer>
    </article>
  );
};

export default SideBar;
