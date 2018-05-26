pragma solidity ^0.4.23;

 Transfer(address indexed from, address indexed to, uint256 value);
}

import 'openzeppelin-solidity/contracts/token/ERC721/ERC721Basic.sol';
import 'openzeppelin-solidity/contracts/token/ERC20/ERC20Basic.sol';

contract Toilet{

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
      fungibleToken.transfer(address(this), value;
  }

}
