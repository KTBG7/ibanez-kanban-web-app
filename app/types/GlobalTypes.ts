export type Subtask = {
  title: string;
  isCompleted: boolean;
};

export type Subtasks = Subtask[];

export type Task = {
  title: string;
  description: string;
  status: string;
  subtasks: Subtasks;
};

export type Tasks = Task[];

export type Column = {
  name: string;
  tasks: Tasks;
};

export type Columns = Column[];

export type Board = {
  name: string;
  columns: Columns;
};

export type Boards = Board[];

export type UserContextType = {
  boards: Boards;
  updateBoards: (updatedBoards: Boards) => void;
  currentBoard: Board;
  updateBoard: (board: Board) => void;
  statuses: string[];
} | null;
