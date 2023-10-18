import React from 'react';
import Task from '../atoms/Task';

type ColumnProps = {
  column: {
    name: string;
    tasks: {
      title: string;
      description: string;
      status: string;
      subtasks: { title: string; isCompleted: boolean }[];
    }[];
  };
};
const Column = ({ column }: ColumnProps) => {
  return (
    <div className="flex flex-col">
      <h3>{`${column.name} (${column.tasks.length})`}</h3>
      <ul className="flex flex-col gap-5">
        {column.tasks.map((task, idx) => (
          <li key={idx}>
            <Task task={task} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Column;
