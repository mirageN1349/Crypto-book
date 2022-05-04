import { ethers } from 'ethers';
import provider from './registerProvider';
import { Contact as ClassContact } from '../@types/Contact';

const abi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_owner',
        type: 'address',
      },
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
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'discord',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'github',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
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
  {
    inputs: [
      {
        internalType: 'string',
        name: '_discord',
        type: 'string',
      },
    ],
    name: 'setDiscord',
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
    ],
    name: 'setGithub',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

export function Contact(address: string): ClassContact {
  return new ethers.Contract(address, abi, provider) as ClassContact;
}
