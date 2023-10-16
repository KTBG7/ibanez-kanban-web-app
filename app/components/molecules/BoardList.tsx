import React from 'react';
import Button from '../atoms/Button';
import SectionHeading from '../atoms/SectionHeading';

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
        classes="pl-8"
      />
      <ul className="flex flex-col pr-6">
        {boardData.map((board, idx) => (
          <li
            key={idx}
            onClick={() => setCurrentBoard(board)}
            className={`${
              currentBoard.name == board.name
                ? 'bg-button-primary text-typography-white'
                : 'text-typography-grey'
            } pl-6 py-4 w-full rounded-r-full`}
          >
            <Button buttonType="primary" text={board.name} />
          </li>
        ))}
        <li>
          <Button buttonType="create" text="+ Create New Board" />
        </li>
      </ul>
    </div>
  );
};

export default BoardList;
