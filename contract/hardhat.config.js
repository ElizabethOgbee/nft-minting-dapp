require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-etherscan");
const dotenv = require("dotenv");

dotenv.config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    goerli: {
      url: process.env.ROBOPUNKNFT_RPC_URL,
      accounts: [process.env.METAMASK_PRIVATE_KEY]
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  }
};
