import React from 'react';

type ButtonProps = {
  text: String;
  buttonType: String;
  className?: String;
};

const Button = ({ text, buttonType, className = 'flex-1' }: ButtonProps) => {
  return <button className={`${className}`}>{text}</button>;
};

export default Button;
