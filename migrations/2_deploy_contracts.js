var Toilet = artifacts.require("Toilet");

module.exports = function(deployer) {
  deployer.deploy(Toilet, "0xDb6d458D9f5aF7fDBE41748c7FBF862543556985");
};
