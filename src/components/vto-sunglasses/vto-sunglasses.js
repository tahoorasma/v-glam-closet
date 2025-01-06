import React, { useEffect, useState } from 'react';
import './vto.css';
import a from '../images/sunglasses/sg-1.png';
import b from '../images/sunglasses/sg-2.png';
import c from '../images/sunglasses/sg-3.png';
import d from '../images/sunglasses/sg-4.png';
import e from '../images/sunglasses/sg-5.png';
import f from '../images/sunglasses/sg-6.png';
import g from '../images/sunglasses/sg-7.png';
import h from '../images/sunglasses/sg-8.png';
import Navbar from './navbar';

const VirtualTryOnLive = () => {
  const [videoSrc, setVideoSrc] = useState('http://localhost:5000/video_feed');

  useEffect(() => {
    const intervalId = setInterval(() => {
      setVideoSrc(`http://localhost:5000/video_feed?timestamp=${new Date().getTime()}`);
    }, 100); 
    return () => clearInterval(intervalId); 
  }, []);

  const handleSunglassesClick = (sunglasses) => {
    const sunglassesIndex = sunglasses.split('sg-')[1].split('.')[0];
    fetch('http://localhost:5000/select-sunglasses', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ index: sunglassesIndex }),
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error("Error in handleSunglassesClick:", error));
  };
  
  const handleReset = () => {
    fetch('http://localhost:5000/reset-sunglasses', {  
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
        <p>Time to make up your mind! Experience your perfect makeup shades or try a bold new look with our virtual try-on tool.</p>

        <div className="tryon-ui">
          <div className="photo-area">
            <div className="model-container">
              <img src={videoSrc} alt="Video Stream" style={{ width: '100%', height: 'auto' }} />
            </div>
          </div>

          <div className="controls">
            <div className="product-options">
              <button className="product-option" onClick={handleReset}>
                <i className="fa fa-ban" style={{ color: '#7b7b7b', marginLeft: '15px', border: '1px solid #7b7b7b', padding: '5px', fontSize: '36px' }}></i>
              </button>
              <button className="product-option" onClick={() => handleSunglassesClick(a)}>
                <img src={a} alt="Option A" />
              </button>
              <button className="product-option" onClick={() => handleSunglassesClick(b)}>
                <img src={b} alt="Option B" />
              </button>
              <button className="product-option" onClick={() => handleSunglassesClick(c)}>
                <img src={c} alt="Option C" />
              </button>
              <button className="product-option" onClick={() => handleSunglassesClick(d)}>
                <img src={d} alt="Option D" />
              </button>
              <button className="product-option" onClick={() => handleSunglassesClick(e)}>
                <img src={e} alt="Option E" />
              </button>
              <button className="product-option" onClick={() => handleSunglassesClick(f)}>
                <img src={f} alt="Option F" />
              </button>
              <button className="product-option" onClick={() => handleSunglassesClick(g)}>
                <img src={g} alt="Option G" />
              </button>
              <button className="product-option" onClick={() => handleSunglassesClick(h)}>
                <img src={h} alt="Option H" />
              </button>
            </div>

            <div className="action-buttons">
              <button id="sg-btn">Sunglasses</button>
              <button id="jw-btn">Jewelry</button>
            </div>
          </div>
        </div>
      </div>

      <div className="footer">
        <p>&copy; 2024 V-Glam Closet</p>
      </div>
    </div>
  );
};

export default VirtualTryOnLive;
