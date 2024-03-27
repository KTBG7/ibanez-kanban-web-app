import React, { useContext, useState } from "react";
import Button from "../atoms/Button";
import SectionHeading from "../atoms/SectionHeading";
import BoardLogo from "../atoms/BoardLogo";
import { Column } from "@/app/types/GlobalTypes";
import BoardModal from "./BoardModal";
import { UserContext } from "@/app/contexts/UserContextProvider";
import { handleBoardSubmit } from "@/app/utils/eventHandlers";

const BoardList = () => {
  const context = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  const [boardTitle, setBoardTitle] = useState("");
  const [columns, setColumns] = useState<Column[]>([{ name: "", tasks: [] }]);

  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  const handleSubmit = (emptyCols: boolean) => {
    if (!emptyCols) {
      handleBoardSubmit(context, boardTitle, columns, closeModal, false);
    } else {
      alert("You cannot have empty columns!");
    }
  };

  return (
    <>
      {context ? (
        <div>
          <SectionHeading
            name={"All Boards"}
            count={context.boards.length}
            classes="pl-8 pb-5"
          />
          <ul className="flex flex-col pr-6">
            {context.boards.map((board, idx) => (
              <li key={idx}>
                <Button
                  onClick={() => context.updateBoard(board)}
                  buttonType=""
                  className={`${
                    context.currentBoard.name.toUpperCase() ===
                    board.name.toUpperCase()
                      ? "bg-button-primary text-typography-white"
                      : "hover:bg-button-secondary_light dark:hover:bg-button-secondary_dark text-typography-grey hover:text-button-primary"
                  } flex group items-center gap-4 text-left pl-6 py-4 w-full rounded-r-full hover:cursor-pointer`}
                >
                  <BoardLogo
                    className={
                      context.currentBoard.name.toUpperCase() ===
                      board.name.toUpperCase()
                        ? "fill-typography-white"
                        : "fill-typography-grey group-hover:fill-typography-purple"
                    }
                  />
                  {board.name}
                </Button>
              </li>
            ))}
            <li className="text-left pl-6 py-4 w-full rounded-r-full text-typography-purple hover:bg-button-secondary_light dark:hover:bg-button-secondary_dark hover:cursor-pointer">
              <Button onClick={() => openModal()} buttonType="create">
                <p>+ Create New Board</p>
              </Button>
            </li>
          </ul>
          {showModal ? (
            <BoardModal
              onClose={closeModal}
              onSubmit={handleSubmit}
              isOpen={showModal}
              boardTitle={boardTitle}
              setBoardTitle={setBoardTitle}
              columns={columns}
              setColumns={setColumns}
              label="Add New Board"
              submitLabel="Create Board"
              submitType="primary"
            />
          ) : null}
        </div>
      ) : null}
    </>
  );
};

export default BoardList;
