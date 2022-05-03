import { Alert, Container, LinearProgress } from '@mui/material';
import React, { ReactNode, useState } from 'react';
import { Snackbar } from '../components/Snackbar';
import { Sidebar } from '../components/Sidebar';
import { SnackbarContext } from '../context/SnackbarContext';
import { LoadingContext } from '../context/LoadingContext';

type Props = {
  children: ReactNode;
};

export function MainLayout({ children }: Props) {
  const [openAlert, setOpenAlert] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState<'success' | 'error'>('error');
  const [isLoading, setIsLoading] = useState(false);

  const onCloseAlert = () => setOpenAlert(false);

  const addAlert = ({ message, type }: { message: string; type?: 'success' | 'error' }) => {
    setMessage(message);
    setType(type || 'error');
    setOpenAlert(true);
  };

  const pages = [
    {
      title: 'Главная',
      path: '/',
    },
    {
      title: 'Записать контакт',
      path: '/create-contact',
    },
    {
      title: 'Посмотреть контакт',
      path: '/view-contact',
    },
  ];

  return (
    <>
      <SnackbarContext.Provider value={{ addAlert }}>
        <LoadingContext.Provider value={{ setIsLoading }}>
          <Sidebar items={pages} />
          {isLoading && <LinearProgress />}
          <Container style={{ marginLeft: 220, paddingTop: 20 }}>{children}</Container>
          <Snackbar message={message} type={type} open={openAlert} onClose={onCloseAlert} />
        </LoadingContext.Provider>
      </SnackbarContext.Provider>
    </>
  );
}
