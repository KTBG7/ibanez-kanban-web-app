import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import Modal from '../atoms/Modal';
import ModalInput from '../atoms/ModalInput';
import { Subtask, Subtasks } from '../../types/GlobalTypes';
import Button from '../atoms/Button';
import { UserContext } from '../../contexts/UserContextProvider';
import Dropdown from '../atoms/Dropdown';
import DeleteableInput from './DeleteableInput';
import cross_icon from '/assets/icon-cross.svg';

type EditTaskModalProps = {
  label: string;
  onSubmit: (emptySubtasks: boolean) => void;
  onClose: () => void;
  isOpen: boolean;
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  description: string;
  setDescription: Dispatch<SetStateAction<string>>;
  status: string;
  setStatus:
    | Dispatch<SetStateAction<string | undefined>>
    | Dispatch<SetStateAction<string>>;
  subtasks: Subtasks;
  setSubtasks: Dispatch<SetStateAction<Subtasks>>;
  onChange: (
    setState:
      | Dispatch<SetStateAction<string | undefined>>
      | Dispatch<SetStateAction<string>>,
    e: any,
  ) => void;
  handleAddSubtask: () => void;
  submitLabel: string;
  submitType: string;
};

const EditTaskModal = ({
  label,
  onSubmit,
  isOpen,
  title,
  setTitle,
  description,
  setDescription,
  status,
  setStatus,
  subtasks,
  setSubtasks,
  onChange,
  handleAddSubtask,
  onClose,
  submitLabel,
  submitType,
}: EditTaskModalProps) => {
  const boardContext = useContext(UserContext);
  const [showModal, setShowModal] = useState(isOpen);
  const deleteSubtask = (id: number) => {
    const updatedSubtasks: Subtasks = [];
    for (let i = 0; i < subtasks.length; i++) {
      if (id !== i) {
        updatedSubtasks.push(subtasks[i]);
      }
    }
    setSubtasks(updatedSubtasks);
  };
  const handleClose = () => {
    setShowModal(false);
  };

  const verifySubtasks = () => {
    let emptySubtasks = false;
    subtasks.forEach((subtask: Subtask) => {
      if (subtask.title.length < 1) {
        emptySubtasks = true;
      }
    });
    onSubmit(emptySubtasks);
  };

  const handleTitleChange = (e: any, id: number) => {
    const updatedSubtasks = [...subtasks];
    updatedSubtasks[id] = {
      title: e.target.value,
      isCompleted: subtasks[id].isCompleted,
    };
    setSubtasks(updatedSubtasks);
  };
  useEffect(() => {
    if (!showModal) {
      onClose();
    }
  }, [showModal, onClose]);

  return (
    <Modal
      isOpen={isOpen}
      onSubmit={verifySubtasks}
      submitLabel={submitLabel}
      submitType={submitType}
      onClose={onClose}
    >
      <div className="flex px-6 md:px-8  w-full max-h-full items-center justify-between">
        <h2 className="text-typography-black dark:text-typography-white text-heading_L">
          {label}
        </h2>
        <button
          className="text-typography-grey text-heading_XL"
          onClick={() => handleClose()}
        >
          <img src={cross_icon} alt="Cross Icon" height={20} width={20} />
        </button>
      </div>
      <div className="flex w-full relative">
        <ModalInput
          label="Title"
          inputType="input"
          setState={setTitle}
          value={title}
          onChange={onChange}
        />
        <span className="absolute right-8 text-[11px] font-semibold text-typography-grey">
          {title.length}/120 Max Characters
        </span>
      </div>
      <ModalInput
        label="Description"
        inputType="textArea"
        setState={setDescription}
        value={description}
        onChange={onChange}
      />
      <div
        className={`${
          subtasks.length > 3 ? 'overflow-y-scroll overflow-visible' : null
        } flex flex-col pl-6 md:pl-8 gap-2 w-full overflow-y-scroll`}
      >
        <label className="text-body_M text-typography-grey dark:text-white">
          Subtasks
        </label>
        <div className="flex flex-col gap-3 pr-6 md:pr-8 w-full">
          {subtasks.map((subTask: Subtask, idx: number) => {
            return (
              <DeleteableInput
                id={idx}
                key={idx}
                value={subTask.title}
                handleChange={handleTitleChange}
                deleteItem={deleteSubtask}
                placeholder="e.g. Drink coffee & smile"
              />
            );
          })}
        </div>
      </div>
      <div className="w-full px-6 md:px-8">
        <Button
          buttonType="secondary"
          className="h-10 w-full text-body_L py-2"
          onClick={handleAddSubtask}
        >
          + Add New Subtask
        </Button>
      </div>
      {boardContext?.statuses ? (
        <Dropdown
          setState={setStatus}
          label="Status"
          value={status}
          items={boardContext.statuses}
        />
      ) : null}
    </Modal>
  );
};

export default EditTaskModal;
