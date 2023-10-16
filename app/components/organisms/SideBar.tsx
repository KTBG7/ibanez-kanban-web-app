import React from 'react';
import Image from 'next/image';
import light_logo from '@/public/assets/logo-light.svg';
import BoardList from '../molecules/BoardList';
import Button from '../atoms/Button';
import Heading from '../atoms/SectionHeading';

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
    <div className="flex flex-col justify-between w-96 border-r-2 border-r-lines_light">
      <BoardList
        boardData={boardData}
        currentBoard={currentBoard}
        setCurrentBoard={setCurrentBoard}
      />
      <div>
        <h1>Darkmode</h1>
        <h4>HIde</h4>
      </div>
    </div>
  );
};

export default SideBar;
