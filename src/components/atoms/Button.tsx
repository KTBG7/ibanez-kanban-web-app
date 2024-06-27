import { ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
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
    case 'secondary':
      classes =
        'rounded-3xl bg-button-secondary_light hover:bg-button-secondary_light_hover text-button-secondary_text dark:bg-white';
      break;
    case 'delete':
      classes =
        'rounded-3xl bg-button-destructive hover:bg-button-destructive_hover text-white';
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
