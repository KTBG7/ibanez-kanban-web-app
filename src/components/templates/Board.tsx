import { useContext, useState } from 'react';
import Column from '../molecules/Column';
import show_eye_icon from '/assets/icon-show-sidebar.svg';
import { UserContext } from '../../contexts/UserContextProvider';
import ColumnModal from '../molecules/ColumnModal';
import { addNewColumn } from '../../utils/eventHandlers';

type BoardProps = {
  sidebarActive: boolean;
  toggleSidebar: () => void;
};
const Board = ({ sidebarActive, toggleSidebar }: BoardProps) => {
  const [showModal, setShowModal] = useState(false);
  const [newColumn, setNewColumn] = useState<string>('');
  const boardContext = useContext(UserContext);
  const closeModal = () => {
    setShowModal(false);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const handleColumnAdd = () => {
    addNewColumn(boardContext, closeModal, newColumn);
  };

  return (
    <>
      {boardContext ? (
        <div
          className={`${
            sidebarActive ? 'md:pl-64 xl:pl-80' : ''
          } relative py-20 md:py-24 xl:py-28 flex w-full flex-grow flex-shrink-0 overflow-auto gap-4 bg-background-light dark:bg-background-dark`}
        >
          {!sidebarActive ? (
            <a
              onClick={toggleSidebar}
              className="hidden fixed bottom-5 md:flex h-12 w-14 items-center justify-center bg-button-primary rounded-r-3xl hover:cursor-pointer"
            >
              <img src={show_eye_icon} alt="Eye to hide sidebar" />
            </a>
          ) : null}
          <ul className="flex gap-6 pr-4">
            {boardContext.currentBoard.columns.map((column, idx) => (
              <li key={idx} className="first:pl-4">
                <Column column={column} id={idx} />
              </li>
            ))}
            <li className="pt-[39px]" onClick={() => openModal()}>
              <Column className="hover:cursor-pointer h-[700px]" />
            </li>
          </ul>
          {showModal ? (
            <ColumnModal
              setState={setNewColumn}
              newColumnTitle={newColumn}
              onSubmit={handleColumnAdd}
              isOpen={showModal}
              submitType="primary"
              submitLabel="Create Column"
              onClose={closeModal}
            />
          ) : null}
        </div>
      ) : null}
    </>
  );
};

export default Board;
