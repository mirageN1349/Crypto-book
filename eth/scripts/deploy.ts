import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contract with the account address:", deployer.address);

  const ContactFactory = await ethers.getContractFactory("ContactFactory");
  const contactFactory = await ContactFactory.deploy();

  await contactFactory.deployed();

  console.log("Greeter deployed to:", contactFactory.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
