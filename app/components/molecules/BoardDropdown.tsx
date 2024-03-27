import React, { useContext, useEffect, useState } from "react";
import Button from "../atoms/Button";
import BoardModal from "./BoardModal";
import { deleteBoard, handleBoardSubmit } from "@/app/utils/eventHandlers";
import { UserContext } from "@/app/contexts/UserContextProvider";
import DeleteItemModal from "./DeleteItemModal";

const BoardDropdown = () => {
  const context = useContext(UserContext);
  const [title, setTitle] = useState(context?.currentBoard.name);
  const [columns, setColumns] = useState(context?.currentBoard.columns);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const closeEditModal = () => setShowEditModal(false);
  const openEditModal = () => setShowEditModal(true);
  const handleEditSubmit = () => {
    let emptyCols = false;
    columns?.forEach((col) => {
      if (col.name.length < 1) {
        emptyCols = true;
      }
    });
    if (title && columns && !emptyCols) {
      handleBoardSubmit(context, title, columns, closeEditModal, true);
    } else {
      alert("You cannot have empty columns!");
    }
  };

  const openDeleteModal = () => setShowDeleteModal(true);
  const closeDeleteModal = () => setShowDeleteModal(false);
  const handleDeleteBoard = () => deleteBoard(context, closeDeleteModal);
  useEffect(() => {
    setTitle(context?.currentBoard.name);
    setColumns(context?.currentBoard.columns);
  }, [context?.currentBoard]);
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
      {context &&
      showEditModal &&
      title !== undefined &&
      columns !== undefined ? (
        <BoardModal
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
        />
      ) : null}
    </ul>
  );
};

export default BoardDropdown;
