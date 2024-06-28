import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from 'react';

type AuthContextType = {
  user: {
    token: string | null;
    email: string | null;
  };
  setUser:
    | Dispatch<SetStateAction<{ token: string | null; email: string | null }>>
    | (() => void);
};

type AuthContextProviderProps = {
  children: React.ReactNode;
};
export const AuthContext = createContext<AuthContextType>({
  user: { token: null, email: null },
  setUser: () => {},
});

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<{
    token: string | null;
    email: string | null;
  }>({
    token: null,
    email: null,
  });

  const authContextValue = {
    user,
    setUser,
  };

  useEffect(() => {}, [user]);

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
