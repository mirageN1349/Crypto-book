import { Alert, Snackbar as MUISnackbar } from '@mui/material';
import React from 'react';

type Props = {
  open: boolean;
  message: string;
  type: 'success' | 'error';
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
