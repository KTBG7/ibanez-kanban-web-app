import React from 'react';
import Image from 'next/image';
import BoardList from '../molecules/BoardList';
import DarkModeSwitch from '../molecules/DarkModeSwitch';
import hide_eye_icon from '@/public/assets/icon-hide-sidebar.svg';
import Logo from '../atoms/Logo';

type SideBarProps = {
  toggleSidebar: () => void;
  sidebarActive: boolean;
  boardData: {
    name: string;
    columns: {
      name: string;
      tasks: {
        title: string;
        description: string;
        status: string;
        subtasks: { title: string; isCompleted: boolean }[];
      }[];
    }[];
  }[];
  currentBoard: {
    name: string;
    columns: {
      name: string;
      tasks: {
        title: string;
        description: string;
        status: string;
        subtasks: { title: string; isCompleted: boolean }[];
      }[];
    }[];
  };
  setCurrentBoard: React.Dispatch<
    React.SetStateAction<{
      name: string;
      columns: {
        name: string;
        tasks: {
          title: string;
          description: string;
          status: string;
          subtasks: {
            title: string;
            isCompleted: boolean;
          }[];
        }[];
      }[];
    }>
  >;
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
};
const SideBar = ({
  toggleSidebar,
  sidebarActive,
  boardData,
  currentBoard,
  setCurrentBoard,
  theme,
  setTheme,
}: SideBarProps) => {
  return (
    <div
      className={`${
        sidebarActive
          ? 'absolute md:flex flex-col justify-between top-0 md:w-64 xl:w-80 min-h-screen '
          : 'md:w-50 xl:w-52 h-full'
      } max-md:hidden z-50 bg-white dark:bg-dark_grey_secondary border-r-2 border-r-lines_light dark:border-r-lines-dark`}
    >
      <div>
        <div
          onClick={toggleSidebar}
          className={`md:pl-6 md:pr-6  xl:pl-8 xl:pr-8 h-16 md:h-20 xl:h-24 flex items-center`}
        >
          <Logo theme={theme} />
        </div>
        {sidebarActive ? (
          <>
            <BoardList
              boardData={boardData}
              currentBoard={currentBoard}
              setCurrentBoard={setCurrentBoard}
            />
          </>
        ) : (
          ''
        )}
      </div>
      {sidebarActive ? (
        <div>
          <DarkModeSwitch setTheme={setTheme} />
          <a onClick={toggleSidebar} className="flex w-full items-center">
            <Image
              className="mr-4"
              src={hide_eye_icon}
              alt="Eye to hide sidebar"
            />{' '}
            Hide Sidebar
          </a>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default SideBar;
