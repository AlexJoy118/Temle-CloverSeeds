import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import React, { useEffect } from "react";
import { useTimer } from "react-timer-hook";
import TimerStyled from "./TimerStyled";

function WateringTimer({ expiryTimestamp = null }) {
  const isStop = !expiryTimestamp || expiryTimestamp.getSeconds() === 0

  const { seconds, minutes, hours, restart } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn("onExpire called"),
  });

  useEffect(() => {
    restart(expiryTimestamp);
  }, [expiryTimestamp]);

  
  return (
    <div>
      <Box>
        <Title>WATERING TIMER LIMIT</Title>
        <TimerStyled
          seconds={isStop ? 0 : (seconds)}
          minutes={isStop ? 0 : (minutes)}
          hours={isStop ? 48 : (hours + 24)}
        />
      </Box>
    </div>
  );
}

export default WateringTimer;

const Title = styled("h3")({
  fontSize: "12px",
  fontWeight: "700",
  color: "#FFFFFF",
  textAlign: "center",
  paddingBottom: "4px"
});
