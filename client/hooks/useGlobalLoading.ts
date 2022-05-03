import { useContext } from 'react';
import { LoadingContext } from '../context/LoadingContext';

export const useGlobalLoading = () => useContext(LoadingContext);
