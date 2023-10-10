import React from 'react';
import Button from '../atoms/Button';

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
    <ul className="flex flex-col pr-4">
      {boardData.map((board, idx) => (
        <li
          key={idx}
          onClick={() => setCurrentBoard(board)}
          className={
            currentBoard.name == board.name
              ? 'bg-purple_primary pl-6 pr-16 py-2 w-full rounded-r-full'
              : 'pl-6 pr-16 py-2 w-full rounded-r-full'
          }
        >
          <Button buttonType="primary" text={board.name} />
        </li>
      ))}
    </ul>
  );
};

export default BoardList;
