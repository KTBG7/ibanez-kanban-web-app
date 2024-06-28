import { useContext, useEffect, useState } from 'react';
import Board from '../components/templates/Board';
import Navbar from '../components/templates/Navbar';
import UserContextProvider from '../contexts/UserContextProvider';
import { Boards, Column } from '../types/GlobalTypes';
import { AuthContext } from '../contexts/AuthContextProvider';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getBoards } from '../utils/queryHelper';

const Kanban = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const { data, error } = useQuery({
    queryKey: ['boards'],
    queryFn: () =>
      getBoards(authCtx.user.token ?? '', authCtx.user.email ?? ''),
  });
  const [sidebarActive, setSidebarActive] = useState(false);
  const [boardData, setBoardData] = useState<Boards | null>(null);

  const [theme, setTheme] = useState('');
  const toggleSidebar = () => {
    setSidebarActive((prev) => !prev);
  };

  useEffect(() => {
    if (authCtx.user.token === null) {
      navigate('/login');
    }
    if (data && data?.statusCode === 200 && !error) {
      setBoardData(data.boards);
    }
  }, [authCtx, navigate, data, error]);
  const colNames: string[] = [];
  if (boardData && boardData[0]?.columns) {
    boardData[0].columns.forEach((col: Column) => colNames.push(col.name));
  }
  if (boardData) {
    return (
      <main className="flex flex-col min-h-screen">
        <UserContextProvider
          boards={boardData}
          currBoard={data.boards[0]}
          colNames={colNames}
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
  return <></>;
};

export default Kanban;
