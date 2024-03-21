require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config()

const alchemy_key = process.env.ALCHEMY_URL;
const pkey = process.env.PRIVATE_KEY;


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    sepolia: {
      url: alchemy_key ,
      accounts: [pkey],

    }
  }
}
