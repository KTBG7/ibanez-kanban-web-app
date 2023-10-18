import React from 'react';
import Column from '../molecules/Column';

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
};
const Board = ({ currentBoard }: BoardProps) => {
  return (
    <div className="flex flex-col flex-1 bg-background-light dark:bg-background-dark">
      <ul className="flex gap-6">
        {currentBoard.columns.map((column, idx) => (
          <li key={idx} className="border border-lines-dark">
            <Column column={column} />
          </li>
        ))}
      </ul>
      <a></a>
    </div>
  );
};

export default Board;
