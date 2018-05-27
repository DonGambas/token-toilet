var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "future obtain tribe answer soft surround inherit quote polar dilemma slim slush";
module.exports = {
  migrations_directory: "./migrations",
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/9ahTcTztfBuarmkk6TXx")
      },
      network_id: 4,
    },
    mainnet: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://mainnet.infura.io/9ahTcTztfBuarmkk6TXx")
      },
      network_id: 1,
    }
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 500
    }
  } 
};
