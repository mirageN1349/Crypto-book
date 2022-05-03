import { createContext } from 'react';

type Context = {
  addAlert: (args: { message: string; type?: 'success' | 'error' }) => void;
};

export const SnackbarContext = createContext<Context>({
  addAlert: () => {},
});
