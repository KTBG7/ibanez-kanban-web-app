import React, { useState } from 'react';

type SubtaskProps = {
  title: string;
  complete: boolean;
};
const Subtask = ({ title, complete }: SubtaskProps) => {
  const [completed, setCompleted] = useState(complete);
  const handleCheckboxChange = () => {
    setCompleted((prev) => !!!prev);
  };
  return (
    <div>
      <input
        type="checkbox"
        name={title}
        id={title}
        onChange={handleCheckboxChange}
      />
      <label
        className={
          completed
            ? 'text-body_M text-typography-grey line-through'
            : 'text-body_M'
        }
      ></label>
    </div>
  );
};

export default Subtask;
