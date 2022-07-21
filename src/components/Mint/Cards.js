import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import ProgresModal from "../Modals/ProgresModal";
import WinModal from "../Modals/WinModal";
import CLOVERFIELD from "../../static/images/FIELD_NFT.jpg";
import CLOVERYARD from "../../static/images/YARD_NFT.jpg";
import CLOVERPOT from "../../static/images/POT_NFT.jpg";
import { getMintedTokenURI } from "../../functions/Utility";
import { Paper } from "@mui/material";

const Title = styled("h1")({
  fontFamily: `Maven Pro, sans-serif`,
  fontStyle: `normal`,
  fontWeight: `700`,
  fontSize: `20px`,
  lineHeight: `30px`,
  textAlign: "center",
  textTransform: "uppercase",
  paddingBottom: "10px",
  color: `#FFFFFF`,
  '@media (max-width: 360px)': {
    fontSize: "16px"
  }
});

const useStyles = makeStyles((theme => ({
  card: {
    '@media (max-width: 650px)': {
      flexBasis: '100%',
      maxWidth: '100%',
    },
  },
  link: {
    backgroundColor: props => props.color,
    padding: "4px 10px",
    color: "#FFFFFF",
    fontSize: "18px",
    fontWeight: "600",
    borderRadius: "5px",
    margin: "0 3px",
    cursor: "pointer",
    '@media (max-width: 750px)': {
      fontSize: "12px",
    },
    '@media (max-width: 600px)': {
      fontSize: "16px",
    },
    '@media (max-width: 380px)': {
      fontSize: "7px"
    }
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "50px",
    color: props => props.color,
    border: props =>`3px solid ${props.color}`,
    boxShadow: props =>`0px 0px 40px ${props.color}`,
    borderRadius: "6px",
    fontSize: "22px",
    cursor: "pointer",
    textTransform: "uppercase",
    fontWeight: "700",
    fontFamily: `Maven Pro, sans-serif`,
    textDecoration: "none",
    marginBottom: "20px",
    marginTop: "10px",
    '@media (max-width: 360px)': {
      fontSize: "16px"
  }

  }
})))

