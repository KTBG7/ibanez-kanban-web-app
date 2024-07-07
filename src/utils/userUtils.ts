export const setUserSession = (token: string) => {
  localStorage.setItem('kanban_user', token);
};

export const getUserSession = () => {
  return localStorage.getItem('kanban_user');
};

export const deleteUserSession = () => {
  return localStorage.removeItem('kanban_user');
};
