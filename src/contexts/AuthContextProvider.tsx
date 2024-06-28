import React, { createContext, useReducer, Dispatch, useMemo } from 'react';

type AuthContextType = {
  user: {
    token: string | null;
    email: string | null;
  };
  dispatchUser: Dispatch<any> | null;
};

const updateUser = (_state: string, action: any) => {
  return action;
};

type AuthContextProviderProps = {
  children: React.ReactNode;
};
export const AuthContext = createContext<AuthContextType>({
  user: { token: null, email: null },
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
