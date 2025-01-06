import React, { useEffect, useState } from 'react';
import './vto.css';
import Navbar from './navbar';

const VirtualTryOnBlush = () => {
  const [videoSrc, setVideoSrc] = useState('http://localhost:5000/video_feed');

  useEffect(() => {
    const intervalId = setInterval(() => {
      setVideoSrc(`http://localhost:5000/video_feed?timestamp=${new Date().getTime()}`);
    }, 100); 
    return () => clearInterval(intervalId); 
  }, []);

  const handleBlushClick = (blushId) => {
    fetch('http://localhost:5000/select-blush', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ color: blushId.toString() }), 
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error("Error in handleBlushClick:", error));
  };

  const handleReset = () => {
    fetch('http://localhost:5000/reset-blush', {
      method: 'POST',
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error("Error in handleReset:", error));
  };

  return (
    <div>
      <div className="header">V-Glam Closet</div>
      <Navbar />

      <div className="virtual-tryon-container">
        <h3><b>VIRTUAL TRY-ON</b></h3>
        <p>Try out our beautiful blush shades for your perfect look.</p>

        <div className="tryon-ui">
          <div className="photo-area">
            <div className="model-container">
              <img src={videoSrc} alt="Video Stream" style={{ width: '100%', height: 'auto' }} />
            </div>
          </div>

          <div className="controls">
            <div className="product-options">
              <button className="product-option" onClick={handleReset}>
                <i className="fa fa-ban" style={{ color: '#7b7b7b', marginLeft: '15px', border: '1px solid #7b7b7b', padding: '5px', borderRadius: '50%' }}></i> Reset Blush
              </button>
              <button className="reset-option" onClick={handleReset}></button>
              <button className="makeup-option" onClick={() => handleBlushClick(1)} style={{ background: '#faa7a6' }} alt="777"></button>
              <button className="makeup-option" onClick={() => handleBlushClick(2)} style={{ background: '#f58a8f' }} alt="778"></button>
              <button className="makeup-option" onClick={() => handleBlushClick(3)} style={{ background: '#ff8288' }} alt="776"></button>
              <button className="makeup-option" onClick={() => handleBlushClick(4)} style={{ background: '#a84d4b' }} alt="775"></button>
              <button className="makeup-option" onClick={() => handleBlushClick(5)} style={{ background: '#ef8e8d' }} alt="237"></button>
              <button className="makeup-option" onClick={() => handleBlushClick(6)} style={{ background: '#ed6f5e' }} alt="923"></button>
              <button className="makeup-option" onClick={() => handleBlushClick(7)} style={{ background: '#b86262' }} alt="901"></button>
              <button className="makeup-option" onClick={() => handleBlushClick(8)} style={{ background: '#bf636b' }} alt="888"></button>
              <button className="makeup-option" onClick={() => handleBlushClick(9)} style={{ background: '#df7b7e' }} alt="252"></button>
              <button className="makeup-option" onClick={() => handleBlushClick(10)} style={{ background: '#af6163' }} alt="902"></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualTryOnBlush;
