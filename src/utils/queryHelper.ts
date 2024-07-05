import { Boards } from '../types/GlobalTypes';
export const API_URL = import.meta.env.VITE_KANBAN_BACKEND_URL;

export const userLogin = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
};

export const userSignUp = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}/signup`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
};

export const getBoards = async (user: string, email: string) => {
  const response = await fetch(`${API_URL}/boards`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'x-csrf-token': user,
      email: email,
    },
  });
  return response.json();
};

export const postBoards = async (boards: Boards, user: string) => {
  const response = await fetch(`${API_URL}/update-user-boards`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'x-csrf-token': user,
    },
    body: JSON.stringify({ boards }),
  });
  return response.json();
};

export const postUserLogout = async (user: string) => {
  const response = await fetch(`${API_URL}/logout`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'x-csrf-token': user,
    },
  });
  return response.json();
};
