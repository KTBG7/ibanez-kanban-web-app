type SectionHeadingProps = {
  name: string;
  count: number;
  classes?: string;
};
const SectionHeading = ({ name, count, classes }: SectionHeadingProps) => {
  return (
    <h3
      className={`${classes}  text-heading_S text-typography-grey`}
    >{`${name} (${count})`}</h3>
  );
};

export default SectionHeading;
