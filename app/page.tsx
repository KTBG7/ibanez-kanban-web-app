'use client';
import {
  ReducerStateWithoutAction,
  createContext,
  useReducer,
  useState,
} from 'react';
import Navbar from './components/organisms/Navbar';
import data from '@/public/data.json';
import Board from './components/organisms/Board';

export default function Home() {
  const [sidebarActive, setSidebarActive] = useState(false);
  const boardData = data;
  const [currentBoard, setCurrentBoard] = useState(boardData.boards[0]);
  const [theme, setTheme] = useState('');
  const toggleSidebar = () => {
    setSidebarActive((prev) => !!!prev);
  };
  return (
    <>
      <Navbar
        boardData={boardData.boards}
        sidebarActive={sidebarActive}
        toggleSidebar={toggleSidebar}
        currentBoard={currentBoard}
        setCurrentBoard={setCurrentBoard}
        theme={theme}
        setTheme={setTheme}
      />
      <main className={`${sidebarActive ? 'md:pl-64 xl:pl-80' : ''}`}>
        <Board
          currentBoard={currentBoard}
          sidebarActive={sidebarActive}
          toggleSidebar={toggleSidebar}
        />
      </main>
    </>
  );
}
