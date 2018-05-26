pragma solidity ^0.4.23;

import "zos-lib/contracts/migrations/Migratable.sol";
import 'openzeppelin-solidity/contracts/token/ERC721/ERC721Basic.sol';
import 'openzeppelin-solidity/contracts/token/ERC20/ERC20Basic.sol';

contract Toilet is Migratable{

  uint256 public x;

  /**
  * @dev initialize function for zeppelin os
  */

  function initialize(uint256 _x) isInitializer("Toilet", "0") public {
    x = _x;
  }

  /**
  * @dev This function can be called to transfer an ERC721 token to this contract address
  */
  function transferERC721(address nonFungibleAddress, uint256 assetId) public {
      ERC721Basic nonFungibleToken = ERC721Basic(nonFungibleAddress);
      require(nonFungibleToken.ownerOf(assetId) == msg.sender);
      nonFungibleToken.transferFrom(msg.sender, address(this), assetId);
      //write asset to asset registry
  }

  /**
  * @dev This function can be called to transfer an ERC721 token to this contract address
  */
  function transferERC20(address fungibleAddress, uint256 value) public {
      ERC20Basic fungibleToken = ERC20Basic(fungibleAddress);
      require(fungibleToken.balanceOf(msg.sender) >= value);
      fungibleToken.transfer(address(this), value);
      //write asset to asset registry
  }

  function getSurprise() public{
    //get interface to dai contract
    //check tht user balance is more than 5
    //transfer 5 dai to this contracts
    //select random asset in contract and transfer to user
  }

}
