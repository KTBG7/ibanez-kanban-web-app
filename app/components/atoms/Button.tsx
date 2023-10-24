import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  buttonType: string;
  className?: string;
  onClick: () => void;
};

const Button = ({
  children,
  buttonType,
  className = '',
  onClick,
}: ButtonProps) => {
  let classes;
  switch (buttonType) {
    case 'primary':
      classes =
        'rounded-3xl bg-button-primary hover:bg-button-primary_hover text-white';
      break;

    default:
      break;
  }
  return (
    <button onClick={onClick} className={`${className} ${classes}`}>
      {children}
    </button>
  );
};

export default Button;
