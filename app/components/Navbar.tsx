import React from 'react';
import Image from 'next/image';
import light_logo from '@/public/assets/logo-light.svg';
import Button from './atoms/Button';

const Navbar = () => {
  return (
    <nav className="flex w-full items-center justify-between px-8 py-5">
      <div className="flex items-center">
        <Image priority src={light_logo} alt="Kanban logo" />
      </div>
      <div>
        <Button text="+ Add New Task" buttonType="Primary" />
      </div>
    </nav>
  );
};

export default Navbar;
