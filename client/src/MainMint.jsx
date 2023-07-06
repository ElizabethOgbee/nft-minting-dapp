import { ethers, BigNumber } from 'ethers'
import { useState} from 'react'
import { Box, Button, Flex, Input, Text} from '@chakra-ui/react'

import roboPunksNFT from './RoboPunksNFT.json'

const roboPunksNFTAddress = "0x6369D66Daf2d8cc423d829AB76ec337B8fCDfC72" 

function MainMint({accounts, setAccounts}) {
    const [mintAmount, setMintAmount] = useState(1);
    const isConnected = Boolean(accounts[0]);
    // Overall, this code checks if the Ethereum browser extension is available and, if so, sets up a provider, signer, and contract objects to interact with the Ethereum network 
    async function handleMint() {
       if(window.ethereum){
        const provider = new ethers.providers.web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          roboPunksNFTAddress,
          roboPunksNFT.abi,
          signer
          );
          // we will try and catch the code above incase it fails
          try{
            const response = await contract.mint
            (BigNumber.from(mintAmount));
            console.log("response:", response);
          } catch(err){
            console.error("error:", err);
          }
        } 
      }

          function handleDecrement(){
            if(MainMint <= 1) return;
            setMintAmount(mintAmount - 1);
          }

          function handleIncrement(){
            if(MainMint >= 1) return;
            setMintAmount(mintAmount + 1);
          }

  return (
    <div>
      <h1>RoboPunks</h1>
      <p>It's 2078. Can the RoboPunks NFT save humans from destructive rampant NFT speculation? Mint RoboPunks to find out.</p>
      {isConnected ? (
        <div className="">
                  <div className="">
                    <button onClick={handleDecrement}>-</button>
                    <input type="number" value={mintAmount}/>
                    <button onClick={handleIncrement}>+</button>
                  </div>
                  <button onClick={handleMint}>Mint Now</button>
        </div>
      ) : (
        <p>You are not connected yet Connect to Metamask and mint</p>
      )}
    </div> 
  )
}

export default MainMint