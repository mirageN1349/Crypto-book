import { JsonRpcSigner } from '@ethersproject/providers';
import { Box, Divider, Link, Typography } from '@mui/material';
import type { NextPage } from 'next';
import { MouseEvent, useEffect, useState } from 'react';
import { Contacts } from '../components/types';
import { useAlert } from '../hooks/useAlert';
import { useGlobalLoading } from '../hooks/useGlobalLoading';
import { getContactsByAddress } from '../services/getContactsByAddress';
import provider from '../services/registerProvider';

const Home: NextPage = () => {
  const [myAddress, setMyAddress] = useState('');
  const [signer, setSigner] = useState<JsonRpcSigner | null>(provider.getSigner());
  const [{ discord, github }, setContacts] = useState<Contacts>({
    discord: '',
    github: '',
  });
  const { addAlert } = useAlert();
  const { setIsLoading } = useGlobalLoading();

  useEffect(() => {
    const getAddress = async () => {
      try {
        setIsLoading(true);
        if (!signer) return;
        const address = await signer.getAddress();
        if (address) setMyAddress(address);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error(error);
      }
    };

    if (myAddress) {
      getContactsByAddress(myAddress).then(res => setContacts(res));
    }
    getAddress();
  }, [myAddress, signer]);

  const handleAddressClick = (e: MouseEvent<HTMLParagraphElement>) => {
    if (e.target instanceof HTMLParagraphElement) {
      navigator.clipboard.writeText(e.target.innerText);
      addAlert({
        type: 'success',
        message: 'Адрес скопирован',
      });
    }
  };

  const connectMetamask = async () => {
    try {
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      setSigner(signer);
      addAlert({
        type: 'success',
        message: 'Metamask успешно подключен!',
      });
    } catch (error) {
      addAlert({
        message: 'Ошибка при подключении к Metamask',
      });
    }
  };

  return (
    <Box component="div">
      <h3 style={{ marginBottom: 3 }}>Мой адрес</h3>
      {myAddress && (
        <div>
          Ваш адрес:{' '}
          <p style={{ cursor: 'pointer', display: 'inline-block', color: '#1976d2' }} onClick={handleAddressClick}>
            {myAddress}
          </p>
        </div>
      )}
      {!myAddress && (
        <Typography>
          Чтобы увидеть свой адрес, установите расширение{' '}
          <Link target="_blank" href="https://metamask.io">
            metaMask
          </Link>
          . Если оно установлено нажмите:{' '}
          <Link style={{ cursor: 'pointer' }} onClick={connectMetamask}>
            подключиться
          </Link>{' '}
        </Typography>
      )}
      <br />
      <Divider />
      <br />
      <h3 style={{ marginBottom: 3 }}>Контакты</h3>
      {!discord && !github && <Typography>Нет контактов</Typography>}
      {discord && <Typography>Ваш Discord: {discord}</Typography>}
      {github && <Typography>Ваш Github: {github}</Typography>}
    </Box>
  );
};

export default Home;
