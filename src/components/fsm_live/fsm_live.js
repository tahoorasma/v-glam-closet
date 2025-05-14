import React, { useRef, useState, useEffect } from 'react';
import './fsm_live.css';
import axios from "axios";
import Navbar from '../navbar';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AddToBag from "../addToBag/addToBag";
import { v4 as uuidv4 } from "uuid";

const foundationInventory = [
  { hex: '#fed4b1', name: 'NYX-pale', displayName: 'Pale', code: 'P020', image: 'NYX-pale.png' },
  { hex: '#fccab7', name: 'NYX-light-porcelian', displayName: 'Light Porcelain', code: 'P021', image: 'NYX-light-porcelian.png' },
  { hex: '#ecc4a9', name: 'NYX-light-ivory', displayName: 'Light Ivory', code: 'P022', image: 'NYX-light-ivory.png' },
  { hex: '#e3b69a', name: 'NYX-light', displayName: 'Light', code: 'P023', image: 'NYX-light.png' },
  { hex: '#e0c5ac', name: 'NYX-fair', displayName: 'Fair', code: 'P024', image: 'NYX-fair.png' },
  { hex: '#e5b899', name: 'NYX-vanilla', displayName: 'Vanilla', code: 'P025', image: 'NYX-vanilla.png' },
  { hex: '#dab38d', name: 'NYX-warm-vanilla', displayName: 'Warm Vanilla', code: 'P026', image: 'NYX-warm-vanilla.png' },
  { hex: '#d6b28e', name: 'NYX-nude', displayName: 'Nude', code: 'P027', image: 'NYX-nude.png' },
  { hex: '#d8a380', name: 'NYX-natural', displayName: 'Natural', code: 'P028', image: 'NYX-natural.png' },
  { hex: '#dba779', name: 'NYX-true-beige', displayName: 'True Beige', code: 'P029', image: 'NYX-true-beige.png' },
  { hex: '#cb9e79', name: 'NYX-buff', displayName: 'Buff', code: 'P030', image: 'NYX-buff.png' },
  { hex: '#cb9374', name: 'NYX-medium-buff', displayName: 'Medium Buff', code: 'P031', image: 'NYX-medium-buff.png' },
  { hex: '#cb9875', name: 'NYX-medium-olive', displayName: 'Medium Olive', code: 'P032', image: 'NYX-medium-olive.png' },
  { hex: '#ca926b', name: 'NYX-soft-beige', displayName: 'Soft Beige', code: 'P033', image: 'NYX-soft-beige.png' }
];

const colorDistance = (color1, color2) => {
  const r1 = parseInt(color1.substring(1, 3), 16);
  const g1 = parseInt(color1.substring(3, 5), 16);
  const b1 = parseInt(color1.substring(5, 7), 16);
  
  const r2 = parseInt(color2.substring(1, 3), 16);
  const g2 = parseInt(color2.substring(3, 5), 16);
  const b2 = parseInt(color2.substring(5, 7), 16);
  
  return Math.sqrt(
    Math.pow(r2 - r1, 2) + 
    Math.pow(g2 - g1, 2) + 
    Math.pow(b2 - b1, 2)
  );
};

