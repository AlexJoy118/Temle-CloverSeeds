import ButtonUnstyled from '@mui/base/ButtonUnstyled';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { styled } from '@mui/system';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import React, { useEffect, useState } from "react";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import Web3 from 'web3';
import web3Modal from "../../functions/Utility/web3Modal";
import Logo from "../../static/images/Anim.-Logo-Solo-Main-Image-Site-CS.gif";
import MetaMaskIcon from "../../static/images/metamask.svg";
import WalletIcon from "../../static/images/Picto-wallet.svg";
import { setCoinbaseAddressAction, setNetStatus, setWalletConnectStatusAction } from "../../store/actions";
import MobileMenu from "./MobileMenu";
import { initRateRewards } from '../../functions/Utility';

const Menu = ({ title }) => {
  const NetID = 0x61
  const dispatch = useDispatch();
  const connectStatus = useSelector((state) => state.isWalletConnect);
  const walletAddress = useSelector((state) => state.coinbaseAddress);
  const correctNet = useSelector((state) => state.isCorrectNet);
  const [activeLogOut, setActiveLogOut] = useState(false)
  const { ethereum } = window
  const isMobile = useMediaQuery('(max-width:1000px)');

  const LogoTitle = styled("span")({
    fontFamily: `Azonix`,
    fontSize: `30px`,
    textTransform: "uppercase",
    color: `white`
  });

  const ConnectButton = styled('button')({
    fontSize: "20px",
    color: "white",
    cursor: "pointer",
    fontFamily: "Maven Pro",
    textTransform: "uppercase",
  });

  const navigate = useNavigate();

  // Function to Connect Wallet
  const connectWallet = async () => {
    if (ethereum) {
      try {

        //  Web3Modal Connect
        const provider = await web3Modal.connect();
        //  Create Web3 instance
        const web3Object = new Web3(provider)

        const accounts = await web3Object.eth.getAccounts()
        const chainId = await web3Object.eth.net.getId()

        dispatch(setCoinbaseAddressAction(accounts[0]))
        dispatch(setWalletConnectStatusAction(true))
        dispatch(setNetStatus(chainId == NetID))

        provider.on("accountsChanged", (accounts) => {
          dispatch(setCoinbaseAddressAction(accounts[0]))
          navigate("");
        });

        provider.on("chainChanged", async (chainId) => {
          dispatch(setNetStatus(chainId == NetID))
        });
      } catch (e) {
        console.error(e)
        throw new Error("User denied wallet connection!")
      }
    } else {
      throw new Error("No web3 detected!")
    }
  }

  useEffect(async () => {
    await initRateRewards(dispatch);
    if (web3Modal.cachedProvider && !walletAddress) {
      await connectWallet()
    }
  }, [])

  const handleConnection = async () => {
    try {
      if (!connectStatus) {
        await web3Modal.clearCachedProvider()
        await connectWallet()
        alertify.success(String("Wallet Connected Successfully!"))
      } else {
        dispatch(setWalletConnectStatusAction(false))
        dispatch(setCoinbaseAddressAction(""))
        dispatch(setNetStatus(false))
        setActiveLogOut(false)
        localStorage.clear()
        alertify.success(String("Wallet Disconnected Successfully!"))
      }
    } catch (e) {
      alertify.error(String(e))
    }
  }

  const logOutActive = async () => {
    setActiveLogOut(!activeLogOut)
  }

  const switchNetwork = async () => {
    try {
      await window.ethereum
        .request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x61" }]
        })
    } catch (e) {
      alertify.error(String(e))
    }
  }

  return (
    <Box>
      {isMobile
        ? <MobileMenu 
            connectWallet={connectWallet} 
            logOutActive={logOutActive} 
            handleConnection={handleConnection} 
            switchNetwork={switchNetwork} 
            connectStatus={connectStatus}
            correctNet={correctNet} 
            activeLogOut={activeLogOut}
            walletAddress={walletAddress} />
        : <Box
          sx={{
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <Container maxWidth="xl">
            <Box
              sx={{
                position: "relative",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                minHeight: "100px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Link to="/">
                  <img src={Logo} width={60} height={60} alt="" />
                </Link>
                <Box
                  sx={{
                    paddingLeft: "20px",
                  }}
                >
                  <Link to="/">
                    <LogoTitle>Clover Seed$</LogoTitle>
                  </Link>
                </Box>
              </Box>
              {
                (title ? (
                  <Box>
                    <Link to="/">
                      <Box
                        sx={{
                          color: "#fff",
                          fontSize: "30px",
                          fontWeight: "bold",
                          fontFamily: "Maven Pro",
                          textTransform: "uppercase",
                          lineHeight: "30px",
                          borderRadius: "10px",
                          width: "250px",
                          textAlign: "center",
                          border: `2px solid #00B951`,
                          cursor: "pointer",
                          position: "absolute",
                          left: "50%",
                          top: "50%",
                          transform: "translate(-50%, -50%)"
                        }}
                      >
                        {title}
                      </Box>
                    </Link>
                  </Box>
                ) : null)
              }
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  backgroundColor: "#00AF5D",
                  borderRadius: "10px",
                  border: "2px solid #bcc722",
                  boxShadow: "0px 0px 7px #bcc722",
                  cursor: "pointer",
                  width: "300px",
                  position: "relative"
                }}
              >
                <Box
                  sx={{
                    marginLeft: "30px",
                    marginright: "0"
                  }}
                >
                  {!connectStatus
                    ? <img src={WalletIcon} width={30} height={25} alt="wallet icon" />
                    : <img src={MetaMaskIcon} width={30} height={25} alt="metamask icon" />
                  }
                </Box>
                <Box>
                  {connectStatus && !correctNet && (
                    <ButtonUnstyled onClick={switchNetwork} component={ConnectButton}>
                      Switch Network
                    </ButtonUnstyled>
                  )
                  }
                 {connectStatus && correctNet && (
                    <ButtonUnstyled onClick={logOutActive} component={ConnectButton}>
                      {walletAddress.substr(0, 5) + "........." + walletAddress.substr(-5)}
                    </ButtonUnstyled>
                  )
                  }
                  {
                    !connectStatus && (
                      <ButtonUnstyled onClick={handleConnection} component={ConnectButton}>
                        Connect Wallet
                      </ButtonUnstyled>
                    )
                  }
                </Box>
                {
                  connectStatus && correctNet && activeLogOut && (
                    <Box sx={{
                      background: "#fff",
                      position: "absolute",
                      top: "49px",
                      width: "100%",
                      padding: "10px",
                      borderRadius: "8px",
                      fontWeight: "600",
                      textAlign: "center",
                    }} onClick={handleConnection}>
                      Disconnect
                    </Box>
                  )
                }
              </Box>
            </Box>
          </Container>
        </Box >
      }
    </Box >
  );
};

export default Menu;
