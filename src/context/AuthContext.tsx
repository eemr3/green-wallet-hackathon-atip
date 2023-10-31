import { onAuthStateChanged } from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import { auth } from '../service/firebase/firebase';

type AuthContextType = {
  user: User | undefined;
  setUser: (value: User) => void;
};

type User = {
  id: string;
  name?: string | null;
  avatar?: string | null;
};

interface AuthProviderProps {
  children: React.ReactNode;
}
export const AuthContext = createContext({} as AuthContextType);
export function AuthContextProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          id: user.uid,
          name: user.displayName,
          avatar: user.photoURL,
        });
      } else {
        setUser(undefined);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
