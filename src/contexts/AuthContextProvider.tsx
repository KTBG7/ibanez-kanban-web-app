import React, { createContext, useReducer, Dispatch, useMemo } from 'react';

type AuthContextType = {
  user: string | null;
  dispatchUser: Dispatch<string> | null;
};

const updateUser = (_state: string, action: string) => {
  return action;
};

type AuthContextProviderProps = {
  children: React.ReactNode;
};
export const AuthContext = createContext<AuthContextType>({
  user: '',
  dispatchUser: null,
});

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, dispatchUser] = useReducer(updateUser, '');

  const authContextValue = useMemo(
    () => ({
      user,
      dispatchUser,
    }),
    [user],
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
