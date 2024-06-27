import React, { useContext, useState } from 'react';
import Button from '../atoms/Button';
import SideBar from '../organisms/SideBar';
import { UserContext } from '../../contexts/UserContextProvider';
import vertical_ellipsis from '/assets/icon-vertical-ellipsis.svg';

import BoardDropdown from '../molecules/BoardDropdown';
import AddNewTaskModal from '../molecules/AddNewTaskModal';
import add from '/assets/icon-add-task-mobile.svg';
import down_chevron from '/assets/icon-chevron-down.svg';
import up_chevron from '/assets/icon-chevron-up.svg';
import logo from '/assets/logo-mobile.svg';
import BoardList from '../molecules/BoardList';
import DarkModeSwitch from '../molecules/DarkModeSwitch';

type NavbarProps = {
  toggleSidebar: () => void;
  sidebarActive: boolean;
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
};
const Navbar = ({
  toggleSidebar,
  sidebarActive,
  theme,
  setTheme,
}: NavbarProps) => {
  const context = useContext(UserContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [boardListActive, setBoardListActive] = useState(false);

  const triggerDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleClose = () => {
    setShowTaskModal(false);
  };
  const openModal = () => {
    setShowTaskModal(true);
  };

  return (
    <nav className="fixed z-10 flex w-full items-center h-16 md:h-20 xl:h-24 bg-white dark:bg-dark_grey_secondary border-b-2 border-b-lines_light dark:border-b-lines-dark">
      <SideBar
        toggleSidebar={toggleSidebar}
        sidebarActive={sidebarActive}
        theme={theme}
        setTheme={setTheme}
      />
      <div
        className={`${
          sidebarActive ? 'md:pl-[278px] xl:pl-[344px]' : ''
        } flex flex-grow h-16 md:h-20 xl:h-24 px-4 md:px-6 items-center justify-between`}
      >
        <h1 className="hidden md:block text-heading_XL text-black dark:text-white">
          {context?.currentBoard.name}
        </h1>
        <a
          className="flex items-center md:hidden max-md:hover:cursor-pointer"
          onClick={() => setBoardListActive((prev) => !prev)}
        >
          <img src={logo} alt="Mobile Kanban logo" className="mr-4" />
          <h1 className="text-heading_XL text-black dark:text-white pr-2">
            {context?.currentBoard.name}
          </h1>
          {boardListActive ? (
            <img src={up_chevron} alt="Chevron up" />
          ) : (
            <img src={down_chevron} alt="Chevron down" />
          )}
        </a>
        {boardListActive ? (
          <div className="flex flex-col py-4 gap-4 absolute bg-white border-2 rounded-md border-lines-light dark:bg-dark_grey_secondary dark:border-lines-dark top-20 w-[264px]">
            <BoardList />
            <div className="w-full px-4">
              <DarkModeSwitch setTheme={setTheme} />
            </div>
          </div>
        ) : null}
        <div className="flex gap-4 relative">
          <Button
            buttonType="primary"
            className="px-5 py-3 hidden md:block"
            onClick={openModal}
          >
            <span>+ Add New Task</span>
          </Button>
          <Button
            buttonType="primary"
            className="w-12 h-8 flex justify-center items-center md:hidden"
            onClick={openModal}
          >
            <img src={add} alt="add icon" />
          </Button>
          <Button buttonType="" onClick={triggerDropdown}>
            <img src={vertical_ellipsis} alt="vertical ellipsis icon" />
          </Button>
          {showDropdown ? <BoardDropdown /> : null}
          {showTaskModal ? (
            <AddNewTaskModal
              handleClose={handleClose}
              showModal={showTaskModal}
            />
          ) : null}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
