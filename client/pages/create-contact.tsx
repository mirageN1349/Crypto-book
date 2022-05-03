import { ChangeEvent, FormEvent, useState } from 'react';
import type { NextPage } from 'next';
import { Box, TextField } from '@mui/material';
import Button from '../components/Button';
import { useAlert } from '../hooks/useAlert';
import { useGlobalLoading } from '../hooks/useGlobalLoading';
import { createContactFactory } from '../services/contactFactory';
import provider from '../services/registerProvider';

const CreateContact: NextPage = () => {
  const [error, setError] = useState({
    discord: '',
    github: '',
  });
  const [query, setQuery] = useState({
    discord: '',
    github: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const { addAlert } = useAlert();
  const { setIsLoading: setIsGlobalLoading } = useGlobalLoading();

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name as 'discord' | 'github';
    setQuery(prev => ({ ...prev, [name]: value }));
    e.target.value ? setError(prev => ({ ...prev, [name]: '' })) : setError(prev => ({ ...prev, [name]: prev[name] }));
  };

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (!query.discord || !query.github) {
      !query.discord && setError(prev => ({ ...prev, discord: 'Введите discord' }));
      !query.github && setError(prev => ({ ...prev, github: 'Введите github' }));
      return;
    }

    const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS || '0xF9CAaCC170FE4023f99439f9d20Cf5adfa8c124D';

    try {
      setIsLoading(true);
      setIsGlobalLoading(true);
      const fromAddress = await provider.getSigner().getAddress();
      const factory = await createContactFactory(contractAddress);
      const { hash } = await factory['createContact(string,string)'](query.github, query.discord, {
        from: fromAddress,
      });
      await provider.waitForTransaction(hash);
      addAlert({
        type: 'success',
        message: 'Данные добавлены в блокчейн, дальнейшее удаление или редактирование невозможно =]',
      });
      setIsLoading(false);
      setIsGlobalLoading(false);
    } catch (err: unknown) {
      setIsLoading(false);
      setIsGlobalLoading(false);
      addAlert({
        message: (err as { message: string }).message,
      });
    }
  };

  return (
    <Box component="div">
      <h3>Создать контакт</h3>
      <form style={{ display: 'flex', flexDirection: 'column', width: '400px' }} onSubmit={submitHandler}>
        <TextField
          sx={{ mb: 2 }}
          onChange={changeHandler}
          value={query.discord}
          name="discord"
          error={!!error.discord}
          helperText={error.discord}
          label="Discord"
        />
        <TextField
          sx={{ mb: 2 }}
          onChange={changeHandler}
          value={query.github}
          name="github"
          error={!!error.github}
          helperText={error.github}
          label="Github"
        />
        <Button isLoading={isLoading} type="submit" sx={{ mb: 2 }}>
          Создать контакт
        </Button>
      </form>
    </Box>
  );
};

export default CreateContact;
