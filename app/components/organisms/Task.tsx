import React, { useContext, useEffect, useState } from "react";
import { Subtask, Subtasks } from "../../types/GlobalTypes";
import EditTaskModal from "../molecules/EditTaskModal";
import { UserContext } from "@/app/contexts/UserContextProvider";
import { handleTaskCreateEditSubmit } from "@/app/utils/eventHandlers";
import TaskModal from "../molecules/TaskModal";

type TaskProps = {
  title: string;
  description: string;
  status: string;
  subtasks: Subtasks;
  columnID: number;
  taskID: number;
};

const Task = ({
  title,
  description,
  status,
  subtasks,
  columnID,
  taskID,
}: TaskProps) => {
  const boardContext = useContext(UserContext);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [completedSubtasks, setCompletedSubtasks] = useState(
    subtasks.filter((subtask) => subtask.isCompleted),
  );
  const [titleState, setTitleState] = useState(title);
  const [descriptionState, setDescriptionState] = useState(description);
  const [statusState, setStatusState] = useState(status);
  const [temporarySubtasks, setTemporarySubtasks] =
    useState<Subtasks>(subtasks);
  const [submitted, setSubmitted] = useState(false);
  const [emptySubtasks, setEmptySubtasks] = useState(false);
  const handleChange = (setFunc: React.SetStateAction<any>, e: any) => {
    setFunc(e.target.value);
  };
  const handleAddSubtask = () => {
    setTemporarySubtasks((prev) => {
      return [...prev, { title: "", isCompleted: false }];
    });
  };
  const completedSubtasksFilter = (subtaskArray: Subtasks) => {
    setCompletedSubtasks(
      subtaskArray.filter((subtask: Subtask) => subtask.isCompleted),
    );
  };

  const handleEditClose = () => {
    setShowEditModal(false);
  };
  const openEditTask = () => {
    setShowEditModal(true);
  };

  const handleTaskClose = () => setShowTaskModal(false);
  const openTaskModal = () => setShowTaskModal(true);

  const handleSubmit = (emptySubtasks: boolean) => {
    if (!emptySubtasks) {
      handleTaskCreateEditSubmit(
        boardContext,
        statusState,
        titleState,
        descriptionState,
        temporarySubtasks,
        handleEditClose,
        true,
        title,
        status,
        columnID,
        taskID,
        setSubmitted,
      );
      handleTaskClose();
    } else {
      alert("You cannot have an empty subtask!");
    }
  };

  useEffect(() => {
    setTitleState(title);
    setDescriptionState(description);
    setStatusState(status);
    setTemporarySubtasks(subtasks);
  }, [showEditModal, title, description, status, subtasks]);

  useEffect(() => {
    if (submitted) {
      completedSubtasksFilter(temporarySubtasks);
    }
  }, [temporarySubtasks, submitted]);

  return (
    <>
      <li
        onClick={openTaskModal}
        className="bg-white dark:bg-dark_grey_secondary dark:text-white py-6 px-2 xl:px-4 shadow-md rounded-md text-left hover:cursor-pointer"
      >
        <h2 className="text-heading_L pb-2">{title}</h2>
        <h4 className="text-body_M text-typography-grey">{`${completedSubtasks.length} of ${subtasks.length} subtasks`}</h4>
      </li>
      {showTaskModal ? (
        <TaskModal
          isOpen={showTaskModal}
          title={title}
          description={description}
          status={statusState}
          subtasks={subtasks}
          handleSubmit={handleSubmit}
          setStatus={setStatusState}
          setSubtasks={setTemporarySubtasks}
          showEditModal={openEditTask}
          columnID={columnID}
          onClose={handleTaskClose}
          completedSubtasks={completedSubtasks.length}
        />
      ) : null}
      {showEditModal && statusState ? (
        <EditTaskModal
          label="Edit Task"
          onSubmit={handleSubmit}
          onClose={handleEditClose}
          isOpen={showEditModal}
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
          submitType="primary"
          submitLabel="Save Changes"
        />
      ) : null}
    </>
  );
};

export default Task;