const FoundationShadeMatchLive = () => {
  const location = useLocation();  
  const [showBag, setShowBag] = useState(false);
  const [foundationProducts, setFoundationProducts] = useState([]);
  const navigate = useNavigate();
  const imageUrl = location.state?.imageUrl;
  const [sliderVisible, setSliderVisible] = useState(true);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [zoomLevel, setZoomLevel] = useState(1);
  const imgContainerRef = useRef(null);
  const [skinToneColor, setSkinToneColor] = useState('#ffffff');
  const [matchedFoundations, setMatchedFoundations] = useState([]);
  const [selectedFoundation, setSelectedFoundation] = useState(null);
  const [uploadPhoto, setUploadPhoto] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  let userID = localStorage.getItem("userID");
    if (!userID) {
        userID = uuidv4();
        localStorage.setItem("userID", userID);
    }

  useEffect(() => {
          fetch("http://localhost:5000/foundationProducts")
              .then(response => response.json())
              .then(data => setFoundationProducts(data))
              .catch(error => console.error("Error fetching foundation products:", error));
  }, []);

 const handleShadeMatch = async () => {
  setIsScanning(true);
  setMatchedFoundations([]);
  setSelectedFoundation(null);
  setSkinToneColor('#ffffff');

  setTimeout(async () => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      const formData = new FormData();
      formData.append('image', blob, 'face.jpg');

      const apiResponse = await fetch('http://localhost:5000/analyze-skintone', {
        method: 'POST',
        body: formData,
      });

      const data = await apiResponse.json();
      if (data.hex_color) {
        console.log('Skin tone color:', data.hex_color);
        setSkinToneColor(data.hex_color);
        findClosestFoundations(data.hex_color);
      }
    } catch (error) {
      console.error('Shade match failed:', error);
    } finally {
      setIsScanning(false);
    }
  }, 3000);
};

  const findClosestFoundations = (skinToneHex) => {
    const foundationsWithDistance = foundationInventory.map(foundation => ({
      ...foundation,
      distance: colorDistance(skinToneHex, foundation.hex)
    }));
    
    const sortedFoundations = [...foundationsWithDistance].sort((a, b) => a.distance - b.distance);
    const topMatches = sortedFoundations.slice(0, 3);
    
    setMatchedFoundations(topMatches);
    setSelectedFoundation(topMatches[0]); 
  };

  const handleShadeClick = (foundation) => {
    setSelectedFoundation(foundation);
  };

  const toggleSlider = () => {
    setSliderVisible(!sliderVisible);
  };

  const handleSliderMove = (e) => {
    const container = e.target.closest('.image-container');
    const containerRect = container.getBoundingClientRect();
    const newPosition = ((e.clientX - containerRect.left) / containerRect.width) * 100;
    setSliderPosition(Math.min(Math.max(newPosition, 0), 100));
  };

  const convertImageUrlToFile = async (imageUrl, fileName = 'upload.jpg') => {
  const response = await fetch(imageUrl);
  const blob = await response.blob();

  const file = new File([blob], fileName, { type: blob.type });
  return file;
  };

  const handleTryNow = async () => {
  try {
    const file = await convertImageUrlToFile(imageUrl, 'user-upload.jpg');
    navigate('/virtual-try-on', { state: { uploadPhoto: file } });
  } catch (error) {
    console.error('Failed to convert imageUrl to File:', error);
  }
};

  return (
    <div className="fsm_live">
      <div className="header">V-Glam Closet</div>
      <Navbar />
      <div className="container1">
        <div className="left-panel">
          <div className="image-container" ref={imgContainerRef} onMouseMove={sliderVisible ? handleSliderMove : undefined}>
            <img src={imageUrl} alt="Uploaded Face" className="black-image" />
            {sliderVisible && (
              <div className="slider" style={{ left: `${sliderPosition}%` }}></div>
            )}

            {isScanning && (
              <div className="scanning-overlay">
                <div className="scan-line"></div>
              </div>
            )}
          </div>

        </div>
        <div className="right-panel">
          <div>
            <button className="btn-add-to-cart" onClick={handleShadeMatch}>Match Shade</button>
          </div>
          <div className="tabs">
            <label className="tab-btn active">Your Skintone</label>
          </div>
          <div className="shades">
            <span className="skintone-box" style={{ backgroundColor: skinToneColor }}></span>
          </div>
          <div className="tabs">
            <label className="tab-btn active">Matched Shades</label>
          </div>
          <div className="shades">
            {matchedFoundations.map((foundation, index) => (
              <span 
                key={foundation.code}
                className={`shade ${index === 0 ? 'best-matched' : index === 1 ? 'cooler' : 'lighter'} ${selectedFoundation?.code === foundation.code ? 'selected' : ''}`}
                style={{ backgroundColor: foundation.hex }}
                title={index === 0 ? 'best-matched shade' : index === 1 ? 'cooler shade' : 'lighter shade'}
                onClick={() => handleShadeClick(foundation)}
              ></span>
            ))}
          </div>
          {selectedFoundation && (
            <div className="foundation">
              <img 
                src={require(`../images/catalog/foundation/${selectedFoundation.image}`)} 
                alt={selectedFoundation.displayName}
                onError={(e) => {
                  e.target.src = require('../images/catalog/foundation/Maybelline-fitme.png'); 
                }}
              />
              <p className="suggested-foundation">NYX {selectedFoundation.displayName} </p>
              <Link to={`/productDescription/${selectedFoundation.code}`} className="most-viewed-link">View Details</Link>
              <button className="btn-add-to-cart" onClick={handleTryNow}>Try Now</button>
            </div>
          )}
        </div>
      </div>
       {showBag && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="close-modal-btn" onClick={() => setShowBag(false)}>
                            &times;
                        </button>
                        <AddToBag />
                    </div>
                </div>
            )}
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
      <div className="footer">
        <p>&copy; 2025 V-Glam Closet</p>
      </div>
    </div>
  );
};

export default FoundationShadeMatchLive;