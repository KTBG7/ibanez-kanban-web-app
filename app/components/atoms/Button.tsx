import React from 'react';

type ButtonProps = {
  text: String;
  buttonType: String;
};

const Button = (props: ButtonProps) => {
  const { text, buttonType } = props;
  return <button>{text}</button>;
};

export default Button;
