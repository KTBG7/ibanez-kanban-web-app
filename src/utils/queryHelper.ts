import { Boards } from '../types/GlobalTypes';
import { getUserSession } from './userUtils';
export const API_URL = import.meta.env.VITE_KANBAN_BACKEND_URL;

const userSession = getUserSession();

export const userLogin = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    credentials: 'same-origin',
    mode: 'same-origin',
    referrer: 'https://api.ibanezkanban.com/',
    headers: {
      'Content-Type': 'application/json',
      kanban_user: userSession ? userSession : '',
    },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
};

export const userSignUp = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}/signup`, {
    method: 'POST',
    credentials: 'same-origin',
    mode: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      kanban_user: userSession ? userSession : '',
    },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
};

export const getBoards = async (user: string) => {
  const response = await fetch(`${API_URL}/boards`, {
    method: 'GET',
    credentials: 'same-origin',
    mode: 'same-origin',
    headers: {
      'x-csrf-token': user,
      kanban_user: userSession ? userSession : '',
    },
  });
  return response.json();
};

export const postBoards = async (boards: Boards, user: string) => {
  const response = await fetch(`${API_URL}/update-user-boards`, {
    method: 'POST',
    credentials: 'same-origin',
    mode: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'x-csrf-token': user,
      kanban_user: userSession ? userSession : '',
    },
    body: JSON.stringify({ boards }),
  });
  return response.json();
};

export const postUserLogout = async (user: string) => {
  const response = await fetch(`${API_URL}/logout`, {
    method: 'POST',
    credentials: 'same-origin',
    mode: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'x-csrf-token': user,
      kanban_user: userSession ? userSession : '',
    },
  });
  return response.json();
};
