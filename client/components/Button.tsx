import React, { ReactNode } from 'react';
import { CircularProgress, Button as MUIButton, SxProps } from '@mui/material';

type Props = {
  children: ReactNode;
  isLoading: boolean;
  type: 'submit' | 'reset' | 'button';
  sx: SxProps;
};

export default function Button({ isLoading, children, type, sx }: Props) {
  return (
    <MUIButton disabled={isLoading} type={type} sx={sx} variant="contained" color="primary">
      {isLoading && (
        <>
          <CircularProgress size={15} />
          &nbsp;
        </>
      )}
      {children}
    </MUIButton>
  );
}
