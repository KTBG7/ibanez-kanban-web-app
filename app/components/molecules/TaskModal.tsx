import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import Modal from "../atoms/Modal";
import { Subtasks, Tasks } from "@/app/types/GlobalTypes";
import Image from "next/image";
import vertical_ellipsis from "@/public/assets/icon-vertical-ellipsis.svg";
import Dropdown from "../atoms/Dropdown";
import Subtask from "../atoms/Subtask";
import { UserContext } from "@/app/contexts/UserContextProvider";
import DeleteItemModal from "./DeleteItemModal";
import Button from "../atoms/Button";

type TaskModalProps = {
  isOpen: boolean;
  title: string;
  description: string;
  status: string;
  subtasks: Subtasks;
  handleSubmit: (emptySubtasks: boolean) => void;
  setStatus: Dispatch<SetStateAction<string>>;
  setSubtasks: Dispatch<SetStateAction<Subtasks>>;
  showEditModal: () => void;
  columnID: number;
  onClose: () => void;
  completedSubtasks: number;
};

const TaskModal = ({
  isOpen,
  title,
  description,
  status,
  subtasks,
  handleSubmit,
  setStatus,
  setSubtasks,
  showEditModal,
  columnID,
  onClose,
  completedSubtasks,
}: TaskModalProps) => {
  const context = useContext(UserContext);
  const [dropdown, setDropdown] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [updated, setUpdated] = useState(false);

  const updateSubtask = (subtasksTitle: string, completed: boolean) => {
    let prev = [...subtasks];
    for (let i = 0; i < prev.length; i++) {
      if (subtasksTitle === prev[i].title) {
        prev[i].isCompleted = completed;
      }
    }
    setSubtasks(prev);
    setUpdated(true);
  };

  const updateStatus = (stat: string) => {
    setStatus(stat);
    setUpdated(true);
  };

  const deleteTask = () => {
    if (context) {
      let currBoard = { ...context.currentBoard };
      let newTasks: Tasks = [];
      currBoard.columns[columnID].tasks.forEach((task) => {
        if (task.title !== title) {
          newTasks.push(task);
        }
      });
      currBoard.columns[columnID].tasks = newTasks;
      context.updateBoard(currBoard);
      onClose();
    }
  };

  const verifySubtasks = () => {
    let emptySubtasks = false;
    subtasks.forEach((subtask) => {
      if (subtask.title.length < 1) {
        emptySubtasks = true;
      }
    });
    handleSubmit(emptySubtasks);
  };

  return (
    <Modal
      isOpen={isOpen}
      onSubmit={verifySubtasks}
      submitType={updated ? "primary" : ""}
      submitLabel="Save Task"
    >
      <div className="flex w-full items-center justify-between px-6 md:px-8">
        <h2 className="text-black text-heading_L dark:text-white">{title}</h2>
        <a
          className="hover:cursor-pointer"
          onClick={() => setDropdown((prev) => !!!prev)}
        >
          <Image src={vertical_ellipsis} alt="Vertical Ellipsis icon" />
        </a>
        {dropdown ? (
          <ul className="absolute top-14 right-0 w-[192px] text-typography-grey rounded-md bg-white border border-lines-light dark:border-lines-dark dark:bg-background-dark text-body_L">
            <li className="hover:bg-button-secondary_light_hover dark:hover:bg-button-secondary_dark dark:hover:text-button-secondary_text dark:text-white rounded-t-md">
              <Button
                buttonType=""
                className="w-full py-2 hover:cursor-pointer"
                onClick={showEditModal}
              >
                <span>Edit Task</span>
              </Button>
            </li>
            <li className="hover:bg-button-secondary_light_hover dark:hover:bg-button-secondary_dark dark:hover:text-button-secondary_text dark:text-white">
              <Button
                buttonType=""
                className="w-full py-2 hover:cursor-pointer text-typography-destructive"
                onClick={() => setShowDeleteModal(true)}
              >
                <span>Delete Task</span>
              </Button>
            </li>
            {context && showDeleteModal && title ? (
              <DeleteItemModal
                onSubmit={deleteTask}
                itemType="board"
                itemName={title}
                onClose={() => setShowDeleteModal(false)}
                isOpen={showDeleteModal}
              />
            ) : null}
            <li className="hover:bg-button-secondary_light_hover dark:hover:bg-button-secondary_dark dark:hover:text-button-secondary_text dark:text-white rounded-b-md">
              <Button
                buttonType=""
                className="w-full py-2 hover:cursor-pointer"
                onClick={() => onClose()}
              >
                <span>Close Menu</span>
              </Button>
            </li>
          </ul>
        ) : null}
      </div>
      <p className="w-full text-left text-typography-grey text-body_L px-6 md:px-8">
        {description}
      </p>
      <div
        className={`${subtasks.length > 3 ? "overflow-y-scroll overflow-visible" : null} flex flex-col pl-6 md:pl-8 gap-2 w-full overflow-y-scroll`}
      >
        <label className="text-typography-grey text-body_M">{`Subtasks (${completedSubtasks} of ${subtasks.length})`}</label>
        <div className="w-full pr-6 md:pr-8 flex flex-col gap-2">
          {subtasks.map((subtask, idx) => {
            return (
              <Subtask
                key={idx}
                title={subtask.title}
                complete={subtask.isCompleted}
                handleCheckboxChange={updateSubtask}
              />
            );
          })}
        </div>
      </div>

      {context ? (
        <Dropdown
          setState={updateStatus}
          items={context.statuses}
          label="Status"
          value={status}
        />
      ) : null}
    </Modal>
  );
};

export default TaskModal;
