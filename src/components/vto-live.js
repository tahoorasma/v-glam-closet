import React, { useState, useEffect } from 'react'; 
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './vto.css';
import defaultModel from './images/models/model1.png';
import cmp from './images/compare.jpg'
import buy from './images/blush.jpg'
import ss from './images/glitter_eyeshadows/strawberry-stacked.png'
import gf from './images/glitter_eyeshadows/grapefruit.png'
import fg from './images/glitter_eyeshadows/feeling-grape.png'
import rr from './images/glitter_eyeshadows/raspberry-rave.png'
import bb from './images/glitter_eyeshadows/blueberry-bank.png'
import ww from './images/glitter_eyeshadows/watermelon-wealth.png'
import Navbar from './navbar';

const VirtualTryOnLive = () => {
  const [videoSrc, setVideoSrc] = useState('http://localhost:5000/video_feed');
  const location = useLocation();
  const navigate = useNavigate();
  const [imageSource, setImageSource] = useState(defaultModel);
  const [showFoundationProducts, setShowFoundationProducts] = useState(false);
  const [showLipstickProducts, setShowLipstickProducts] = useState(false);
  const [showBlushProducts, setShowBlushProducts] = useState(false);
  const [showEyeShadowProducts, setShowEyeShadowProducts] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setVideoSrc(`http://localhost:5000/video_feed?timestamp=${new Date().getTime()}`);
    }, 100); 
    return () => clearInterval(intervalId); 
  }, []);

  useEffect(() => {
    if (location.state?.imageSource) {
      setImageSource(location.state.imageSource);
    } else if (location.state?.selectedModel) {
      try {
        console.log('Selected Model:', location.state.selectedModel);
        setImageSource(require(`./images/${location.state.selectedModel}`));
      } catch (error) {
        console.error('Error loading image:', error);
        setImageSource(defaultModel); 
      }
    } else if (location.state?.uploadPhoto) {
      const reader = new FileReader();
      reader.onload = (e) => setImageSource(e.target.result);
      reader.readAsDataURL(location.state.uploadPhoto);
    }
  }, [location.state]);  

  const handleBack = async () => {
    resetFoundation();
    /*resetLipstick();
    resetBlush();
    resetEyeshadow();*/
    setShowFoundationProducts(false);
    setShowLipstickProducts(false);
    setShowBlushProducts(false);
    setShowEyeShadowProducts(false);
  }
  const handleFoundationBtnClick = async () => {
    setShowFoundationProducts(true);
  }
  const handleLipstickBtnClick = async () => {
    setShowLipstickProducts(true);
  }
  const handleBlushBtnClick = async () => {
    setShowBlushProducts(true);
  }
  const handleEyeShadowBtnClick = async () => {
    setShowEyeShadowProducts(true);
  }

  const handleFoundationClick = (shadeColor, shadeName) => {
    fetch('http://localhost:5000/select-foundation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ shadeColor }),
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error("Error in handleFoundationClick:", error));
  };
  
  const handleLipstickClick = async () => {}
  
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

  const handleEyeShadowClick = (shadeColor, shadeName, isGlitter) => {
    fetch('http://localhost:5000/select-eyeshadow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ shadeColor, isGlitter}),
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error("Error in handleEyeShadowClick:", error));
  };  

  const resetFoundation = () => {
    fetch('http://localhost:5000/reset-foundation', {
      method: 'POST',
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error("Error in reset:", error));
  };const resetLipstick = () => {
    fetch('http://localhost:5000/reset-lipstick', {
      method: 'POST',
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error("Error in reset:", error));
  };const resetBlush = () => {
    fetch('http://localhost:5000/reset-blush', {
      method: 'POST',
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error("Error in reset:", error));
  };const resetEyeshadow = () => {
    fetch('http://localhost:5000/reset-eyeshadow', {
      method: 'POST',
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error("Error in reset:", error));
  };
  
  const handleAccessoryBtnClick = () => {
    resetFoundation();
    /*resetLipstick();
    resetBlush();
    resetEyeshadow();*/
    navigate('/virtual-try-on-accessory-live', { state: { imageSource }});
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

          <div className="col-12 col-md-2">
            <div className="button-container">
              {(showFoundationProducts || showBlushProducts || showLipstickProducts || showEyeShadowProducts) && (
                <>
                  <button id="side-btn">
                    <img src={cmp} alt="Compare" className="button-icon" />
                    <span>Compare</span>
                  </button>
                  <button id="side-btn">
                    <img src={buy} alt="Buy" className="button-icon" />
                    <span>Buy</span>
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="controls">
            { showFoundationProducts ? (
              //foundation from NYX
              <div className="product-options-container">
                <div className="product-options">
                <button className="back-option" onClick={handleBack}>
                  <i className="fa fa-caret-left" style={{ fontSize: '20px' }}></i></button>
                <button className="reset-option" onClick={resetFoundation}></button>
                  <button className="makeup-option" onClick={() => handleFoundationClick('#fed4b1', 'pale')} style={{ background: '#fed4b1' }}></button>
                  <button className="makeup-option" onClick={() => handleFoundationClick('#fccab7', 'light-porcelain')} style={{ background: '#fccab7' }}></button>
                  <button className="makeup-option" onClick={() => handleFoundationClick('#ecc4a9', 'light-ivory')} style={{ background: '#ecc4a9' }}></button>
                  <button className="makeup-option" onClick={() => handleFoundationClick('#e3b69a', 'light')} style={{ background: '#e3b69a' }}></button>
                  <button className="makeup-option" onClick={() => handleFoundationClick('#e0c5ac', 'fair')} style={{ background: '#e0c5ac' }}></button>
                  <button className="makeup-option" onClick={() => handleFoundationClick('#e5b899', 'vanilla')} style={{ background: '#e5b899' }}></button>
                  <button className="makeup-option" onClick={() => handleFoundationClick('#dab38d', 'warm-vanilla')} style={{ background: '#dab38d' }}></button>
                  <button className="makeup-option" onClick={() => handleFoundationClick('#d6b28e', 'nude')} style={{ background: '#d6b28e' }}></button>
                  <button className="makeup-option" onClick={() => handleFoundationClick('#d8a380', 'natural')} style={{ background: '#d8a380' }}></button>
                  <button className="makeup-option" onClick={() => handleFoundationClick('#dba779', 'true-beige')} style={{ background: '#dba779' }}></button>

                  <button className="makeup-option" onClick={() => handleFoundationClick('#cb9e79', 'buff')} style={{ background: '#cb9e79' }}></button>
                  <button className="makeup-option" onClick={() => handleFoundationClick('#cb9374', 'medium-buff')} style={{ background: '#cb9374' }}></button>
                  <button className="makeup-option" onClick={() => handleFoundationClick('#cb9875', 'medium-olive')} style={{ background: '#cb9875' }}></button>
                  <button className="makeup-option" onClick={() => handleFoundationClick('#ca926b', 'soft-beige')} style={{ background: '#ca926b' }}></button>
                </div>
              </div>
            ) : showLipstickProducts ? (
              //lipstick from maybelline-super stay vinyl ink
              <div className="product-options-container">
                <div className="product-options">
                <button className="back-option" onClick={handleBack}>
                  <i className="fa fa-caret-left" style={{ fontSize: '20px' }}></i></button>
                <button className="reset-option" onClick={resetLipstick}></button>
                  <button className="makeup-option" onClick={() => handleLipstickClick(1)} style={{ background: 'rgb(151, 15, 33)' }} alt="lippy"></button>
                  <button className="makeup-option" onClick={() => handleLipstickClick(2)} style={{ background: 'rgb(195, 83, 83)' }} alt="peachy"></button>
                  <button className="makeup-option" onClick={() => handleLipstickClick(3)} style={{ background: 'rgb(195, 73, 99)' }} alt="coy"></button>
                  <button className="makeup-option" onClick={() => handleLipstickClick(4)} style={{ background: 'rgb(226, 16, 17)' }} alt="red hot"></button>
                  <button className="makeup-option" onClick={() => handleLipstickClick(5)} style={{ background: 'rgb(135, 10, 44)' }} alt="unrivaled"></button>
                  <button className="makeup-option" onClick={() => handleLipstickClick(6)} style={{ background: 'rgb(173, 89, 89)' }} alt="cheeky"></button>
                  <button className="makeup-option" onClick={() => handleLipstickClick(7)} style={{ background: 'rgb(141, 70, 76)' }} alt="witty"></button>
                  <button className="makeup-option" onClick={() => handleLipstickClick(8)} style={{ background: 'rgb(185, 0, 37)' }} alt="wicked"></button>
                  <button className="makeup-option" onClick={() => handleLipstickClick(9)} style={{ background: 'rgb(218, 67, 90)' }} alt="rogue"></button>
                  <button className="makeup-option" onClick={() => handleLipstickClick(10)} style={{ background: 'rgb(191, 69, 89)' }} alt="sultry"></button>
                </div>
              </div>
            ) : showBlushProducts ? (
              //blush from nars-powder blush
              <div className="product-options-container">
                <div className="product-options">
                <button className="back-option" onClick={handleBack}>
                  <i className="fa fa-caret-left" style={{ fontSize: '20px' }}></i></button>
                <button className="reset-option" onClick={resetBlush}></button>
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
            ) : showEyeShadowProducts ? (
              //eye shadow from nars-hardwired eyeshadow
              <div className="product-options-container">
                <div className="product-options">
                <button className="back-option" onClick={handleBack}>
                  <i className="fa fa-caret-left" style={{ fontSize: '20px' }}></i></button>
                <button className="reset-option" onClick={resetEyeshadow}></button>
                  <button className="eyeshadow-option" onClick={() => handleEyeShadowClick('#c96f8c', '', 0)} style={{ background: '#c96f8c' }}></button>
                  <button className="eyeshadow-option" onClick={() => handleEyeShadowClick('#cf8f91', 'melrose', 0)} style={{ background: '#f19ea1' }}></button>
                  <button className="eyeshadow-option" onClick={() => handleEyeShadowClick('#d69f87', 'pattaya', 0)} style={{ background: '#e9a486' }}></button>
                  <button className="eyeshadow-option" onClick={() => handleEyeShadowClick('#dd8776', 'mendoza', 0)} style={{ background: '#dd8776' }}></button>
                  <button className="eyeshadow-option" onClick={() => handleEyeShadowClick('#bd8797', 'earthshine', 0)} style={{ background: '#bd8797'}}></button>
                  <button className="eyeshadow-option" onClick={() => handleEyeShadowClick('#af8070', 'firenze', 0)} style={{ background: '#af8070' }}></button>
                  <button className="eyeshadow-option" onClick={() => handleEyeShadowClick('#c9a381', 'rio', 0)} style={{ background: '#e4bd9b' }}></button>
                  <button className="eyeshadow-option" onClick={() => handleEyeShadowClick('#697991', '', 0)} style={{ background: '#697991' }}></button>
                  <button className="eyeshadow-option" onClick={() => handleEyeShadowClick('#91696c', '', 0)} style={{ background: '#91696c' }}></button>
                  <button className="makeup-option" onClick={() => handleEyeShadowClick('#940935', '', 0)} style={{ background: '#940935' }}></button>
                  <button className="makeup-option" onClick={() => handleEyeShadowClick('#751332', '', 0)} style={{ background: '#751332' }}></button>
                  <button className="makeup-option" onClick={() => handleEyeShadowClick('#916982', 'madrid', 0)} style={{ background: '#916982' }}></button>
                  <button className="makeup-option" onClick={() => handleEyeShadowClick('#831e76', 'chile', 0)} style={{ background: '#831e76' }}></button>
                  <button className="makeup-option" onClick={() => handleEyeShadowClick('#915656', '', 0)} style={{ background: '#915656' }}></button>
                  <button className="makeup-option" onClick={() => handleEyeShadowClick('#449db8', '', 0)} style={{ background: '#449db8' }}></button>
                  <button className="makeup-option" onClick={() => handleEyeShadowClick('#3dada2', '', 0)} style={{ background: '#3dada2' }}></button>
                  {/*nyx-ultimate glow shots liquid eyeshadow*/}
                  <button className="makeup-option" onClick={() => handleEyeShadowClick('#a33c51', 'strawberry-stacked', 1)} style={{ backgroundImage:  `url(${ss})` }}></button>
                  <button className="makeup-option" onClick={() => handleEyeShadowClick('#ba828d', 'grapefruit', 1)} style={{ backgroundImage:  `url(${gf})` }}></button>
                  <button className="makeup-option" onClick={() => handleEyeShadowClick('#6c3f75', 'feeling-grape', 1)} style={{ background: `url(${fg})` }}></button>
                  <button className="makeup-option" onClick={() => handleEyeShadowClick('#bf304c', 'raspberry-rave', 1)} style={{ background: `url(${rr})`}}></button>
                  <button className="makeup-option" onClick={() => handleEyeShadowClick('#174077', 'blueberry-bank', 1)} style={{ background: `url(${bb})` }}></button>
                  <button className="makeup-option" onClick={() => handleEyeShadowClick('#3c816a', 'watermelon-wealth', 1)} style={{ background: `url(${ww})` }}></button>
                </div>
              </div>
            ) : (
              <div className="type-options">
              <button className="product-option" onClick={() => handleFoundationBtnClick()}>
                Foundation</button>
              <button className="product-option" onClick={() => handleLipstickBtnClick()}>
                Lipstick</button>
              <button className="product-option" onClick={() => handleBlushBtnClick()}>
                Blush</button>
              <button className="product-option" onClick={() => handleEyeShadowBtnClick()}>
                Eye Shadow</button>
            </div>
            )}

            <div className="action-buttons">
              <button id="mk-btn">Makeup</button>
              <button id="ac-btn" onClick={() => handleAccessoryBtnClick()}>Accessory</button>
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
