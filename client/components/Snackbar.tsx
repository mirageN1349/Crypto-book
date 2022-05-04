import { Alert, Snackbar as MUISnackbar } from '@mui/material';
import React, { ReactNode } from 'react';

type Props = {
  open: boolean;
  message: ReactNode | string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
};

export function Snackbar({ open, message, type, onClose }: Props) {
  return (
    <MUISnackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
    >
      <Alert onClose={onClose} severity={type} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </MUISnackbar>
  );
}
