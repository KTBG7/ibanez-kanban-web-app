import React from "react";
import cross_icon from "@/public/assets/icon-cross.svg";
import Image from "next/image";

type DeleteableInputProps = {
  value: string;
  id: number;
  placeholder: string;
  handleChange: (e: any, id: number) => void;
  deleteItem: (id: number) => void;
  empty?: boolean;
};
const DeleteableInput = ({
  value,
  id,
  placeholder,
  handleChange,
  deleteItem,
  empty,
}: DeleteableInputProps) => {
  return (
    <div key={id} className="flex items-center gap-4 w-full">
      <input
        className={`${empty ? "border-button-destructive" : "border-lines-light dark:border-lines-dark"}
h-10 border  px-3 rounded-md flex flex-grow text-body_L text-typography-black dark:text-typography-white dark:bg-dark_grey_secondary placeholder:text-typography-grey
`}
        value={value}
        onChange={(e) => handleChange(e, id)}
        placeholder={placeholder}
      />
      <a className="hover:cursor-pointer" onClick={() => deleteItem(id)}>
        <Image src={cross_icon} alt="Cross Icon" />
      </a>
    </div>
  );
};

export default DeleteableInput;
