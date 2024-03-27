"use client";
import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Board, Boards } from "../types/GlobalTypes";
import data from "@/public/data.json";

export const UserContext = createContext<{
  boards: Boards;
  updateBoards: (updatedBoards: Boards) => void;
  currentBoard: Board;
  updateBoard: (board: Board) => void;
  statuses: string[];
} | null>(null);

type UserContextProviderProps = {
  boardData: Boards;
  currBoard: Board;
  children: React.ReactNode;
  colNames: string[];
};

const UserContextProvider = ({
  currBoard,
  children,
  colNames,
}: UserContextProviderProps) => {
  const [boards, setBoards] = useState(data.boards);
  const [currentBoard, setCurrentBoard] = useState(currBoard);
  const [statuses, setStatuses] = useState(colNames);
  const updateBoard = useCallback((board: Board) => {
    setCurrentBoard(board);
  }, []);
  const updateBoards = useCallback((updatedBoards: Boards) => {
    setBoards(updatedBoards);
  }, []);
  const contextValue = useMemo(
    () => ({
      boards,
      updateBoards,
      currentBoard,
      updateBoard,
      statuses,
    }),
    [boards, updateBoards, currentBoard, updateBoard, statuses],
  );
  useEffect(() => {
    let newStatuses: string[] = [];
    currentBoard.columns.forEach((col) => newStatuses.push(col.name));
    setStatuses(newStatuses);
  }, [currentBoard]);
  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
export default UserContextProvider;