const Cards = () => {

  const { seeds_controller } = window
  const connectStatus = useSelector((state) => state.isWalletConnect);
  // Progress Modal Handlers
  const [openProgressModal, setOpen] = useState(false);
  // WinModal Modal Handlers
  const [openWinModal, setopenWinModal] = useState(false);

  const [imageURI, setImageURI] = useState("");

  const rewardData = useSelector((state) => state.REWARD_RATES)

  const classes = useStyles();

  const data = [
    {
      picture: CLOVERFIELD,
      title: "Seed$ daily rewards",
      buttonText: "Mint Cloverfield",
      price: "10,000",
      color: "#c1d117",
      percentA: `${rewardData.fieldCarbon ? rewardData.fieldCarbon / 100 : 0}`,
      percentB: `${rewardData.fieldPearl ? rewardData.fieldPearl / 100 : 0}`,
      percentC: `${rewardData.fieldRuby ? rewardData.fieldRuby / 100 : 0}`,
      percentD: `${rewardData.fieldDiamond ? rewardData.fieldDiamond / 100 : 0}`,
    },
    {
      picture: CLOVERYARD,
      title: "Seed$ daily rewards",
      buttonText: "Mint Cloveryard",
      price: "1,000",
      color: "#00a65a",
      percentA: `${rewardData.yardCarbon ? rewardData.yardCarbon / 10 : 0}`,
      percentB: `${rewardData.yardPearl ? rewardData.yardPearl / 10 : 0}`,
      percentC: `${rewardData.yardRuby ? rewardData.yardRuby / 10 : 0}`,
      percentD: `${rewardData.yardDiamond ? rewardData.yardDiamond / 10 : 0}`,
    },
    {
      picture: CLOVERPOT,
      title: "Seed$ daily rewards",
      buttonText: "Mint CLOVERPOT",
      price: "100",
      color: "#3c6f66",
      percentA: `${rewardData.potCarbon ? rewardData.potCarbon : 0}`,
      percentB: `${rewardData.potPearl ? rewardData.potPearl : 0}`,
      percentC: `${rewardData.potRuby ? rewardData.potRuby : 0}`,
      percentD: `${rewardData.potDiamond ? rewardData.potDiamond : 0}`,
    },
  ];

  const handleNFTMint = async (type) => {
    if (connectStatus && type) {
      setOpen(true)
      let tx
      try {
        if (type.includes("Cloverfield")) {
          tx = await seeds_controller.buyCloverField()
        } else if (type.includes("Cloveryard")) {
          tx = await seeds_controller.buyCloverYard()
        } else {
          tx = await seeds_controller.buyCloverPot()
        }
        if (tx?.status) {
          const uri = await getMintedTokenURI()
          setImageURI(uri)
          setTimeout(progressCloseModal, 2000);
        } else {
          setTimeout(setOpen(false), 1000);
          alertify.error(String('User denied transaction signature.!'))
        }
      } catch (e) {
        setTimeout(setOpen(false), 1000);
        alertify.error(String(e))
      }
    } else {
      alertify.error(String('You need to connect your wallet before you try to mint!'))
    }
  };

  const progressCloseModal = () => {
    setOpen(false);
    handleClickWinModal();
    alertify.success(String('Transaction to mint Succeed!'))
  };

  const handleClickWinModal = () => {
    setopenWinModal(true);
  };

  const handleCloseWinModal = () => {
    setopenWinModal(false);
  };

  const PercentageButton = ({ color, percent, buttonText }) => {
    const classes = useStyles({ color });
    return (
      <a
        className={classes.link}
      >
        {percent}%
      </a>
    );
  };

  const Button = ({ color, title }) => {
    const classes = useStyles({ color });
    return (
      <a
        onClick={(e) => handleNFTMint(e.target.text)}
        className={classes.button}
        style = {{
          border: `3px solid ${color}`,
          boxShadow: `0px 0px 40px ${color}`,
        }}
      >
        {title}
      </a>
    );
  };

  return (
    <Box
      sx={{
        paddingTop: "50px",
        paddingBottom: "70px",
        marginBottom: "31px"
      }}
    >
      <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 8, md: 12 }}>
        {data.map((item, index) => {
          return (
            <Grid item xs={12} sm={6} lg={4} key={index} justifyContent="center" className={classes.card}>

              <Box
                sx={{
                  backgroundColor: "transparent",
                  borderRadius: "8px",
                  border: `3px solid ${item.color}`,
                  boxShadow: `0px 0px 16px ${item.color}`,
                  paddingX: "20px",
                  paddingTop: "30px"
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    width: "160px",
                    height: "165px",
                    marginX: "auto",
                    marginBottom: "10px",
                    alignItems: "flex-start",
                    '@media (max-width: 360px)': {
                      width: "100px",
                      height: "100px"
                    }
                  }}
                >
                  <img src={item.picture} alt="" style={{width: "100%", height: "100%"}} />
                </Box>
                <Box>
                  <Title>{item.title} </Title>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "20px",
                  }}
                >
                  <PercentageButton
                    buttonText={item.buttonText}
                    color={item.color}
                    percent={item.percentA}
                  />
                  <PercentageButton
                    buttonText={item.buttonText}
                    color={item.color}
                    percent={item.percentB}
                  />
                  <PercentageButton
                    buttonText={item.buttonText}
                    color={item.color}
                    percent={item.percentC}
                  />
                  <PercentageButton
                    buttonText={item.buttonText}
                    color={item.color}
                    percent={item.percentD}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    title={item.buttonText}
                    color={item.color}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    fontFamily: `Maven Pro, sans-serif`,
                    fontStyle: `normal`,
                    fontWeight: `700`,
                    fontSize: `20px`,
                    lineHeight: `24px`,
                    textAlign: "center",
                    textTransform: "uppercase",
                    paddingY: "5px",
                    color: `#FFFFFF`,
                    marginY: "5px",
                    '@media (max-width: 360px)': {
                      fontSize: "16px"
                    }
                  }}
                >
                  {item.price} SEED$
                </Box>
              </Box>
            </Grid>
          );
        })}
      </Grid>
      <ProgresModal
        openProgressModal={openProgressModal}
        progressCloseModal={progressCloseModal}
      />
      <WinModal
        openWinModal={openWinModal}
        handleCloseWinModal={handleCloseWinModal}
        title="Mint In Progress..."
        image={imageURI}
      />
    </Box>
  );
};

export default Cards;
