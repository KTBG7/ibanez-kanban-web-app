import React, { Dispatch, SetStateAction, memo } from "react";

type ModalInputProps = {
  label: string;
  value: string;
  setState:
    | Dispatch<SetStateAction<string>>
    | Dispatch<SetStateAction<string | undefined>>;
  onChange: (
    setState:
      | Dispatch<SetStateAction<string>>
      | Dispatch<SetStateAction<string | undefined>>,
    e: any,
  ) => void;
  className?: string;
  inputType: string;
  placeholder?: string;
};

const ModalInput = memo(function ModalInput({
  label,
  value,
  setState,
  onChange,
  className,
  inputType,
  placeholder,
}: ModalInputProps) {
  return (
    <div className="w-full flex flex-col px-6 md:px-8 gap-2 group relative">
      <label className="text-body_M text-typography-grey dark:text-white">
        {label}
      </label>
      {inputType === "textArea" ? (
        <textarea
          className={`${className ? className : " "}  h-28 resize-none border border-lines-light p-4 dark:border-lines-dark dark:bg-dark_grey_secondary rounded-md text-body_L text-typography-black dark:text-white placeholder-typography-grey`}
          value={value}
          onChange={(e) => onChange(setState, e)}
          placeholder="e.g. It’s always good to take a break. This 15 minute break will 
recharge the batteries a little."
        />
      ) : null}
      {inputType === "input" ? (
        <input
          placeholder={placeholder ? placeholder : "e.g. Make coffee"}
          className={`${className ? className : ""} border border-lines-light p-4 dark:border-lines-dark h-10 rounded-md text-body_L dark:bg-dark_grey_secondary text-typography-black dark:text-white placeholder-typography-grey`}
          value={value}
          onChange={(e) => onChange(setState, e)}
        />
      ) : null}
    </div>
  );
});

export default ModalInput;
