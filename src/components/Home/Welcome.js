import { Paper } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import React from "react";
import { Link } from "react-router-dom";
import Farm from "../../static/images/farm.svg";
import Marketplace from "../../static/images/marketplace.svg";
import SeedDaap from "../../static/images/sedddAPP.svg";
import Button from "../Button";
const Title = styled("h1")({
  fontFamily: `Maven Pro, sans-serif`,
  fontStyle: `normal`,
  fontWeight: `600`,
  fontSize: `42px`,
  lineHeight: `56px`,
  textAlign: "center",
  textTransform: "uppercase",
  paddingTop: "30px",
  paddingBottom: "20px",
  color: `#FFFFFF`,
  "& > span": {
    color: `#B3E200`,
  },
  "@media (max-width: 768px)": {
    fontSize: `24px`,
    lineHeight: `30px`,
  },
});
const TipText = styled("h1")({
  fontFamily: `Maven Pro, sans-serif`,
  fontStyle: `normal`,
  fontWeight: `700`,
  fontSize: `24px`,
  lineHeight: `24px`,
  textAlign: "center",
  textTransform: "uppercase",
  paddingTop: "12px",
  "@media (max-width: 360px)": {
    fontSize: "18px"
  }
});
const WhitePaperBtn = styled("button")({
  fontFamily: `Maven Pro, sans-serif`,
  fontStyle: `normal`,
  fontWeight: `600`,
  fontSize: `22px`,
  lineHeight: `30px`,
  textAlign: "center",
  textTransform: "uppercase",
  border: "3px solid #00a65a",
  color: `#FFFFFF`,
  backgroundColor: "transparent",
  padding: "10px 40px",
  display: "block",
  borderRadius: "8px",
  cursor: "pointer"
});
const Welcome = () => {
  return (
    <Box>
      <Title>
        Welcome to <span>CLOVER SEED$</span>
      </Title>
      <Box>
        <Grid container spacing={8}>
          {data.map((item, index) => {
            return (
              <Grid item xs={12} sm={112} md={6} lg={4} key={index}>
                <Paper sx={{
                  height: "100%", background: "transparent", border: `3px solid ${item.color}`,
                  boxShadow: `0px 0px 16px ${item.color}`,
                }}>
                  <div className="box-card">
                    <div className="card-img">
                      <img src={item.picture} alt="" />
                    </div>
                    <div className="card-content">
                      <Button
                        title={item.buttonText}
                        backgroundColor={item.color}
                        url={item.url}
                      />
                      <TipText
                        sx={{
                          color: item.color,
                          padding: "15px 0 13px 0",
                          height: "12px"
                        }}
                      >
                        {item?.title}
                      </TipText>
                    </div>
                  </div>

                </Paper>
                {/* <Box className="box-card"
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      maxWidth: "35%",
                      // height: "180px",
                      marginX: "auto",
                      marginTop: "20px",
                      marginBottom: "80px",
                      alignItems: "center",
                    }}
                  >
                    <img src={item.picture} alt="" />
                  </Box>
                  <Box>
                    <Button
                      title={item.buttonText}
                      backgroundColor={item.color}
                      url={item.url}
                    />
                    <TipText
                      sx={{
                        color: item.color,
                        height: "20px",
                      }}
                    >
                      {item.title}
                    </TipText>
                  </Box>
                </Box> */}
              </Grid>
            );
          })}
        </Grid>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "40px",
          }}
        >
          <Link to="/whitepaper">
            <WhitePaperBtn>WHITEPAPER</WhitePaperBtn>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Welcome;

const data = [
  {
    picture: SeedDaap,
    title: "(mint)",
    buttonText: "My NFT",
    url: "/my-nft",
    color: "#c1d117",
  },
  {
    picture: Farm,
    title: "(stake & earn)",
    buttonText: "My LAND",
    url: "/my-land",
    color: "#00a65a",
  },
  {
    picture: Marketplace,
    title: "",
    buttonText: "Marketplace",
    url: "/marketplace",
    color: "#3c6f66",
  },
];
