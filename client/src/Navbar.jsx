import React from 'react'
import { Box, Button, Flex, Image, Link, Spacer} from '@chakra-ui/react'
import Twitter from './assets/social-media-icons/twitter_32x32.png'
import FaceBook from './assets/social-media-icons/facebook_32x32.png'
import Email from './assets/social-media-icons/email_32x32.png'

function Navbar({accounts, setAccounts}) {
    //THIS WILL DICTECT WHEN WE ARE CONNECTED AND WHEN WE ARE NOT CONNEDTED
  const  isConnected = Boolean(accounts[0]);

//   this code checks for the presence of the Ethereum browser extension, requests the user's Ethereum accounts if it is available, and stores the retrieved account information for further use in the accounts variable.
  async function connectAccount(){
    if(window.ethereum){
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts"
        });
        setAccounts(accounts);
    }
  }
  return (
    <Flex justify="space-between" align="center" padding="30px">
        {/* Left side - Social Media Icons */}
        <Flex justify="space-between" width="40%" padding='0 75px'>
          <Link href="https://www.facebook.com">
            <Image src={FaceBook} boxSize='42px' margin='0 15px' />
          </Link>
          <Link href="https://www.twitter.com">
            <Image src={Twitter} boxSize='42px' margin='0 15px' />
          </Link>
          <Link href="https://www.gmail.com">
            <Image src={Email} boxSize='42px' margin='0 15px' />
          </Link>
        </Flex>

        {/* Right Side - Sections and Connect */}
        <Flex justify="space-around" align="center" width="40%" padding='30px'>
        <Box className="">About</Box>
        <Spacer />
        <Box >Mint</Box>
        <Spacer />
        <Box>Team</Box>
        <Spacer />

          {/* Connected */}
          {isConnected ? (
       <Box margin="0 15px" >Wallet is Connected</Box>
  ) : (
    <Button
     backgroundColor="#D6517D"
     borderRadius= "5px"
     boxShadow="0px 2px 2px 1px #DFDFDF"
     color="white"
     cursor="pointer"
     fontFamily="inherit"
     padding="15px"
     margin="0 15px"
      onClick={connectAccount}>
          Connect Wallet
          </Button>
  )}

    </Flex>
    </Flex>
  )
}

export default Navbar