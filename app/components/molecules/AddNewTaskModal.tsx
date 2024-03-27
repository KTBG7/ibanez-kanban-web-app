import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  useContext,
} from "react";
import EditTaskModal from "./EditTaskModal";
import { handleTaskCreateEditSubmit } from "@/app/utils/eventHandlers";
import { UserContext } from "@/app/contexts/UserContextProvider";
import { Subtasks } from "@/app/types/GlobalTypes";

type AddNewTaskModalProps = {
  handleClose: () => void;
  showModal: boolean;
};

const AddNewTaskModal = ({ handleClose, showModal }: AddNewTaskModalProps) => {
  const context = useContext(UserContext);
  const [titleState, setTitleState] = useState<string>("");
  const [descriptionState, setDescriptionState] = useState<string>("");
  const [statusState, setStatusState] = useState(context?.statuses[0]);
  const [temporarySubtasks, setTemporarySubtasks] = useState<Subtasks>([
    { title: "", isCompleted: false },
  ]);
  const handleChange = (
    setFunc: Dispatch<SetStateAction<any | undefined>>,
    e: any,
  ) => {
    setFunc(e.target.value);
  };
  const handleAddSubtask = () => {
    setTemporarySubtasks((prev) => {
      return [...prev, { title: "", isCompleted: false }];
    });
  };
  const handleSubmit = () => {
    handleTaskCreateEditSubmit(
      context,
      statusState,
      titleState,
      descriptionState,
      temporarySubtasks,
      handleClose,
      false,
    );
  };

  useEffect(() => {
    setStatusState(context?.statuses[0]);
  }, [context]);
  return (
    <>
      {statusState ? (
        <EditTaskModal
          label="Add New Task"
          onSubmit={handleSubmit}
          onClose={handleClose}
          isOpen={showModal}
          title={titleState}
          setTitle={setTitleState}
          description={descriptionState}
          setDescription={setDescriptionState}
          status={statusState}
          setStatus={setStatusState}
          subtasks={temporarySubtasks}
          setSubtasks={setTemporarySubtasks}
          onChange={handleChange}
          handleAddSubtask={handleAddSubtask}
          submitLabel="Create Task"
          submitType="primary"
        />
      ) : null}
    </>
  );
};

export default AddNewTaskModal;
