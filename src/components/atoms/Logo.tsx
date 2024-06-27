import light_logo from '/assets/logo-light.svg';
import dark_logo from '/assets/logo-dark.svg';

type LogoProps = {
  theme: string;
};
const Logo = ({ theme }: LogoProps) => {
  return (
    <div className="flex-shrink-0 ">
      {theme === 'dark' ? (
        <img src={dark_logo} alt="Kanban logo" width={153} />
      ) : (
        <img src={light_logo} alt="Kanban logo" width={153} />
      )}
    </div>
  );
};

export default Logo;
