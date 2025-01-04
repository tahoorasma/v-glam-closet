import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home';
import VirtualTryOn from './components/vto';
import VirtualTryOnAccessory from './components/vto-accessory';
import VirtualTryOnLive from './components/vto-live';
import VirtualTryOnAccessoryLive from './components/vto-accessory-live';
import VirtualTryOnModes from './components/vto-modes';
import FoundationShadeMatch from './components/fsm';
import Makeup from './components/makeup';
import MakeupCatalog from './components/makeupCatalog';
import FoundationCatalog from './components/foundationCatalog';
import BlushCatalog from './components/blushCatalog';
import LipstickCatalog from './components/lipstickCatalog';
import EyeshadowCatalog from './components/eyeshadowCatalog';
import AccessoryCatalog from './components/accessoryCatalog';
import SelfieMode from './components/selfieMode';
import Blush from './components/blush';
import SelfiePage from './components/selfiePage';
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
          <Route path="/makeup" element={<Makeup />} />
          <Route path="/makeup-catalog" element={<MakeupCatalog />} />
          <Route path="/foundation-catalog" element={<FoundationCatalog />} />
          <Route path="/blush-catalog" element={<BlushCatalog />} />
          <Route path="/lipstick-catalog" element={<LipstickCatalog />} />
          <Route path="/eyeshadow-catalog" element={<EyeshadowCatalog />} />
          <Route path="/accessory-catalog" element={<AccessoryCatalog />} />
          <Route path="/selfie-mode" element={<SelfieMode />} />
          <Route path="/blush" element={<Blush />} />
          <Route path="/selfie-page" element={<SelfiePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
