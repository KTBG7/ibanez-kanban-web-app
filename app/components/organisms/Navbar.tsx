import React, { useState } from 'react';
import Button from '../atoms/Button';
import Logo from '../atoms/Logo';
import Modal from '../atoms/Modal';

type NavbarProps = {
  toggleSidebar: () => void;
  sidebarActive: boolean;
  currentBoard: string;
};
const Navbar = ({
  toggleSidebar,
  sidebarActive,
  currentBoard,
}: NavbarProps) => {
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <nav className="flex w-full h-24 items-center bg-white dark:bg-dark_grey_secondary">
      <Logo toggleSidebar={toggleSidebar} sidebarActive={sidebarActive} />
      <div className="border-b-2 border-b-lines_light dark:border-b-lines-dark flex flex-grow h-full pr-8 items-center justify-between">
        <h1 className="pl-8 text-black dark:text-white">{currentBoard}</h1>
        <Button
          text="+ Add New Task"
          buttonType="primary"
          className="px-5 py-3"
          onClick={openModal}
        />
        <Modal isOpen={showModal} onClose={closeModal}>
          \
        </Modal>
      </div>
    </nav>
  );
};

export default Navbar;
