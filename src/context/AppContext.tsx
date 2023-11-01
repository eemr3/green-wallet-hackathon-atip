import { createContext, useState } from 'react';

interface AppContextProps {
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
}

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppContext = createContext<AppContextProps>({} as AppContextProps);

export function AppProvider({ children }: AppProviderProps) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <AppContext.Provider value={{ openModal, setOpenModal }}>
      {children}
    </AppContext.Provider>
  );
}
