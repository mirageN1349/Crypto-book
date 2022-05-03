import { ethers } from 'ethers';

let provider: ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider;

if (typeof window !== 'undefined' && typeof (window as any).ethereum !== 'undefined') {
  provider = new ethers.providers.Web3Provider((window as any).ethereum);
} else {
  provider = new ethers.providers.JsonRpcProvider();
}

export default provider;
