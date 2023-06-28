const Config = require("./config");
const { ethers, hardhatArguments } = require("hardhat");
async function main() {
  await Config.initConfig();
  const network = hardhatArguments.network ? hardhatArguments.network : "dev";
  const [deployer] = await ethers.getSigners();

  // // CHIEN Deploy
  // console.log("deploy from address: ", deployer.address);
  // const chien = await ethers.deployContract("CHIEN");
  // const chienAddress = await chien.getAddress();
  // console.log("CHIEN address:", chienAddress);
  // Config.setConfig(network + ".CHIEN", chienAddress);

  // Faucet Deploy
  console.log("deploy from address: ", deployer.address);
  const Faucet = await ethers.deployContract("Faucet", [
    "0xe3343755fFfA51705e60055FEC7776006e5FFCC8",
  ]);
  const FaucetAddress = await Faucet.getAddress();
  console.log("Faucet address:", FaucetAddress);
  Config.setConfig(network + ".Faucet", FaucetAddress);

  await Config.updateConfig();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
