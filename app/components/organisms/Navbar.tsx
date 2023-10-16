import React from 'react';
import Button from '../atoms/Button';
import Logo from '../atoms/Logo';

type NavbarProps = {
  setSidebarActive: React.Dispatch<React.SetStateAction<boolean>>;
  sidebarActive: boolean;
  currentBoard: string;
};
const Navbar = ({
  setSidebarActive,
  sidebarActive,
  currentBoard,
}: NavbarProps) => {
  const toggleSidebar = () => {
    setSidebarActive((prev) => !!!prev);
  };
  return (
    <nav className="flex w-full h-24 items-center">
      <Logo toggleSidebar={toggleSidebar} sidebarActive={sidebarActive} />
      <div className="border-b-2 border-b-lines_light flex flex-grow h-full pr-8 items-center justify-between">
        <h1 className="pl-8">{currentBoard}</h1>
        <Button
          text="+ Add New Task"
          buttonType="primary"
          className="px-5 py-3 "
        />
      </div>
    </nav>
  );
};

export default Navbar;
