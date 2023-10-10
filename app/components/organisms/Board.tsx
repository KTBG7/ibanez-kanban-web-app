import React from 'react';

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
  return <div>Board</div>;
};

export default Board;
