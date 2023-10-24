import React from 'react';
import Button from '../atoms/Button';
import SectionHeading from '../atoms/SectionHeading';
import board_icon from '@/public/assets/icon-board.svg';
import Image from 'next/image';
import BoardLogo from '../atoms/BoardLogo';

type BoardListProps = {
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
const BoardList = ({
  boardData,
  currentBoard,
  setCurrentBoard,
}: BoardListProps) => {
  return (
    <div>
      <SectionHeading
        name={'All Boards'}
        count={boardData.length}
        classes="pl-8 pb-5"
      />
      <ul className="flex flex-col pr-6">
        {boardData.map((board, idx) => (
          <li key={idx}>
            <Button
              onClick={() => setCurrentBoard(board)}
              buttonType=""
              className={`${
                currentBoard.name == board.name
                  ? 'bg-button-primary text-typography-white'
                  : 'hover:bg-button-secondary_light dark:hover:bg-button-secondary_dark text-typography-grey hover:text-button-primary'
              } flex group items-center gap-4 text-left pl-6 py-4 w-full rounded-r-full hover:cursor-pointer`}
            >
              <BoardLogo
                className={
                  currentBoard.name === board.name
                    ? 'fill-typography-white'
                    : 'fill-typography-grey group-hover:fill-typography-purple'
                }
              />
              {board.name}
            </Button>
          </li>
        ))}
        <li className="text-left pl-6 py-4 w-full rounded-r-full text-typography-purple hover:bg-button-secondary_light dark:hover:bg-button-secondary_dark hover:cursor-pointer">
          <Button onClick={() => {}} buttonType="create">
            <p>+ Create New Board</p>
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default BoardList;
