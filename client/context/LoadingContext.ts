import { createContext } from 'react';

type Context = {
  setIsLoading: (isLoading: boolean) => void;
};

export const LoadingContext = createContext<Context>({
  setIsLoading: () => {},
});
