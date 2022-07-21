import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Container from "@mui/material/Container";
import Menu from "./components/Menu";
import HomePage from "./pages/Home";
import MyLand from "./pages/MyLand";
import MyNFT from "./pages/MyNFT";
import MarketPlace from "./pages/MarketPlace";
import PreSaleYardMint from "./pages/PreSaleYardMint";
import PreSaleFieldMint from "./pages/PreSaleFieldMint";
import VipMint from "./pages/VipMint";
import Whitepaper from "./pages/Whitepaper";
import Footer from "./components/Footer";

function App() {

  const location = useLocation();

  return (
    <div className="App">
      <Menu title={location.pathname === "/" ? "" : "Home"} />
      <div className="route-content">
        <Container maxWidth="xl">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/my-nft" element={<MyNFT />} />
            <Route path="/marketplace" element={<MarketPlace />} />
            <Route path="/my-land" element={<MyLand />} />
            <Route path="/vip-mint" element={<VipMint />} />
            <Route path="/presale-yard-mint" element={<PreSaleYardMint />} />
            <Route path="/presale-field-mint" element={<PreSaleFieldMint />} />
            <Route path="/whitepaper" element={<Whitepaper />} />
          </Routes>
        </Container>
      </div>
      <Footer />
    </div>
  );
}

export default App;