import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getCoinbase } from "../../functions/Setup";
import { getStatusInfos, getTokenInfos, stakeFunc } from "../../functions/Utility";
import ProgresModal from "../Modals/ProgresModal";


const Title = styled("h1")({
  fontFamily: `Maven Pro, sans-serif`,
  fontStyle: `normal`,
  fontWeight: `700`,
  fontSize: `28px`,
  lineHeight: `30px`,
  textAlign: "center",
  textTransform: "uppercase",
  color: `#FFFFFF`,
  '@media (max-width: 450px)': {
    fontSize: "20px"
  }
});
const LuckyImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "fill",
});
const StatTitle = styled("h1")({
  fontFamily: `Maven Pro, sans-serif`,
  fontStyle: `normal`,
  fontWeight: `700`,
  fontSize: `28px`,
  lineHeight: `30px`,
  textAlign: "center",
  textTransform: "uppercase",
  color: `#c1d117`,
  paddingBottom: "18px",
});
const UnStake = ({ onClickStakeState = () => { }, stakeNft = false, onClick = () => { } }) => {

  let data = []
  let status = []
  const [Landdata, setLandData] = useState([]);
  const [finishLoading, setFinishLoading] = useState(false);
  const [statsData, setStatsData] = useState([]);
  const [openProgressModal, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const walletAddress = useSelector((state) => state.coinbaseAddress);
  const [selected, setSelected] = useState({})
  const rewardData = useSelector((state) => state.REWARD_RATES)
  const dispatch = useDispatch()

  let address = walletAddress

  const stake = async () => {
    try {
      setTitle("Staking Lands...")
      setOpen(true)
      const selectedIds = Object.keys(selected).reduce((ret, cur) => {
        if (selected?.[cur]) {
          return [...(ret ?? []), cur]
        }
        return ret
      }, [])
      await stakeFunc(selectedIds)
      onClickStakeState()
      initData()
    } catch (e) {
      alertify.error(String(e))
    }
  }

  const changeState = (tokenId) => {
    setSelected((s = {}) => ({ ...(s ?? {}), [tokenId]: !s?.[tokenId] }))
  }

  const initData = async () => {
    try {
      if (!address) {
        address = await getCoinbase();
      }
      data = await getTokenInfos(address, false, dispatch, rewardData);
      setLandData(s => data);
      status = await getStatusInfos();
      setFinishLoading(true);
      setStatsData(s => status)
      setTimeout(progressCloseModal, 2000);
    } catch (e) {
      setTimeout(setOpen(false), 1000);
      alertify.error(String(e))
    }
  }

  useEffect(() => {
    if (walletAddress)  {
      setTitle("Loading Unstaked Lands...")
      setOpen(true)
      initData()
    } else {
      alertify.error(String("Connect Wallet!"))
    }
    
  }, [walletAddress]);

  useEffect(async () => {
    if (stakeNft) {
      stake()
      onClick({ stakeNft: false })
    }
  }, [stakeNft])

  const progressCloseModal = () => {
    setOpen(false);
    alertify.success(String('All unstaked tokens are imported!'))
  };

  return (
    <Box
      sx={{
        paddingBottom: "0px",
        // marginRight: "-70px",
        // marginLeft: "-30px",
        paddingTop: "20px"
      }}
    >
      <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
        {Landdata.map((item, index) => {
          return (
            <Grid item xs={12} sm={6} lg={3} key={index}>
              <Box
                sx={{
                  backgroundColor: "transparent",
                  borderRadius: "8px",
                  border: `3px solid ${item.color}`,
                  boxShadow: `0px 0px 16px ${item.color}`,
                  paddingTop: "20px",
                  paddingX: "10px",
                  marginX: "10px",
                  marginBottom: "29px",
                  overflowY: "auto",
                  height: "600px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    paddingBottom: "10px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignSelf: "center",
                      paddingRight: "14px",
                    }}
                  >
                    <Title>{item.title}</Title>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignSelf: "center",
                    }}
                  >
                    <Box
                      sx={{
                        backgroundColor: item.color,
                        paddingX: "12px",
                        paddingY: "4px",
                        color: "#FFFFFF",
                        fontSize: "22px",
                        fontWeight: "700",
                        borderRadius: "5px",
                      }}
                    >
                      {item.quant}
                    </Box>
                  </Box>
                </Box>
                <Grid
                  container
                  rowSpacing={3}
                  columnSpacing={{ xs: 1, sm: 2, md: 1 }}
                >
                  {item.data.map((itm, index) => {
                    const isActive = Boolean(selected?.[itm?.tokenId])
                    return (
                      <Grid item xs={6} key={index}>
                        <Box
                          sx={{
                            border: `2px solid ${isActive ? 'red' : item.color}`,
                            width: "90%",
                            height: "70%",
                            borderRadius: "8px",
                            overflow: "hidden",
                            marginBottom: "10px",
                          }}
                          onClick={() => changeState(itm.tokenId)}
                        >
                          <LuckyImage src={itm.picture} alt="" />
                        </Box>
                        <Box
                          sx={{
                            border: `2px solid ${item.color}`,
                            width: "90%",
                            borderRadius: "8px",
                            color: "#FFFFFF",
                            fontSize: "10px",
                            lineHeight: "15px",
                            fontWeight: "800",
                            paddingX: "5px",
                            paddingY: "5px",
                            height: "42px",
                            textAlign: "center",
                            overflow: "hidden",
                          }}
                        >
                          {itm.price1}
                          <br />
                          {itm.price2}
                        </Box>
                      </Grid>
                    );
                  })}
                </Grid>
              </Box>
            </Grid>
          );
        })}
        {finishLoading && (
          <Grid item xs={12} sm={6} lg={3}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box>
                <Box
                  sx={{
                    backgroundColor: "#10241b",
                    paddingX: "15px",
                    paddingTop: "30px",
                    paddingBottom: "15px",
                  }}
                >
                  <StatTitle>Clover Stats</StatTitle>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      paddingBottom: "10px",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                      }}
                    >
                      <Box
                        sx={{
                          color: "#ffffff",
                          paddingX: "12px",
                          borderRight: "2px solid #c1d117",
                          textTransform: "uppercase",
                          fontSize: "16px",
                          fontWeight: "600",
                        }}
                      >
                        MINTED
                      </Box>
                      <Box
                        sx={{
                          color: "#ffffff",
                          paddingX: "12px",
                          textTransform: "uppercase",
                          fontSize: "16px",
                          fontWeight: "600",
                        }}
                      >
                        STAKED
                      </Box>
                    </Box>
                  </Box>
                  {statsData.map((item, index) => {
                    return (
                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{
                          paddingX: "6px",
                          marginY: "15px",
                        }}
                        key={index}
                      >
                        <Box>
                          <Box
                            sx={{
                              backgroundColor: "#c1d117",
                              color: "#0d1f19",
                              paddingY: "5px",
                              paddingX: "10px",
                              textTransform: "uppercase",
                              fontSize: "16px",
                              fontWeight: "700",
                              borderTopLeftRadius: "8px",
                              borderBottomLeftRadius: "8px",
                            }}
                          >
                            {item.title}
                            <br />
                            {item.subTitle}
                          </Box>
                        </Box>
                        <Box>
                          <Box
                            sx={{
                              backgroundColor: "#c1d117",
                              color: "#0d1f19",
                              paddingX: "7px",
                              paddingY: "7px",
                              textTransform: "uppercase",
                              fontSize: "14px",
                              fontWeight: "600",
                              textAlign: "center",
                              maxWidth: "100px",
                              minWidth: "80px",
                              "& > span": {
                                color: `#FFFFFF`,
                              },
                            }}
                          >
                            {item.minted}
                            <br />
                            <span>{item.mintedSlash}</span>
                          </Box>
                        </Box>
                        <Box>
                          <Box
                            sx={{
                              backgroundColor: "#c1d117",
                              color: "#fff",
                              minWidth: "80px",
                              maxWidth: "120px",
                              paddingX: "7px",
                              paddingY: "15px",
                              textTransform: "uppercase",
                              fontSize: "14px",
                              fontWeight: "600",
                              textAlign: "center",
                              borderTopRightRadius: "8px",
                              borderBottomRightRadius: "8px",
                            }}
                          >
                            {item.STAKED}
                          </Box>
                        </Box>
                      </Stack>
                    );
                  })}
                </Box>
              </Box>
            </Box>
          </Grid>)}
        <ProgresModal
          openProgressModal={openProgressModal}
          progressCloseModal={progressCloseModal}
          title= {title}
        />
      </Grid>
    </Box>
  );
};

export default UnStake;

