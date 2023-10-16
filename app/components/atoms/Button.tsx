import React from 'react';

type ButtonProps = {
  text: String;
  buttonType: String;
  className?: String;
};

const Button = ({ text, buttonType, className = 'flex-1' }: ButtonProps) => {
  let classes;
  switch (buttonType) {
    case 'primary':
      classes =
        'rounded-3xl bg-button-primary hover:bg-button-primary_hover text-white';
      break;

    default:
      break;
  }
  return <button className={`${className}`}>{text}</button>;
};

export default Button;
