pragma solidity ^0.4.23;

contract ERC721Interface {
    function ownerOf(uint256 assetId) public view returns (address);
    function transferFrom(address from, address to, uint256 assetId) public;
    function isApprovedFor(address _owner, uint256 _tokenId) public view returns (bool);
    function approveFor(address _caller, address _operator, uint _tokenId) public;
}

contract ERC20Interface {
  function totalSupply() public view returns (uint256);
  function balanceOf(address who) public view returns (uint256);
  function transfer(address to, uint256 value) public returns (bool);
  event Transfer(address indexed from, address indexed to, uint256 value);
}

contract Toilet{

  /**
  * @dev This function can be called to transfer an ERC721 token to this contract address
  */

  function transferERC721(address nonFungibleAddress, uint256 assetId) internal {
      ERC721Interface nonFungibleToken = ERC721Interface(nonFungibleAddress);
      nonFungibleToken.transferFrom(msg.sender, address(this), assetId);
  }

  /**
  * @dev This function can be called to transfer an ERC721 token to this contract address
  */
  function transferERC20(address fungibleAddress, uint256 value) internal {
      ERC20Interface fungibleToken = ERC20Interface(fungibleAddress);
      fungibleToken.transfer(address(this), value;
  }

}
