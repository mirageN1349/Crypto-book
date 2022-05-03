import { useContext } from 'react';
import { SnackbarContext } from '../context/SnackbarContext';

export const useAlert = () => useContext(SnackbarContext);
