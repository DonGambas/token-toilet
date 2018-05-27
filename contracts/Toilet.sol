pragma solidity ^0.4.23;

//import "zos-lib/contracts/migrations/Migratable.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "openzeppelin-solidity/contracts/ReentrancyGuard.sol";

contract ERC20Interface {
    function balanceOf(address who) public view returns (uint256);
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool);
    function transfer(address _to, uint256 _value) public returns (bool) ;
}

contract ERC721Interface {
    function transferFrom(address _from, address _to, uint256 _tokenId) public;
    function ownerOf(uint256 _tokenId) public view returns (address _owner);
    function transfer(address _to, uint256 _tokenId) external;
}

contract Toilet is ReentrancyGuard, Ownable {

  using SafeMath for uint256;

  uint256 public x;
  uint NONFUNGIBLE_PRIZE_COUNT = 1; //2
  uint FUNGIBLE_PRIZE_COUNT = 1; //1
  uint256 public NFTAmount = 0;
  uint256 public FTAmount = 0;
  uint256 BASE_PRICE = 5000000000000000;

  address serverAddress;
  
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

  event LootBoxOpenNFT(
    uint256 id,
    address contractAddress,
    uint256 value,
    address receiver,
    uint256 timestamp
  );

   event LootBoxOpenFT(
    uint256 id,
    address contractAddress,
    uint256 value,
    address receiver,
    uint256 timestamp
  );

   function Toilet (address sAddr) public {
      serverAddress = sAddr;
   }
   

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
  function transferERC721(address owner, address nonFungibleAddress, uint256 assetId) external {

    ERC721Interface nonFungibleToken = ERC721Interface(nonFungibleAddress);    
    nonFungibleToken.transferFrom(owner, address(this), assetId);
    require (nonFungibleToken.ownerOf(assetId) == address(this));

    nonFungibleOwnings[nonFungibleAddress].push(assetId);
    nonFungibleOwningKeys.push(nonFungibleAddress);

    NFTAmount++;

    emit NonFungibleTokenDeposit(msg.sender, nonFungibleAddress, assetId);
  }

  /**
  * @dev This function can be called to transfer an ERC721 token to this contract address
  */
  function transferERC20(address owner, address fungibleAddress, uint256 value) external {

    ERC20Interface fungibleToken = ERC20Interface(fungibleAddress); 
    uint256 oldBalance = fungibleToken.balanceOf(address(this));   
    fungibleToken.transferFrom(owner, address(this), value);
    require (fungibleToken.balanceOf(address(this)) > oldBalance);
    
    fungibleOwnings[fungibleAddress] += value;
    fungibleOwningKeys.push(fungibleAddress);

    FTAmount+=value;

    emit FungibleTokenDeposit(msg.sender, fungibleAddress, value);
  }

  function _fungibleSend(address addr, uint256 quantity, address receiver) internal returns(Prize p) {

    fungibleOwnings[addr] = fungibleOwnings[addr].sub(quantity);

    ERC20Interface i = ERC20Interface(addr);
    uint256 receiverBalance = i.balanceOf(receiver);
    i.transfer(receiver, quantity);
    require (i.balanceOf(receiver) > receiverBalance);
    
    p = Prize({
      contractAddress: addr,
      value: quantity
    });

    FTAmount-=quantity;

  }
  

  function _nonFungibleSend(address addr, address receiver) internal returns(Prize p) {

    uint256[] storage assetIds = nonFungibleOwnings[addr];

    uint256 assetId = assetIds[0];
    assetIds[0] = assetIds[assetIds.length - 1];
    assetIds.length--;

    ERC721Interface i = ERC721Interface(addr);
    i.transfer(receiver, assetId);
    
    require (i.ownerOf(assetId) == receiver);
    
    p = Prize({
      contractAddress: addr,
      value: assetId
    });

    NFTAmount--;
  
  }

  function getLoot() external nonReentrant payable{

    require (NFTAmount > 0);
    require (FTAmount > 0);
    require (msg.value >= BASE_PRICE);
    
    
    uint256 boxId = uint256(keccak256(
      block.timestamp,
      msg.sender
    ));

    Prize memory prize;

    uint256 r = _random() % 2;
    uint256 r2;
    uint256 position;
    bool flag;

    if(r == 0){
      r2 = _random() % nonFungibleOwningKeys.length;
      position = r2;
      flag = false;
      while(!flag){
        address assetAddress = nonFungibleOwningKeys[position % nonFungibleOwningKeys.length];
        flag = nonFungibleOwnings[assetAddress].length != 0;
        position++;
      }
      prize = _nonFungibleSend(assetAddress, msg.sender);
      emit LootBoxOpenNFT(boxId, prize.contractAddress, prize.value, msg.sender, now);

    } else {
      
      r2 = _random() % fungibleOwningKeys.length;
      position = r2;
      flag = false;
      while(!flag){
        address tokenAddress = fungibleOwningKeys[position % fungibleOwningKeys.length];
        uint256 balance = fungibleOwnings[tokenAddress];
        uint256 quantity = (_random() % balance) + 1;

        flag = fungibleOwnings[tokenAddress] > 0;
        position++;
      }
      prize = _fungibleSend(tokenAddress, quantity, msg.sender);
      emit LootBoxOpenFT(boxId, prize.contractAddress, prize.value, msg.sender, now);

    }
    
    serverAddress.transfer(msg.value);
    //chupar los dai

  }

  /*
  function withdrawEverything () external onlyOwner {
    
    for(uint i = 0; i < nonFungibleOwningKeys.length; i++){
      uint256[] memory arr = nonFungibleOwnings[nonFungibleOwningKeys[i]];
      for (uint j = 0; j < arr.length; j++){
        ERC721Interface t20 = ERC721Interface(nonFungibleOwningKeys[i]);
        t20.transfer(owner, arr[j]);
      }
    }

    for(i = 0; i < fungibleOwningKeys.length; i++){
      ERC20Interface t721 = ERC20Interface(fungibleOwningKeys[i]);
      t721.transfer(owner, fungibleOwnings[fungibleOwningKeys[i]]);
    }

  }
  */  


}
