import React from 'react';

type ButtonProps = {
  text: string;
  buttonType: string;
  className?: string;
  onClick: () => void;
};

const Button = ({
  text,
  buttonType,
  className = 'flex-1',
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
    <button onClick={onClick} className={`${className}`}>
      {text}
    </button>
  );
};

export default Button;
