import { ethers } from 'ethers';
import { ContactFactory } from '../@types/ContactFactory';
import provider from './registerProvider';

const abi = [
  {
    inputs: [
      {
        internalType: 'string',
        name: '_github',
        type: 'string',
      },
    ],
    name: 'createContact',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_github',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_discord',
        type: 'string',
      },
    ],
    name: 'createContact',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'ownerToContact',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

export async function createContactFactory(address: string): Promise<ContactFactory> {
  const factory = new ethers.Contract(address, abi, provider.getSigner()) as ContactFactory;
  return factory;
}
