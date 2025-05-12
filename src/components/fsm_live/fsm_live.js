import React, { useRef, useState } from 'react';
import './fsm_live.css';
import foundation from '../images/blush.jpg';
import Navbar from '../navbar';
import { useLocation } from 'react-router-dom';

const FoundationShadeMatchLive = () => {
  const location = useLocation();
  const imageUrl = location.state?.imageUrl;
  const [sliderVisible, setSliderVisible] = useState(true);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [zoomLevel, setZoomLevel] = useState(1);
  const imgContainerRef = useRef(null);
  const [skinToneColor, setSkinToneColor] = useState('#ffffff');

const handleShadeMatch = async () => {
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
    }
  } catch (error) {
    console.error('Shade match failed:', error);
  }
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

  const zoomIn = () => {
    if (zoomLevel < 4) {
      setZoomLevel((prevZoom) => prevZoom + 1);
      const img = imgContainerRef.current.querySelector('img');
      img.style.transition = 'transform 0.3s ease';
      img.style.transform = `scale(${1 + 0.2 * zoomLevel})`;
    }
  };

  const zoomOut = () => {
    if (zoomLevel > 1) {
      setZoomLevel((prevZoom) => prevZoom - 1);
      const img = imgContainerRef.current.querySelector('img');
      img.style.transition = 'transform 0.3s ease';
      img.style.transform = `scale(${1 + 0.2 * (zoomLevel - 2)})`;
    }
  };

  return (
    <div className="fsm_live">
      <div className="header">V-Glam Closet</div>
      <Navbar />
      <div className="container1">
        <div className="left-panel">
          <div
            className="image-container"
            ref={imgContainerRef}
            onMouseMove={sliderVisible ? handleSliderMove : undefined}
          >
            <img
              src={imageUrl}
              alt="Uploaded Face"
              className="black-image"
            />
            {sliderVisible && (
              <div
                className="slider"
                style={{ left: `${sliderPosition}%` }}
              ></div>
            )}
          </div>
          <div className="controls">
            <button className="control-btn" onClick={zoomIn}>+</button>
            <button className="control-btn" onClick={zoomOut}>-</button>
            <button className="control-btn toggle-slider" onClick={toggleSlider}>
              {sliderVisible ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>
        <div className="right-panel">
          <div>
          <button className="btn-add-to-cart" onClick={handleShadeMatch}>Match Shade</button></div>
          <br></br>
          <p>Your Skintone: <span className="skintone-box" style={{ backgroundColor: skinToneColor }}></span></p>
          <div className="tabs">
            <button className="tab-btn active">Matched Shades</button>
            <button className="tab-btn">Other Shades</button>
          </div>
          <div className="shades">
            <span className="shade cooler"></span>
            <span className="shade lighter"></span>
            <span className="shade best-matched"></span>
            <span className="shade darker"></span>
            <span className="shade warmer"></span>
          </div>
          <div className="foundation">
            <img src={foundation} alt="Foundation" />
            <p>4W1 Honey Bronze</p>
            <button className="btn-add-to-cart">Add to cart</button>
          </div>
        </div>
      </div>
      <div className="footer">
        <p>&copy; 2025 V-Glam Closet</p>
      </div>
    </div>
  );
};

export default FoundationShadeMatchLive;
