import { Dispatch, SetStateAction } from "react";
import {
  Board,
  Boards,
  Column,
  Columns,
  Subtasks,
  Task,
  Tasks,
  UserContextType,
} from "../types/GlobalTypes";

export const handleTaskCreateEditSubmit = (
  boardContext: UserContextType,
  statusState: string | undefined,
  titleState: string,
  descriptionState: string,
  temporarySubtasks: Subtasks,
  handleClose: () => void,
  editing: boolean,
  title?: string,
  status?: string,
  columnID?: number,
  taskID?: number,
  setSubmitted?: Dispatch<SetStateAction<boolean>>,
) => {
  if (boardContext) {
    let prev = { ...boardContext.currentBoard };
    let duplicate = false;
    if (editing && status) {
      prev.columns.forEach((col) => {
        for (let i = 0; i < col.tasks.length; i++) {
          let currTask = col.tasks[i];
          if (
            currTask.title.toUpperCase() === titleState.toUpperCase() &&
            i !== taskID
          ) {
            duplicate = true;
          }
        }
      });
      if (columnID !== undefined && taskID !== undefined && !duplicate) {
        if (status.toUpperCase() === statusState?.toUpperCase()) {
          prev.columns[columnID].tasks[taskID] = {
            title: titleState,
            description: descriptionState,
            subtasks: temporarySubtasks,
            status: statusState,
          };
        } else {
          let tempTasks: Tasks = [];
          prev.columns[columnID].tasks.forEach((tsk) => {
            if (tsk.title.toUpperCase() !== title?.toUpperCase()) {
              tempTasks.push(tsk);
            }
          });
          prev.columns[columnID].tasks = tempTasks;
          prev.columns.forEach((col: Column) => {
            if (statusState?.toUpperCase() === col.name.toUpperCase()) {
              col.tasks.push({
                title: titleState,
                description: descriptionState,
                subtasks: temporarySubtasks,
                status: statusState,
              });
            }
          });
        }
      }
    } else {
      if (!duplicate) {
        prev.columns.forEach((col) => {
          col.tasks.forEach((task) => {
            if (task.title.toUpperCase() === titleState.toUpperCase()) {
              duplicate = true;
            }
          });
          if (
            col.name.toUpperCase() === statusState?.toUpperCase() &&
            !duplicate
          ) {
            col.tasks.push({
              title: titleState,
              description: descriptionState,
              subtasks: temporarySubtasks,
              status: statusState,
            });
          }
        });
      }
    }
    if (duplicate) {
      alert("You cannot create a task with a duplicate title!");
      return;
    }
    if (setSubmitted) {
      setSubmitted(true);
    }
    boardContext.updateBoard(prev);
    handleClose();
  }
};

export const handleBoardSubmit = (
  boardContext: UserContextType,
  boardTitle: string,
  columns: Columns,
  handleClose: () => void,
  editing: boolean,
) => {
  if (boardContext) {
    let prev = [...boardContext.boards];
    let duplicate = false;
    if (editing) {
      let updatedBoard: Board = { name: boardTitle, columns: columns };
      for (let i = 0; i < prev.length; i++) {
        let board = prev[i];
        if (
          board.name.toUpperCase() ===
          boardContext.currentBoard.name.toUpperCase()
        ) {
          prev[i] = updatedBoard;
        } else if (board.name.toUpperCase() === boardTitle.toUpperCase()) {
          duplicate = true;
          alert("You cannot have a duplicate name for a Board!");
          break;
        }
      }
      if (!duplicate) {
        boardContext.updateBoard(updatedBoard);
      }
    } else {
      for (let i = 0; i < prev.length; i++) {
        let board = prev[i];
        if (board.name.toUpperCase() === boardTitle.toUpperCase()) {
          duplicate = true;
          alert("You cannot have a duplicate name for a Board!");
          break;
        }
      }
      if (!duplicate) {
        prev.push({ name: boardTitle, columns: columns });
      }
    }
    if (!duplicate) {
      boardContext.updateBoards(prev);
      handleClose();
    }
  }
};

export const deleteBoard = (
  boardContext: UserContextType,
  handleClose: () => void,
) => {
  if (boardContext) {
    let updatedBoards: Boards = [];
    for (let i = 0; i < boardContext.boards.length; i++) {
      let board = boardContext.boards[i];
      if (
        board.name.toUpperCase() !==
        boardContext.currentBoard.name.toUpperCase()
      ) {
        updatedBoards.push(board);
      }
    }
    if (updatedBoards.length > 0) {
      boardContext.updateBoard(updatedBoards[0]);
    }
    boardContext.updateBoards(updatedBoards);
    handleClose();
  }
};

export const addNewColumn = (
  boardContext: UserContextType,
  handleClose: () => void,
  newColumn: string,
) => {
  if (boardContext) {
    let prev = { ...boardContext.currentBoard };
    let duplicate = false;
    prev.columns.forEach((col) => {
      if (col.name.toUpperCase() === newColumn.toUpperCase()) {
        duplicate = true;
      }
    });
    if (!duplicate) {
      prev.columns.push({ name: newColumn, tasks: [] });
      boardContext.updateBoard(prev);
      handleClose();
    } else {
      alert("You already have a column named: " + newColumn.toUpperCase());
    }
  }
};
