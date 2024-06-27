import { Boards } from '../types/GlobalTypes';

export const userLogin = async (email: string, password: string) => {
  const response = await fetch(
    `${process.env.REACT_APP_KANBAN_BACKEND_URL}/login`,
    {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    },
  );
  return response.json();
};

export const userSignUp = async (email: string, password: string) => {
  const response = await fetch(
    `${process.env.REACT_APP_KANBAN_BACKEND_URL}/signup`,
    {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    },
  );
  return response.json();
};

export const getBoards = async (user: string) => {
  const response = await fetch(
    `${process.env.REACT_APP_KANBAN_BACKEND_URL}/boards`,
    {
      method: 'GET',
      credentials: 'include',
      headers: {
        'x-csrf-token': user,
      },
    },
  );
  return response.json();
};

export const postBoards = async (boards: Boards, user: string) => {
  const response = await fetch(
    `${process.env.REACT_APP_KANBAN_BACKEND_URL}/update-user-boards`,
    {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'x-csrf-token': user,
      },
      body: JSON.stringify({ boards }),
    },
  );
  return response.json();
};

export const postUserLogout = async (user: string) => {
  const response = await fetch(
    `${process.env.REACT_APP_KANBAN_BACKEND_URL}/logout`,
    {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'x-csrf-token': user,
      },
    },
  );
  return response.json();
};
