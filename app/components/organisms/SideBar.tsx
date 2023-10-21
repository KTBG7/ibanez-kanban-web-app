import React from 'react';
import Image from 'next/image';
import light_logo from '@/public/assets/logo-light.svg';
import BoardList from '../molecules/BoardList';
import Button from '../atoms/Button';
import Heading from '../atoms/SectionHeading';
import DarkModeSwitch from '../molecules/DarkModeSwitch';
import hide_eye_icon from '@/public/assets/icon-hide-sidebar.svg';

type SideBarProps = {
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
};
const SideBar = ({
  boardData,
  currentBoard,
  setCurrentBoard,
}: SideBarProps) => {
  return (
    <div className="flex flex-col justify-between flex-shrink-0  w-96 bg-white dark:bg-dark_grey_secondary border-r-2 border-r-lines_light dark:border-r-lines-dark">
      <BoardList
        boardData={boardData}
        currentBoard={currentBoard}
        setCurrentBoard={setCurrentBoard}
      />
      <div className="">
        <DarkModeSwitch />
        <a className="flex w-full items-center">
          <Image
            className="mr-4"
            src={hide_eye_icon}
            alt="Eye to hide sidebar"
          />{' '}
          Hide Sidebar
        </a>
      </div>
    </div>
  );
};

export default SideBar;
