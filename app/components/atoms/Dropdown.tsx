import Image from "next/image";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import icon_chevron from "@/public/assets/icon-chevron-down.svg";

type DropdownProps = {
  setState: (stat: string) => void;
  label: string;
  value: string;
  items: string[];
};

const Dropdown = ({ setState, label, value, items }: DropdownProps) => {
  const [dropdownActive, setDropdownActive] = useState(false);
  const handleDropdownSelect = (stat: string) => {
    setState(stat);
  };
  const triggerDropdown = () => {
    setDropdownActive((prev) => {
      return !!!prev;
    });
  };
  useEffect(() => {
    setDropdownActive(false);
  }, [value]);

  return (
    <div className="w-full flex flex-col gap-2 px-6 md:px-8 group relative">
      <label className="text-body_M text-typography-grey dark:text-white">
        {label}
      </label>
      <div className="flex flex-col relative">
        <button
          className="relative flex items-center hover:cursor-pointer justify-between focus-within:border-2 focus-within:border-button-primary 
          w-full border border-lines-light p-4 dark:border-lines-dark h-10 rounded-md dark:focus:text-white z-50"
          placeholder={value}
          onClick={() => triggerDropdown()}
        >
          <span className="text-body_L text-typography-black dark:text-white">
            {value}
          </span>
          <Image src={icon_chevron} alt="Down Chevron" />
        </button>
        {dropdownActive ? (
          <div className="bg-white dark:bg-background-dark w-full absolute top-12 shadow-md border-lines-light dark:border-lines-dark border rounded-md z-50 overflow-y-scroll">
            <ul className="flex flex-col text-typography-grey text-body_L">
              {items.map((stat, idx) => {
                return (
                  <li
                    key={idx}
                    onClick={() => handleDropdownSelect(stat)}
                    className="py-2 px-4 rounded-md hover:bg-button-secondary_light hover:text-typography-black dark:text-typography-white"
                  >
                    {stat}
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Dropdown;
