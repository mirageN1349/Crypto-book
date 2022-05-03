import { Contacts } from '../components/types';
import { Contact } from './Contact';
import { createContactFactory } from './contactFactory';

export async function getContactsByAddress(address: string): Promise<Contacts> {
  const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS || '0xF9CAaCC170FE4023f99439f9d20Cf5adfa8c124D';

  try {
    const factory = await createContactFactory(contractAddress);
    const ownerAddress = await factory.ownerToContact(address);
    const contact = Contact(ownerAddress);
    const discord = await contact.discord();
    const github = await contact.github();
    return { discord, github };
  } catch (error) {
    console.error(error);
  }
  return { discord: '', github: '' };
}
