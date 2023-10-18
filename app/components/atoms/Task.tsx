import React, { useState } from 'react';
import Modal from './Modal';

type TaskProps = {
  task: {
    title: string;
    description: string;
    status: string;
    subtasks: { title: string; isCompleted: boolean }[];
  };
};

const Task = ({ task }: TaskProps) => {
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = () => {
    setShowModal(false);
    alert('Congrats task is saved');
  };
  const handleModalClose = () => {
    setShowModal(false);
  };
  const button = {
    buttonType: 'modal',
    text: 'Save Task',
    onClick: handleSubmit,
  };
  const openTask = () => {
    setShowModal(true);
  };
  return (
    <div onClick={openTask} className="bg-white backdrop-contrast-50 py-6">
      <h2 className="text-heading_L">{task.title}</h2>
      <p className="text-body_L text-typography-grey">{task.description}</p>
      <Modal isOpen={showModal} button={button} onClose={handleModalClose}>
        <h2 className="text-heading_L">{task.title}</h2>
        <p className="text-body_L text-typography-grey">{task.description}</p>
        <h4 className="text-heading_S text-typography-grey">{`Subtasks (${task.subtasks.length})`}</h4>
      </Modal>
    </div>
  );
};

export default Task;
