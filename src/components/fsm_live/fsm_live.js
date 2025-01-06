import React, { useRef, useState } from 'react';
import './fsm_live.css';
import blackImage from './images/models/model2.jpg';
import foundation from './images/blush.jpg';
import Navbar from '../navbar';

const FoundationShadeMatchLive = () => {
  const [sliderVisible, setSliderVisible] = useState(true);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [zoomLevel, setZoomLevel] = useState(1);
  const imgContainerRef = useRef(null);

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
            <img src={blackImage} alt="Black Background" className="black-image" />
            {sliderVisible && (
              <div
                className="slider"
                style={{ left: `${sliderPosition}%` }}
              ></div>
            )}
          </div>
          <div className="controls">
            <button className="control-btn" onClick={zoomIn}>
              +
            </button>
            <button className="control-btn" onClick={zoomOut}>
              -
            </button>
            <button className="control-btn toggle-slider" onClick={toggleSlider}>
              {sliderVisible ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>
        <div className="right-panel">
          <p>Your Skintone: <span className="skintone-box"></span></p>
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