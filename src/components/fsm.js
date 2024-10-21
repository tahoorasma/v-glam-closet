import React from 'react';
import { Link } from 'react-router-dom';
import './fsm.css';
import qr from './images/qr.png';
import face_scan from './images/face_scan.jpg';
import shade_match from './images/shade_match.jpg';
import Navbar from './navbar';

const FoundationShadeMatch = () => {
  return (
    <div>
      <div className="header">
        V-Glam Closet
      </div>
      <Navbar />
      <div className="container">
        <div style={{ marginTop: '10px', textAlign: 'center' }}>
          <h3><b>FOUNDATION SHADE MATCH</b></h3>
          <p>Time to makeup your mind! Experience your perfect makeup shades or try a bold new look with our virtual try-on tool.</p>
        </div>
        <div className="row text-center">
          <div className="col-md-4 step">
            <h2>Step 1</h2>
            <img src={qr} alt="QR code" />
            <p>Scan QR code to launch Foundation Shade Match on your phone</p>
          </div>
          <div className="col-md-4 step">
            <h2>Step 2</h2>
            <img src={face_scan} alt="Face Scan" />
            <p>Take a 360º video recording</p>
          </div>
          <div className="col-md-4 step">
            <h2>Step 3</h2>
            <img src={shade_match} alt="Perfect match" />
            <p>Choose your best match from the given options</p>
          </div>
        </div>
      </div>
      <div className="footer">
        <p>&copy; 2024 V-Glam Closet</p>
      </div>
    </div>
  );
};

export default FoundationShadeMatch;
