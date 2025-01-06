import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home/home';
import VirtualTryOn from './components/vto/vto';
import VirtualTryOnAccessory from './components/vto-accessory/vto-accessory';
import VirtualTryOnLive from './components/vto-live/vto-live';
import VirtualTryOnAccessoryLive from './components/vto-accessory-live/vto-accessory-live';
import VirtualTryOnModes from './components/vto-modes/vto-modes';
import FoundationShadeMatch from './components/fsm/fsm';
import FoundationShadeMatchLive from './components/fsm_live/fsm_live';
import Makeup from './components/makeup/makeup';
import MakeupCatalog from './components/makeupCatalog/makeupCatalog';
import FoundationCatalog from './components/foundationCatalog/foundationCatalog';
import BlushCatalog from './components/blushCatalog/blushCatalog';
import LipstickCatalog from './components/lipstickCatalog/lipstickCatalog';
import EyeshadowCatalog from './components/eyeshadowCatalog/eyeshadowCatalog';
import AccessoryCatalog from './components/accessoryCatalog/accessoryCatalog';
import SunglassesCatalog from './components/sunglassesCatalog/sunglassesCatalog';
import SelfieMode from './components/selfieMode/selfieMode';
import SelfiePage from './components/selfiePage';
import BestSellers from './components/bestSellers/bestSellers';
import Checkout from './components/checkout/checkout';

// import logo from './logo.jpg'; // Optional if you're not using the logo yet

function App() {
  return (
    <div className="App">
      {/* Header Logo 
      <img src={logo} className="App-Header" alt="logo" /> */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/virtual-try-on" element={<VirtualTryOn />} />
          <Route path="/virtual-try-on-accessory" element={<VirtualTryOnAccessory />} />
          <Route path="/virtual-try-on-live" element={<VirtualTryOnLive />} />
          <Route path="/virtual-try-on-accessory-live" element={<VirtualTryOnAccessoryLive />} />
          <Route path="/virtual-try-on-modes" element={<VirtualTryOnModes />} />
          <Route path="/foundation-shade-match" element={<FoundationShadeMatch />} />
          <Route path="/foundation-shade-match-live" element={<FoundationShadeMatchLive />} />
          <Route path="/makeup" element={<Makeup />} />
          <Route path="/makeup-catalog" element={<MakeupCatalog />} />
          <Route path="/foundation-catalog" element={<FoundationCatalog />} />
          <Route path="/blush-catalog" element={<BlushCatalog />} />
          <Route path="/lipstick-catalog" element={<LipstickCatalog />} />
          <Route path="/eyeshadow-catalog" element={<EyeshadowCatalog />} />
          <Route path="/accessory-catalog" element={<AccessoryCatalog />} />
          <Route path="/sunglasses-catalog" element={<SunglassesCatalog />} />
          <Route path="/selfie-mode" element={<SelfieMode />} />
          <Route path="/selfie-page" element={<SelfiePage />} />
          <Route path="/best-sellers" element={<BestSellers />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
