"use client";
import { useState } from "react";
import Navbar from "./components/templates/Navbar";
import data from "@/public/data.json";
import Board from "./components/templates/Board";
import UserContextProvider from "./contexts/UserContextProvider";
import { Boards } from "./types/GlobalTypes";

export default function Home() {
  const [sidebarActive, setSidebarActive] = useState(false);
  const [boardData, setBoardData] = useState<Boards>(data.boards);
  const [currentBoard, setCurrentBoard] = useState(boardData[0]);
  const [theme, setTheme] = useState("");
  const toggleSidebar = () => {
    setSidebarActive((prev) => !!!prev);
  };
  const colNames: string[] = [];
  currentBoard.columns.forEach((col) => colNames.push(col.name));

  return (
    <main className="flex flex-col min-h-screen">
      <UserContextProvider
        currBoard={currentBoard}
        colNames={colNames}
        boardData={boardData}
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
