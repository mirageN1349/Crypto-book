import { Box, TextField, Typography } from '@mui/material';
import type { NextPage } from 'next';
import { ChangeEvent, FormEvent, useState } from 'react';
import { createContactFactory } from '../services/contactFactory';
import { Contact } from '../services/Contact';
import { useAlert } from '../hooks/useAlert';
import Button from '../components/Button';
import { useGlobalLoading } from '../hooks/useGlobalLoading';

const ViewContact: NextPage = () => {
  const [error, setError] = useState('');
  const [address, setAddress] = useState('');
  const [discord, setDiscord] = useState('');
  const [github, setGithub] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { addAlert } = useAlert();
  const { setIsLoading: setIsGlobalLoading } = useGlobalLoading();

  const ERROR_EMPTY_ADDRESS = 'Введите адрес';

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAddress(value);
    e.target.value ? setError('') : setError(ERROR_EMPTY_ADDRESS);
  };

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (!address) {
      setError(ERROR_EMPTY_ADDRESS);
      return;
    }
    const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS || '0xF9CAaCC170FE4023f99439f9d20Cf5adfa8c124D';

    try {
      setIsLoading(true);
      setIsGlobalLoading(true);
      const factory = await createContactFactory(contractAddress);

      const ownerAddress = await factory.ownerToContact(address);

      if (ownerAddress === '0x0000000000000000000000000000000000000000') {
        throw new Error('Такого контакта не существует');
      }

      const contact = Contact(ownerAddress);
      const discord = await contact.discord();
      const github = await contact.github();
      setDiscord(discord);
      setGithub(github);
    } catch (err: unknown) {
      addAlert({
        message: (err as { message: string }).message,
      });
      setDiscord('');
      setGithub('');
    } finally {
      setIsGlobalLoading(false);
      setIsLoading(false);
    }
  };

  return (
    <Box component="div">
      <h3>Просмотр контакта</h3>
      <form style={{ display: 'flex', flexDirection: 'column', width: '400px' }} onSubmit={submitHandler}>
        <TextField
          sx={{ mb: 2 }}
          onChange={changeHandler}
          value={address}
          error={!!error}
          helperText={error}
          label="Адрес"
        />
        <Button isLoading={isLoading} type="submit" sx={{ mb: 2 }}>
          Получить информацию
        </Button>
      </form>

      {discord && <Typography variant="body1">Discord: {discord}</Typography>}
      {github && <Typography variant="body1">Github: {github}</Typography>}
    </Box>
  );
};

export default ViewContact;
