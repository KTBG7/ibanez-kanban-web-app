type SubtaskProps = {
  title: string;
  complete: boolean;
  handleCheckboxChange: (title: string, complete: boolean) => void;
};
const Subtask = ({ title, complete, handleCheckboxChange }: SubtaskProps) => {
  return (
    <div className="flex w-full items-center px-4 gap-4 bg-background-light dark:bg-dark_grey_secondary h-10 rounded-md">
      <input
        type="checkbox"
        name={title}
        id={title}
        checked={complete}
        onChange={() => handleCheckboxChange(title, !complete)}
        className="h-4 w-4 checked:accent-button-primary"
      />
      <label
        className={
          complete
            ? 'text-body_M text-typography-grey line-through'
            : 'text-body_M text-black dark:text-white'
        }
      >
        {title}
      </label>
    </div>
  );
};

export default Subtask;
