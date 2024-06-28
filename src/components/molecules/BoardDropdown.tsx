import { useContext, useEffect, useState } from 'react';
import Button from '../atoms/Button';
import BoardModal from './BoardModal';
import { deleteBoard, handleBoardSubmit } from '../../utils/eventHandlers';
import { UserContext } from '../../contexts/UserContextProvider';
import DeleteItemModal from './DeleteItemModal';
import { AuthContext } from '../../contexts/AuthContextProvider';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { postUserLogout } from '../../utils/queryHelper';

const BoardDropdown = () => {
  const context = useContext(UserContext);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState(context?.currentBoard.name);
  const [columns, setColumns] = useState(context?.currentBoard.columns);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [logout, setLogout] = useState(false);
  const { data, error } = useQuery({
    queryKey: ['logout'],
    queryFn: () => postUserLogout(authContext.user.token ?? ''),
    enabled: logout && authContext.user.token !== null ? true : false,
  });
  const closeEditModal = () => setShowEditModal(false);
  const openEditModal = () => setShowEditModal(true);
  const handleEditSubmit = () => {
    let emptyCols = false;
    columns?.forEach((col) => {
      if (col.name.length < 1) {
        emptyCols = true;
      }
    });
    if (title && columns && !emptyCols && context) {
      handleBoardSubmit(
        context,
        context.currentBoard.idx,
        title,
        columns,
        closeEditModal,
        true,
      );
    } else {
      alert('You cannot have empty columns!');
    }
  };

  const handleUserLogout = () => setLogout(true);

  const openDeleteModal = () => setShowDeleteModal(true);
  const closeDeleteModal = () => setShowDeleteModal(false);
  const handleDeleteBoard = () => deleteBoard(context, closeDeleteModal);
  useEffect(() => {
    setTitle(context?.currentBoard.name);
    setColumns(context?.currentBoard.columns);
  }, [context?.currentBoard]);

  useEffect(() => {
    if ((data && data?.statusCode !== 200) || error) {
      alert('Error Logging out, please refresh and try again.');
    }
    if (data && data?.statusCode === 200 && authContext.dispatchUser) {
      setLogout(false);
      authContext.dispatchUser(null);
      navigate('/');
    }
  }, [data, error, navigate, authContext]);
  return (
    <ul className="absolute top-14 right-0 w-[192px] text-typography-grey rounded-md bg-white border border-lines-light dark:border-lines-dark dark:bg-dark_grey_primary text-body_L">
      <li className="hover:bg-button-secondary_light_hover dark:hover:bg-button-secondary_dark dark:hover:text-button-secondary_text dark:text-white rounded-t-md">
        <Button
          buttonType=""
          className="w-full py-2 hover:cursor-pointer"
          onClick={openEditModal}
        >
          <span>Edit Board</span>
        </Button>
      </li>
      <li className="hover:bg-button-secondary_light_hover dark:hover:bg-button-secondary_dark dark:hover:text-button-secondary_text dark:text-white rounded-b-md">
        <Button
          buttonType=""
          className="w-full py-2 hover:cursor-pointer text-typography-destructive"
          onClick={openDeleteModal}
        >
          <span>Delete Board</span>
        </Button>
      </li>
      <li className="hover:bg-button-secondary_light_hover dark:hover:bg-button-secondary_dark dark:hover:text-button-secondary_text dark:text-white rounded-b-md">
        {authContext.user.token && !logout ? (
          <Button
            buttonType=""
            className="w-full py-2 hover:cursor-pointer"
            onClick={handleUserLogout}
          >
            <span>Log out</span>
          </Button>
        ) : (
          <Link
            to={'/login'}
            className="flex flex-grow justify-center w-full py-2 hover:cursor-pointer"
          >
            <span className="text-center">Log In</span>
          </Link>
        )}
      </li>
      {context &&
      showEditModal &&
      title !== undefined &&
      columns !== undefined ? (
        <BoardModal
          index={context.currentBoard.idx}
          onClose={closeEditModal}
          onSubmit={handleEditSubmit}
          isOpen={showEditModal}
          boardTitle={title}
          setBoardTitle={setTitle}
          columns={columns}
          setColumns={setColumns}
          label="Edit Board"
          submitLabel="Save changes"
          submitType="primary"
        />
      ) : null}
      {context && showDeleteModal && title ? (
        <DeleteItemModal
          onSubmit={handleDeleteBoard}
          itemType="board"
          itemName={title}
          onClose={closeDeleteModal}
          isOpen={showDeleteModal}
          submitLabel="Delete Board"
        />
      ) : null}
    </ul>
  );
};

export default BoardDropdown;
