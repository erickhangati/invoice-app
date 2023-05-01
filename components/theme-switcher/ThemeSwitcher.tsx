import React, { useEffect, useState } from 'react';

import SunIcon from '../icons/SunIcon';
import MoonIcon from '../icons/MoonIcon';

const ThemeSwitcher = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const jsonData = localStorage.getItem('theme');

    if (jsonData) {
      const localTheme = JSON.parse(jsonData);
      const { isDark } = localTheme;

      if (isDark) {
        setIsDark(() => true);
        document.querySelector('body')!.setAttribute('data-theme', 'dark');
        return;
      }

      setIsDark(() => false);
      document.querySelector('body')!.setAttribute('data-theme', 'light');
      return;
    }

    const darkModeMatcher = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(() => darkModeMatcher.matches);
  }, []);

  const setDarkMode = () => {
    document.querySelector('body')!.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', JSON.stringify({ isDark: true }));
  };

  const setLightMode = () => {
    document.querySelector('body')!.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', JSON.stringify({ isDark: false }));
  };

  const toggleThemeHandler = () => {
    setIsDark((prev) => !prev);

    if (isDark) {
      setLightMode();
      return;
    }

    setDarkMode();
  };

  return (
    <>
      {!isDark && <MoonIcon className='' onClick={toggleThemeHandler} />}
      {isDark && <SunIcon className='' onClick={toggleThemeHandler} />}
    </>
  );
};

export default ThemeSwitcher;
