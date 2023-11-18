import React, { useState } from 'react';
import Button from '../atoms/Button';
import Modal from '../atoms/Modal';
import SideBar from './SideBar';

type NavbarProps = {
  toggleSidebar: () => void;
  sidebarActive: boolean;
  currentBoard: {
    name: string;
    columns: {
      name: string;
      tasks: {
        title: string;
        description: string;
        status: string;
        subtasks: { title: string; isCompleted: boolean }[];
      }[];
    }[];
  };
  boardData: {
    name: string;
    columns: {
      name: string;
      tasks: {
        title: string;
        description: string;
        status: string;
        subtasks: { title: string; isCompleted: boolean }[];
      }[];
    }[];
  }[];
  setCurrentBoard: React.Dispatch<
    React.SetStateAction<{
      name: string;
      columns: {
        name: string;
        tasks: {
          title: string;
          description: string;
          status: string;
          subtasks: {
            title: string;
            isCompleted: boolean;
          }[];
        }[];
      }[];
    }>
  >;
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
};
const Navbar = ({
  toggleSidebar,
  sidebarActive,
  currentBoard,
  boardData,
  setCurrentBoard,
  theme,
  setTheme,
}: NavbarProps) => {
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <nav className="fixed z-50 flex w-full items-center h-16 md:h-20 xl:h-24 bg-white dark:bg-dark_grey_secondary border-b-2 border-b-lines_light dark:border-b-lines-dark ">
      <SideBar
        toggleSidebar={toggleSidebar}
        sidebarActive={sidebarActive}
        boardData={boardData}
        currentBoard={currentBoard}
        setCurrentBoard={setCurrentBoard}
        theme={theme}
        setTheme={setTheme}
      />
      <div
        className={`${
          sidebarActive ? 'md:pl-64 xl:pl-80' : ' '
        } flex flex-grow h-16 md:h-20 xl:h-24 pr-8 items-center justify-between`}
      >
        <h1 className="pl-8 text-black dark:text-white">{currentBoard.name}</h1>
        <Button buttonType="primary" className="px-5 py-3" onClick={openModal}>
          <span>+ Add New Task</span>
        </Button>
        <Modal isOpen={showModal} onClose={closeModal}>
          Hello this is the modal
        </Modal>
      </div>
    </nav>
  );
};

export default Navbar;
