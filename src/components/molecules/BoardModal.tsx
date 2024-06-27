import { Dispatch, SetStateAction, useEffect } from 'react';
import Modal from '../atoms/Modal';
import ModalInput from '../atoms/ModalInput';
import ArrayInput from './DeleteableInput';
import { Column } from '../../types/GlobalTypes';
import Button from '../atoms/Button';

import cross_icon from '/assets/icon-cross.svg';

type BoardModalProps = {
  onClose: () => void;
  onSubmit: (emptyCols: boolean, idx: number) => void;
  isOpen: boolean;
  boardTitle: string;
  setBoardTitle:
    | Dispatch<SetStateAction<string | undefined>>
    | Dispatch<SetStateAction<string>>;
  label: string;
  columns: Column[];
  setColumns:
    | Dispatch<SetStateAction<Column[] | undefined>>
    | Dispatch<SetStateAction<Column[]>>;
  submitLabel: string;
  submitType: string;
  index: number;
};

const BoardModal = ({
  onClose,
  onSubmit,
  isOpen,
  boardTitle,
  setBoardTitle,
  label,
  columns,
  setColumns,
  submitLabel,
  submitType,
  index,
}: BoardModalProps) => {
  const handleColumnChange = (e: any, id: number) => {
    const updatedColumns = [...columns];
    updatedColumns[id] = { name: e.target.value, tasks: columns[id].tasks };
    setColumns(updatedColumns);
  };

  const handleChange = (
    setState:
      | Dispatch<SetStateAction<string>>
      | Dispatch<SetStateAction<string | undefined>>,
    e: any,
  ) => {
    setState(e.target.value);
  };
  const handleDelete = (id: number) => {
    const updatedColumns: Column[] = [];
    for (let i = 0; i < columns.length; i++) {
      if (id !== i) {
        updatedColumns.push(columns[i]);
      }
    }
    setColumns(updatedColumns);
  };

  const handleAddColumn = () => {
    const prev = [...columns];
    prev.push({ name: '', tasks: [] });
    setColumns(prev);
  };
  const verifyColumns = () => {
    let emptyCols = false;
    columns.forEach((col) => {
      if (col.name.length < 1) {
        emptyCols = true;
      }
    });
    onSubmit(emptyCols, index);
  };
  useEffect(() => {}, [isOpen]);
  return (
    <Modal
      onSubmit={verifyColumns}
      isOpen={isOpen}
      submitLabel={submitLabel}
      submitType={submitType}
      onClose={onClose}
    >
      <div className="flex w-full items-center justify-between px-6 md:px-8">
        <h2 className="text-typography-black dark:text-typography-white text-heading_L">
          {label}
        </h2>
        <button
          className="text-typography-grey text-heading_XL"
          onClick={() => onClose()}
        >
          <img src={cross_icon} alt="Cross Icon" height={20} width={20} />
        </button>
      </div>
      <ModalInput
        label="Board Name"
        onChange={handleChange}
        inputType="input"
        value={boardTitle}
        setState={setBoardTitle}
        placeholder="e.g. Web Design"
      />
      <div className="flex flex-col gap-2 w-full overflow-y-scroll">
        <label className="text-typography-grey text-body_M px-6 md:px-8">
          Columns
        </label>
        <div className="w-full px-6 md:px-8 flex flex-col gap-2">
          {columns.map((col, idx) => {
            return (
              <ArrayInput
                key={idx}
                id={idx}
                deleteItem={handleDelete}
                handleChange={handleColumnChange}
                placeholder="e.g. Blocked"
                value={col.name}
              />
            );
          })}
        </div>
        <div className="w-full px-6 md:px-8">
          <Button
            buttonType="secondary"
            className="h-10 w-full text-body_L py-2"
            onClick={handleAddColumn}
          >
            + Add New Column
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default BoardModal;
