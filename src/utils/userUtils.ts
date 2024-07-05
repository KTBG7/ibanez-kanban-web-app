export const getUserCookie = () => {
  const cookies = document.cookie
    .split('; ')
    .find((row) => row.startsWith('connect.sid='));
  return cookies;
};
