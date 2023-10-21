import React from 'react';
import Column from '../molecules/Column';
import show_eye_icon from '@/public/assets/icon-show-sidebar.svg';
import Image from 'next/image';

type BoardProps = {
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
  sidebarActive: boolean;
  toggleSidebar: () => void;
};
const Board = ({ currentBoard, sidebarActive, toggleSidebar }: BoardProps) => {
  return (
    <div className="flex overflow-x-scroll gap-4 bg-background-light dark:bg-background-dark">
      {!sidebarActive ? (
        <a
          onClick={toggleSidebar}
          className="fixed bottom-5 flex h-12 items-center justify-center pl-8 pr-4 bg-button-primary rounded-r-3xl"
        >
          <Image
            className="mr-4"
            src={show_eye_icon}
            alt="Eye to hide sidebar"
          />
        </a>
      ) : null}
      <ul className="flex gap-6">
        {currentBoard.columns.map((column, idx) => (
          <li key={idx} className="border border-lines-dark w-96 flex-shrink-0">
            <Column column={column} />
          </li>
        ))}
        <li className="flex flex-col w-96 flex-shrink-0">ADD A COLUMN</li>
      </ul>
    </div>
  );
};

export default Board;
