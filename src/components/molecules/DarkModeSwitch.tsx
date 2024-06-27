import React from 'react';
import sun from '/assets/icon-light-theme.svg';
import moon from '/assets/icon-dark-theme.svg';

type DarkModeSwitchProps = {
  setTheme: React.Dispatch<React.SetStateAction<string>>;
};
const DarkModeSwitch = ({ setTheme }: DarkModeSwitchProps) => {
  const toggleDarkMode = () => {
    if (localStorage.getItem('color-theme')) {
      if (localStorage.getItem('color-theme') === 'light') {
        document.documentElement.classList.add('dark');
        localStorage.setItem('color-theme', 'dark');
        setTheme('dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('color-theme', 'light');
        setTheme('light');
      }
    } else {
      if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('color-theme', 'light');
        setTheme('light');
      } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('color-theme', 'dark');
        setTheme('dark');
      }
    }
  };
  return (
    <div className="flex items-center justify-center bg-background-light dark:bg-background-dark self-center w-full h-12 gap-3 md:gap-5 rounded-md">
      <img src={sun} alt="Sun icon for light mode" />
      <label className="relative peer inline-flex items-center cursor-pointer">
        <input type="checkbox" value="" className="sr-only peer" />
        <div
          onClick={toggleDarkMode}
          className="w-9 h-5 bg-gray_mentor peer-focus:outline-none rounded-full peer bg-button-primary dark:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all"
        ></div>
      </label>
      <img src={moon} alt="Moon icon for dark mode" />
    </div>
  );
};

export default DarkModeSwitch;
