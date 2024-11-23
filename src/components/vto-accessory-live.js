import React, { useState, useEffect } from 'react'; 
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './vto.css';
import defaultModel from './images/models/model1.png';
import s1 from './images/sunglasses/sg-1.png';
import s2 from './images/sunglasses/sg-2.png';
import s3 from './images/sunglasses/sg-3.png';
import s4 from './images/sunglasses/sg-4.png';
import s5 from './images/sunglasses/sg-5.png';
import s6 from './images/sunglasses/sg-6.png';
import s7 from './images/sunglasses/sg-7.png';
import s8 from './images/sunglasses/sg-8.png';
import j1 from './images/jewelry/j1.png';
import j2 from './images/jewelry/j2.png';
import j3 from './images/jewelry/j3.jpg';
import j4 from './images/jewelry/j4.jpg';
import Navbar from './navbar';
import axios, { formToJSON } from 'axios';

const VirtualTryOnAccessoryLive = () => {
    const [videoSrc, setVideoSrc] = useState('http://localhost:5000/video_feed');
  
    useEffect(() => {
      const intervalId = setInterval(() => {
        setVideoSrc(`http://localhost:5000/video_feed?timestamp=${new Date().getTime()}`);
      }, 100); 
      return () => clearInterval(intervalId); 
    }, []);

  const location = useLocation();
  const navigate = useNavigate();
  const [imageSource, setImageSource] = useState(defaultModel);
  const [showSunglassesProducts, setShowSunglassesProducts] = useState(false);
  const [showJewelryProducts, setShowJewelryProducts] = useState(false);

  useEffect(() => {
    if (location.state?.imageSource) {
      setImageSource(location.state.imageSource);
    }
  }, [location.state]); 

  const handleBack = async () => {
    handleReset();
    setShowSunglassesProducts(false);
    setShowJewelryProducts(false);
  }
  const handleSunglassesBtnClick = async () => {
    setShowSunglassesProducts(true);
  }
  const handleJewelryBtnClick = async () => {
    setShowJewelryProducts(true);
  }

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

  const handleJewelryClick = async (jewelry) => {}
  
  const handleMakeupBtnClick = () => {
    handleReset();
    navigate('/virtual-try-on-live', { state: { imageSource } });
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
            { showSunglassesProducts ? (
              <div className="product-options-container">
                <div className="product-options">
                <button className="back-option" onClick={handleBack}>
                  <i class="fa fa-caret-left" style={{ fontSize: '20px' }}></i></button>
                <button className="reset-option" onClick={handleReset}></button>
                    <button className="sg-option" onClick={() => handleSunglassesClick(s1)}>
                        <img src={s1} alt="Option A" />
                    </button>
                    <button className="sg-option" onClick={() => handleSunglassesClick(s2)}>
                        <img src={s2} alt="Option B" />
                    </button>
                    <button className="sg-option" onClick={() => handleSunglassesClick(s3)}>
                        <img src={s3} alt="Option C" />
                    </button>
                    <button className="sg-option" onClick={() => handleSunglassesClick(s4)}>
                        <img src={s4} alt="Option D" />
                    </button>
                    <button className="sg-option" onClick={() => handleSunglassesClick(s5)}>
                        <img src={s5} alt="Option E" />
                    </button>
                    <button className="sg-option" onClick={() => handleSunglassesClick(s6)}>
                        <img src={s6} alt="Option F" />
                    </button>
                    <button className="sg-option" onClick={() => handleSunglassesClick(s7)}>
                        <img src={s7} alt="Option G" />
                    </button>
                    <button className="sg-option" onClick={() => handleSunglassesClick(s8)}>
                        <img src={s8} alt="Option H" />
                    </button>
                </div>
              </div>
            ) : showJewelryProducts ? (
              <div className="product-options-container">
                <div className="product-options">
                <button className="back-option" onClick={handleBack}>
                  <i class="fa fa-caret-left" style={{ fontSize: '20px' }}></i></button>
                <button className="reset-option" onClick={handleReset}></button>
                    <button className="sg-option" onClick={() => handleJewelryClick(j1)}>
                        <img src={j1} alt="Option 1" />
                    </button>
                    <button className="sg-option" onClick={() => handleJewelryClick(j2)}>
                        <img src={j2} alt="Option 2" />
                    </button>
                    <button className="sg-option" onClick={() => handleJewelryClick(j3)}>
                        <img src={j3} alt="Option 3" />
                    </button>
                    <button className="sg-option" onClick={() => handleJewelryClick(j4)}>
                        <img src={j4} alt="Option 4" />
                    </button>
                </div>
              </div>
            ) : (
              <div className="product-options">
              <button className="product-option" onClick={() => handleSunglassesBtnClick()}>
                Sunglasses</button>
              <button className="product-option" onClick={() => handleJewelryBtnClick()}>
                Jewelry</button>
            </div>
            )}

            <div className="action-buttons">
              <button id="ac-btn" onClick={() => handleMakeupBtnClick()}>Makeup</button>
              <button id="mk-btn">Accessory</button>
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

export default VirtualTryOnAccessoryLive;
