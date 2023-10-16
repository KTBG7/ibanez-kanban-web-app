import Image from 'next/image';
import React from 'react';
import light_logo from '@/public/assets/logo-light.svg';

type LogoProps = {
  toggleSidebar: () => void;
  sidebarActive: boolean;
};
const Logo = ({ toggleSidebar, sidebarActive }: LogoProps) => {
  return (
    <div
      onClick={toggleSidebar}
      className={`${
        sidebarActive ? 'w-96' : 'w-52 border-b-2 border-b-lines_light'
      } h-full pl-8 flex items-center border-r-2 border-r-lines_light`}
    >
      <Image priority src={light_logo} alt="Kanban logo" className="pr-1" />
    </div>
  );
};

export default Logo;
