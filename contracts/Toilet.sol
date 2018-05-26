pragma solidity ^0.4.23;

import "zos-lib/contracts/migrations/Migratable.sol";
import 'openzeppelin-solidity/contracts/token/ERC721/ERC721Basic.sol';
import 'openzeppelin-solidity/contracts/token/ERC20/ERC20Basic.sol';

contract Toilet is Migratable{

  uint256 public x;

  function initialize(uint256 _x) isInitializer("Toilet", "0") public {
    x = _x;
  }

  /**
  * @dev This function can be called to transfer an ERC721 token to this contract address
  */
  function transferERC721(address nonFungibleAddress, uint256 assetId) internal {
      ERC721Basic nonFungibleToken = ERC721Basic(nonFungibleAddress);
      nonFungibleToken.transferFrom(msg.sender, address(this), assetId);
  }

  /**
  * @dev This function can be called to transfer an ERC721 token to this contract address
  */
  function transferERC20(address fungibleAddress, uint256 value) internal {
      ERC20Basic fungibleToken = ERC20Basic(fungibleAddress);
      fungibleToken.transfer(address(this), value);
  }

}
