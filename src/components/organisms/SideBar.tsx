import React from 'react';
import BoardList from '../molecules/BoardList';
import DarkModeSwitch from '../molecules/DarkModeSwitch';
import hide_eye_icon from '/assets/icon-hide-sidebar.svg';
import Logo from '../atoms/Logo';

type SideBarProps = {
  toggleSidebar: () => void;
  sidebarActive: boolean;
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
};
const SideBar = ({
  toggleSidebar,
  sidebarActive,
  theme,
  setTheme,
}: SideBarProps) => {
  return (
    <div
      className={`${
        sidebarActive
          ? 'absolute md:flex flex-col top-0 md:w-64 xl:w-80 flex-shrink-0 min-h-screen '
          : 'md:w-50 xl:w-52 h-full'
      } max-md:hidden z-10 bg-white dark:bg-dark_grey_secondary border-r-2 border-r-lines_light dark:border-r-lines-dark`}
    >
      <div
        onClick={toggleSidebar}
        className={`md:pl-6 md:pr-6  xl:pl-8 xl:pr-8 h-16 md:h-20 xl:h-24 flex items-center hover:cursor-pointer`}
      >
        <Logo theme={theme} />
      </div>
      {sidebarActive ? (
        <div className="flex flex-col justify-between py-4 flex-grow">
          <BoardList />
          <div className="flex flex-col gap-2 [&>*]:pr-3 [&>*]:xl:pr-6">
            <div className="pl-3 xl:pl-6">
              <DarkModeSwitch setTheme={setTheme} />
            </div>
            <div className="pr-3 xl:pr-6">
              <a
                onClick={toggleSidebar}
                className="h-12 flex w-full gap-4 hover:bg-button-secondary_light rounded-r-full items-center pl-3 xl:pl-6 text-typography-grey text-heading_M hover:cursor-pointer"
              >
                <img src={hide_eye_icon} alt="Eye to hide sidebar" /> Hide
                Sidebar
              </a>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default SideBar;
