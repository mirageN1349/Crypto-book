import { createContext, ReactNode } from 'react';

type Context = {
  addAlert: (args: { message: string | ReactNode; type?: 'success' | 'error' | 'info' }) => void;
};

export const SnackbarContext = createContext<Context>({
  addAlert: () => {},
});
