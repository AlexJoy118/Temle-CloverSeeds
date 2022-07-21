import React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import pancakeLogo from "../../static/images/PancakeSwap.svg";
import poocoin from "../../static/images/poocoin.svg";

const MainTitle = styled("h1")({
  fontFamily: `Maven Pro, sans-serif`,
  fontStyle: `normal`,
  fontWeight: `800`,
  fontSize: `50px`,
  textTransform: "uppercase",
  color: `#FFFFFF`,
  "@media (max-width: 500px)": {
    fontSize: `24px`,
    paddingBottom: "10px",
  },
});
const Title = styled("h1")({
  fontFamily: `Maven Pro, sans-serif`,
  fontStyle: `normal`,
  fontWeight: `600`,
  fontSize: `32px`,
  textAlign: "center",
  textTransform: "uppercase",
  color: `#FFFFFF`,
  "@media (max-width: 500px)": {
    fontSize: `20px`,
  },
});
const Icon = styled("img")({
  width: "30px",
  height: "30px",
  '@media (max-width: 360px)': {
    width: "20px",
    height: "20px"
  }
});
const ButtonText = styled("span")({
  fontFamily: `Maven Pro, sans-serif`,
  fontStyle: `normal`,
  fontWeight: `600`,
  fontSize: `20px`,
  lineHeight: `28px`,
  textAlign: "center",
  textTransform: "capitalize",
  color: `#10241b;`,
  paddingLeft: "10px",
  '@media (max-width: 360px)': {
    fontSize: "16px"
  }
});

const Header = () => {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: "30px",
          "@media (max-width: 850px)": {
            flexDirection: "column",
          },
        }}
      >
        <MainTitle>MY NFT</MainTitle>
        <Box
          sx={{
            position: "absolute",
            left: "50%",
            transform: "translate(-50%, 0)",
            "@media (max-width: 850px)": {
              position: "unset",
              transform: "initial"
            },
          }}
        >
          <Title>BUY SEED$ ON</Title>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "20px",
          marginBottom: "40px",
          width: "100%",
          "@media (max-width: 768px)": {
            flexDirection: "column",
            justifyContent: "center",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            "@media (max-width: 540px)": {
              flexDirection: "column",
              width: "100%",
            },
          }}
        >
          <Button title="Pancakeswap" icon={pancakeLogo} link="https://pancake.kiemtienonline360.com/#/swap" />
          <Box
            sx={{
              fontFamily: `Maven Pro, sans-serif`,
              fontStyle: `normal`,
              fontWeight: `700`,
              fontSize: `26px`,
              lineHeight: `34px`,
              textAlign: "center",
              textTransform: "uppercase",
              color: `#FFFFFF`,
              paddingTop: "5px",
              marginX: "20px",
              "@media (max-width: 540px)": {
                paddingBottom: "12px",
              },
            }}
          >
            OR
          </Box>
          <Button title="Poocoin" icon={poocoin} link="https://poocoin.app/tokens/0x40b34cc972908060d6d527276e17c105d224559d" />
        </Box>
      </Box>
    </Box>
  );
};

export default Header;

const Button = ({ title, icon, link }) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#b5d449",
          width: "220px",
          paddingY: "15px",
          paddingX: "10px",
          borderRadius: "10px",
          cursor: "pointer",
          "@media (max-width: 540px)": {
            width: "100%",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignSelf: "center",
          }}
        >
          <Icon src={icon} alt="" />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignSelf: "center",
          }}
        >
          <ButtonText>{title}</ButtonText>
        </Box>
      </Box>
    </a>
  );
};
