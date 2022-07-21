import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Header from "./Header";
const Market = () => {
  return (
    <Box>
      <Container maxWidth="xl">
        <Header />
      </Container>
      <Box
        sx={{
          paddingTop: "6rem"
        }}
      >
      </Box>
    </Box>
  );
};

export default Market;
