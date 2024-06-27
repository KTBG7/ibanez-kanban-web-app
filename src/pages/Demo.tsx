import { useState } from 'react';
import Navbar from '../components/templates/Navbar';
import data from '../utils/data.json';
import Board from '../components/templates/Board';
import UserContextProvider from '../contexts/UserContextProvider';
import { Board as BoardType, Boards } from '../types/GlobalTypes';

export default function Demo() {
  const [sidebarActive, setSidebarActive] = useState(false);
  const boardData: Boards = data.boards;
  const currentBoard: BoardType = boardData[0];
  const [theme, setTheme] = useState('');
  const toggleSidebar = () => {
    setSidebarActive((prev) => !prev);
  };
  const colNames: string[] = [];
  currentBoard.columns.forEach((col) => colNames.push(col.name));

  return (
    <main className="flex flex-col min-h-screen">
      <UserContextProvider
        currBoard={currentBoard}
        colNames={colNames}
        boards={boardData}
      >
        <Navbar
          sidebarActive={sidebarActive}
          toggleSidebar={toggleSidebar}
          theme={theme}
          setTheme={setTheme}
        />
        <Board sidebarActive={sidebarActive} toggleSidebar={toggleSidebar} />
      </UserContextProvider>
    </main>
  );
}
