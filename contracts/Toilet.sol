pragma solidity ^0.4.23;

//import "zos-lib/contracts/migrations/Migratable.sol";
//import "zeppelin-solidity/contracts/ownership/Ownable.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "openzeppelin-solidity/contracts/ReentrancyGuard.sol";

contract ERC20Interface {
    function balanceOf(address who) public view returns (uint256);
    function transferFrom(address from, address to, uint256 value) public returns (bool);
}

contract ERC721Interface {
    function transferFrom(address _from, address _to, uint256 _tokenId) public;
    function ownerOf(uint256 _tokenId) public view returns (address _owner);
}

contract Toilet {

  using SafeMath for uint256;
  
  uint256 public x;
  uint NONFUNGIBLE_PRIZE_COUNT = 2;
  uint FUNGIBLE_PRIZE_COUNT = 1;

  struct Prize {
    address contractAddress;
    uint256 value;
  }

  mapping (address => uint256[]) public nonFungibleOwnings;
  mapping (address => uint256) public fungibleOwnings;
  address[] public nonFungibleOwningKeys;
  address[] public fungibleOwningKeys;

  event FungibleTokenDeposit(address sender, address tokenContract, uint256 value);
  event NonFungibleTokenDeposit(address sender, address tokenContract, uint256 tokenId);

  event LootBoxOpen(
    bytes32 id,
    Prize[3] prizes
  );

  /**
  * @dev initialize function for zeppelin os
  
  function initialize(uint256 _x) isInitializer("Toilet", "0") public {
    x = _x;
  }
  */

  /**
  * @dev This function returns a random number depending on block timestamp and block difficulty
  */
  function _random() internal view returns (uint256) {
    return uint256(keccak256(block.timestamp, block.difficulty));
  }

    /**
  * @dev This function can be called to transfer an ERC721 token to this contract address
  */
  function transferERC721(address nonFungibleAddress, uint256 assetId) external {
      
    ERC721Interface nonFungibleToken = ERC721Interface(nonFungibleAddress);
    require (nonFungibleToken.ownerOf(assetId) == msg.sender);
    nonFungibleToken.transferFrom(msg.sender, address(this), assetId);
    
    nonFungibleOwnings[nonFungibleAddress].push(assetId);
    nonFungibleOwningKeys.push(nonFungibleAddress);

    emit NonFungibleTokenDeposit(msg.sender, nonFungibleAddress, assetId);
  }

  /**
  * @dev This function can be called to transfer an ERC721 token to this contract address
  */
  function transferERC20(address fungibleAddress, uint256 value) external {

    ERC20Interface fungibleToken = ERC20Interface(fungibleAddress);
    require (fungibleToken.balanceOf(msg.sender) >= value);
    fungibleToken.transferFrom(msg.sender, address(this), value);
    
    fungibleOwnings[fungibleAddress] = value;
    fungibleOwningKeys.push(fungibleAddress);

    emit FungibleTokenDeposit(msg.sender, fungibleAddress, value);
  }

  function _fungibleSend() internal returns(Prize p) {
    
    address tokenAddress = fungibleOwningKeys[_random() % fungibleOwningKeys.length];
    uint256 balance = fungibleOwnings[tokenAddress];
    require (balance > 0);
    
    uint256 quantity = _random() % balance;
    fungibleOwnings[tokenAddress].sub(quantity);

    ERC20Interface(tokenAddress).transferFrom(address(this), msg.sender, quantity);

    p = Prize({
      contractAddress: tokenAddress,
      value: quantity
    });

  }

  function _nonFungibleSend() internal returns(Prize p) {
    
    address assetAddress = nonFungibleOwningKeys[_random() % nonFungibleOwningKeys.length];
    uint256[] storage assetIds = nonFungibleOwnings[assetAddress];
    require (assetIds.length > 0);
    
    uint256 assetId = assetIds[0];
    assetIds[0] = assetIds[assetIds.length - 1];
    assetIds.length--;

    ERC721Interface(assetAddress).transferFrom(address(this), msg.sender, assetId);

    p = Prize({
      contractAddress: assetAddress,
      value: assetId
    });

  }


  //nonreentran openzepplin 
  function getLoot() external {

    bytes32 boxId = keccak256(
      block.timestamp, 
      msg.sender
    );

    Prize[3] memory prizes;
    uint8 counter = 0;

    for (uint i = 0; i < NONFUNGIBLE_PRIZE_COUNT; i++) {
      prizes[counter++] = _nonFungibleSend();
    }

    for (i = 0; i < FUNGIBLE_PRIZE_COUNT; i++) {
      prizes[counter++] = _fungibleSend();
    }

    emit LootBoxOpen(boxId, prizes); 
  }

}
