import React, { useState } from 'react';
import Image from 'next/image';
import light_logo from '@/public/assets/logo-light.svg';
import Button from '../atoms/Button';
import SideBar from './SideBar';

type NavbarProps = {
  setSidebarActive: React.Dispatch<React.SetStateAction<boolean>>;
};
const Navbar = ({ setSidebarActive }: NavbarProps) => {
  const [widthForSidebar, setWidthForSidebar] = useState(false);
  const toggleSidebar = () => {
    setSidebarActive((prev) => {
      setWidthForSidebar(!!!prev);
      return !!!prev;
    });
  };
  return (
    <nav className="flex w-full h-24 items-center">
      <div
        onClick={toggleSidebar}
        className={`${
          widthForSidebar ? 'w-96' : 'w-52 border-b-2 border-b-lines_light'
        } h-full pl-8 w-96 flex items-center border-r-2 border-r-lines_light`}
      >
        <Image priority src={light_logo} alt="Kanban logo" className="pr-1" />
      </div>
      <div className="border-b-2 border-b-lines_light flex-grow h-full pr-8 flex items-center justify-end">
        <Button
          text="+ Add New Task"
          buttonType="Primary"
          className="px-5 py-3 rounded-3xl text-white"
        />
      </div>
    </nav>
  );
};

export default Navbar;
