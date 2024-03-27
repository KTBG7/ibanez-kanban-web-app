import React from "react";
import Task from "../organisms/Task";
import { Column } from "@/app/types/GlobalTypes";

type ColumnProps = {
  id?: number;
  column?: Column;
  className?: string;
};
const Column = ({ column, className, id }: ColumnProps) => {
  return (
    <>
      {column && id !== undefined ? (
        <div className={`${className} w-96 flex-shrink-0 flex flex-col gap-6`}>
          <h3 className="text-heading_S text-typography-grey">{`${column.name.toUpperCase()} (${column.tasks.length})`}</h3>
          <ul className="flex flex-col gap-5">
            {column.tasks.map((task, idx) => (
              <Task
                key={idx}
                title={task.title}
                description={task.description}
                status={task.status ? task.status : column.name}
                subtasks={task.subtasks}
                columnID={id}
                taskID={idx}
              />
            ))}
          </ul>
        </div>
      ) : (
        <div
          className={`${className} flex items-center justify-center w-96 h-full flex-grow flex-shrink-0 rounded-md text-heading_XL text-typography-grey bg-background-medium dark:bg-dark_grey_secondary`}
        >
          + New Column
        </div>
      )}
    </>
  );
};

export default Column;
