import React from 'react';

type SectionHeadingProps = {
  name: string;
  count: Number;
  classes?: string;
};
const SectionHeading = ({ name, count, classes }: SectionHeadingProps) => {
  return (
    <h3
      className={`${classes} text-typography-grey text-heading_S`}
    >{`${name} (${count})`}</h3>
  );
};

export default SectionHeading;
