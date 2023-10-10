'use client';
import { useState } from 'react';
import SideBar from './components/organisms/SideBar';
import Navbar from './components/organisms/Navbar';
import data from '@/public/data.json';
import Board from './components/organisms/Board';

export default function Home() {
  const [sidebarActive, setSidebarActive] = useState(false);
  const boardData = data;
  const [currentBoard, setCurrentBoard] = useState(boardData.boards[0]);
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Navbar setSidebarActive={setSidebarActive} />
      <div className="flex w-full flex-1">
        {sidebarActive ? (
          <SideBar
            boardData={boardData.boards}
            currentBoard={currentBoard}
            setCurrentBoard={setCurrentBoard}
          />
        ) : null}
        <Board currentBoard={currentBoard} />
      </div>
    </main>
  );
}
