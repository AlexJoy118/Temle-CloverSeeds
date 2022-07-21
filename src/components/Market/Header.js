import React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import NFTrade from "../../static/images/NFTrade.png";
import Tofnft from "../../static/images/TofuNFT.png";

const MainTitle = styled("h1")({
  fontFamily: `Maven Pro, sans-serif`,
  fontStyle: `normal`,
  fontWeight: `800`,
  fontSize: `48px`,
  textTransform: "uppercase",
  marginBottom: "60px",
  color: `#FFFFFF`,
  "@media (max-width: 768px)": {
    fontSize: `32px`,
    paddingBottom: "10px",
  },
});
const Icon = styled("img")({
  width: "300px",
  height: "220px",
  borderRadius: "10px"
});

const Header = () => {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: "40px",
          "@media (max-width: 120px)": {
            flexDirection: "column",
          },
        }}
      >
        <MainTitle>MarketPlace</MainTitle>
       
      </Box>
      <Box
        sx={{
          marginBottom: "100px"
        }}
        >

        </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "10px",
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
            "@media (max-width: 725px)": {
              flexDirection: "column",
              width: "100%",
            },
          }}
        >
          <Button icon={NFTrade} link="https://nftrade.com/" />
          <Box
            sx={{
              fontFamily: `Maven Pro, sans-serif`,
              fontStyle: `normal`,
              fontWeight: `700`,
              fontSize: `36px`,
              lineHeight: `34px`,
              textAlign: "center",
              textTransform: "uppercase",
              color: `#FFFFFF`,
              alignItems: "center",
              marginTop: "90px",
              marginX: "30px",
              marginBottom: "160px",
              "@media (max-width: 540px)": {
                paddingBottom: "12px",
              },
            }}
          >
            OR
          </Box>
          <Button icon={Tofnft} link="https://tofunft.com/" />
          <Box
            sx={{
              paddingY: "30px",
              marginY: "181px",
            }}
          >

          </Box>
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
          borderRadius: "10px",
          cursor: "pointer",
          "@media (max-width: 540px)": {
            width: "100%",
          },
        }}
      >
        <Icon src={icon} alt="" />
      </Box>
    </a>
  );
};
