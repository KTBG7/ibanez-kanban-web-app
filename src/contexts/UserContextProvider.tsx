import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Board, Boards } from '../types/GlobalTypes';
import { useQuery } from '@tanstack/react-query';
import { postBoards } from '../utils/queryHelper';
import { AuthContext } from './AuthContextProvider';

export const UserContext = createContext<{
  boards: Boards;
  updateBoards: (updatedBoards: Boards) => void;
  currentBoard: Board;
  updateBoard: (board: Board) => void;
  statuses: string[];
} | null>(null);

type UserContextProviderProps = {
  boards: Boards;
  currBoard: Board;
  children: React.ReactNode;
  colNames: string[];
};

const UserContextProvider = ({
  boards,
  currBoard,
  children,
  colNames,
}: UserContextProviderProps) => {
  const [userBoards, setUserBoards] = useState(boards);
  const [currentBoard, setCurrentBoard] = useState(currBoard);
  const [statuses, setStatuses] = useState(colNames);
  const [userSaved, setUserSaved] = useState(false);
  const authCtx = useContext(AuthContext);
  const postBoardsQuery = useQuery({
    queryKey: ['updateBoards'],
    queryFn: async () => postBoards(boards, authCtx.user ?? ''),
    enabled: !!userSaved,
  });
  const updateBoard = useCallback((board: Board) => {
    setCurrentBoard(board);
  }, []);
  const updateBoards = useCallback((updatedBoards: Boards) => {
    setUserBoards(updatedBoards);
    setUserSaved(true);
  }, []);
  const contextValue = useMemo(
    () => ({
      boards: userBoards,
      updateBoards,
      currentBoard,
      updateBoard,
      statuses,
    }),
    [userBoards, updateBoards, currentBoard, updateBoard, statuses],
  );
  useEffect(() => {
    const newStatuses: string[] = [];
    currentBoard.columns.forEach((col) => newStatuses.push(col.name));
    setStatuses(newStatuses);
  }, [currentBoard]);

  useEffect(() => {
    setUserSaved(false);
  }, [postBoardsQuery.data, postBoardsQuery.error]);
  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
export default UserContextProvider;
