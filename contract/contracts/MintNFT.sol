//SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

///@Dev - THis will import the contract that we will be using for minting
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
///@Dev This will grant the Owner only access to functions in this contract
import "@openzeppelin/contracts/access/Ownable.sol";

contract RoboPunksNFT is ERC721, Ownable {
    uint256 public mintPrice;
    uint256 public totalSupply;//Total number of nft a user wants to mint
    uint256 public maxSupply;//Maximum number of nft collection
    uint256 public maxPerWallet;//maximum number of wallet a user can mint
    bool public isPublicMintEnabled;// This will determine when users can mint
    string internal baseTokenUri;//This is critical when using something like Opensea. this will determine the url opensea can determine where the images are located
    address payable public withdrawWallet;//this wallet retrievss all the money that goes into the contract

    mapping(address => uint256) public walletMint;//This will keep track of all the addressess that has minted the nft

    constructor() payable ERC721('RobotPunks', 'RP' ){
        mintPrice = 0.02 ether;
        totalSupply = 0;
        maxSupply = 1000;
        maxPerWallet = 3;
        //Specify what the withrawWallet should be
    }

    function setIsPublicMintEnabled( bool _isPublicMintEnabled) external onlyOwner {
        isPublicMintEnabled = _isPublicMintEnabled;
    }

    function setBaseTokenUri(string calldata _baseTokenUri) external onlyOwner {
        baseTokenUri = _baseTokenUri;
    }

    function tokenUri(uint256 _tokenId) public view returns(string memory){
        require(_exists(_tokenId), 'Token does not exist');
        //AFTER THE URL HAS BEEN IDENTIFIED, WE GRA THE TOKEN ID AND PLACE T BEHIND THE URL AND ATTACHING .JSON TO THE END OF IT.
        //THIS ALLOWS OPENSEA URL TO GRAB EVERY SINGLE URL OF THE IMAGES
        return string(abi.encodePacked(baseTokenUri, Strings.toString(_tokenId), '.json'));
    }

    function withdraw() external onlyOwner{
        (bool success, ) = withdrawWallet.call{ value: address(this).balance}('');//<= THIS ALLOWS US TO WITHDRAW THE FUNDS
        require(success, 'withdraw failed');
    }
//PAYABLE IS A MODIFIER THAT REQUIRE A VALUE TRANSFER
    function mint(uint256 _quantity) public payable{
        require(isPublicMintEnabled, 'mint is not enabled');
        require(msg.value == _quantity, 'wrong mint value');
        require(totalSupply + _quantity < maxSupply, 'sold out');
        require(walletMint[msg.sender] + _quantity <= maxPerWallet, 'exceed maximum wallet');

        for(uint256 i = 0; i < _quantity; i++){
            uint256 newTokenId = totalSupply + 1;
            totalSupply++;
            _safeMint(msg.sender, newTokenId);
        }
    }

    function stake(){}
}