import Image from 'next/image';
import React, { useContext, useEffect } from 'react';
import light_logo from '@/public/assets/logo-light.svg';
import dark_logo from '@/public/assets/logo-dark.svg';

type LogoProps = {
  theme: string;
};
const Logo = ({ theme }: LogoProps) => {
  return (
    <div className="flex-shrink-0 ">
      {theme === 'dark' ? (
        <Image priority src={dark_logo} alt="Kanban logo" width={153} />
      ) : (
        <Image priority src={light_logo} alt="Kanban logo" width={153} />
      )}
    </div>
  );
};

export default Logo;
