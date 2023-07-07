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
            (BigNumber.from(mintAmount), {
              value: ethers.utils.parseEther((0.02 * mintAmount).toString())
            })  ;
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
    <Flex justify="center" align="center" height="100vh" paddingBottom="150px">
      <Box width="120px">
        <div>
      <Text fontSize="48px" textShadow="0 5px #000000">RoboPunks</Text>
      <Text fontFamily="VT323" fontSize="30px" letterSpacing="-5.5%" textShadow="0 2px 2px #000000" >
        It's 2078. Can the RoboPunks NFT save humans from destructive rampant NFT speculation? Mint RoboPunks to find out.</Text>
      </div>

      {isConnected ? (
        <div className="">
                  <Flex className="">
                    <Button
                         backgroundColor="#D6517D"
                         borderRadius= "5px"
                         boxShadow="0px 2px 2px 1px #DFDFDF"
                         color="white"
                         cursor="pointer"
                         fontFamily="inherit"
                         padding="15px"
                         margin="0 15px"
                         onClick={handleDecrement}>-</Button>
                    <input
                         readOnly
                         backgroundColor="#D6517D"
                         borderRadius= "5px"
                         boxShadow="0px 2px 2px 1px #DFDFDF"
                         color="white"
                         cursor="pointer"
                         fontFamily="inherit"
                         padding="15px"
                         margin="0 15px"
                         type="number" value={mintAmount}/>
                    <button onClick={handleIncrement}>+</button>
                  </Flex>
                  <Button
                       backgroundColor="#D6517D"
                       borderRadius= "5px"
                       boxShadow="0px 2px 2px 1px #DFDFDF"
                       color="white"
                       cursor="pointer"
                       fontFamily="inherit"
                       padding="15px"
                       margin="0 15px"
                       onClick={handleMint}>Mint Now</Button>
        </div>
      ) : (
        <Text>You are not connected yet Connect to Metamask and mint</Text>
      )}
      </Box>
    </Flex> 
  )
}

export default MainMint