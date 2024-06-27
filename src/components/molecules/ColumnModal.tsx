import { Dispatch, SetStateAction } from 'react';
import Modal from '../atoms/Modal';
import ModalInput from '../atoms/ModalInput';
import cross_icon from '/assets/icon-cross.svg';

type ColumnModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  newColumnTitle: string;
  setState:
    | Dispatch<SetStateAction<string>>
    | Dispatch<SetStateAction<string | undefined>>;
  submitLabel: string;
  submitType: string;
};

const ColumnModal = ({
  isOpen,
  onClose,
  onSubmit,
  newColumnTitle,
  setState,
  submitLabel,
  submitType,
}: ColumnModalProps) => {
  const handleChange = (
    setState:
      | Dispatch<SetStateAction<string>>
      | Dispatch<SetStateAction<string | undefined>>,
    e: any,
  ) => {
    setState(e.target.value);
  };
  return (
    <Modal
      onSubmit={onSubmit}
      isOpen={isOpen}
      submitLabel={submitLabel}
      submitType={submitType}
      onClose={onClose}
    >
      <div className="flex w-full items-center justify-between px-6 md:px-8">
        <h2 className="text-typography-black dark:text-typography-white text-heading_L">
          Add New Column
        </h2>
        <a className="hover:cursor-pointer" onClick={() => onClose()}>
          <img src={cross_icon} alt="Cross Icon" height={20} width={20} />
        </a>
      </div>
      <ModalInput
        label="Title"
        value={newColumnTitle}
        onChange={handleChange}
        setState={setState}
        inputType="input"
      />
    </Modal>
  );
};

export default ColumnModal;
