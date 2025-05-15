import React, { useState, useEffect } from 'react'; 
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './vto.css';
import cmp from '../images/compare.jpg'
import defaultModel from '../images/models/model1.png';
import s1 from '../images/sunglasses/sg-1.png';
import s2 from '../images/sunglasses/sg-2.png';
import s3 from '../images/sunglasses/sg-3.png';
import s4 from '../images/sunglasses/sg-4.png';
import s5 from '../images/sunglasses/sg-5.png';
import s6 from '../images/sunglasses/sg-6.png';
import s7 from '../images/sunglasses/sg-7.png';
import s8 from '../images/sunglasses/sg-8.png';
import j1 from '../images/catalog/jewelry/j1.png';
import j2 from '../images/catalog/jewelry/j2.png';
import j3 from '../images/catalog/jewelry/j3.png';
import j4 from '../images/catalog/jewelry/j4.png';
import j5 from '../images/catalog/jewelry/j5.png';
import j6 from '../images/catalog/jewelry/j6.png';
import j7 from '../images/catalog/jewelry/j7.png';
import j8 from '../images/catalog/jewelry/j8.png';
import j9 from '../images/catalog/jewelry/j9.png';
import j10 from '../images/catalog/jewelry/j10.png';
import j11 from '../images/catalog/jewelry/j11.png';
import Navbar from '../navbar';

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
  const [selectedSunglasses, setSelectedSunglasses] = useState(null);
  const [selectedJewelry, setSelectedJewelry] = useState(null);
  const [buyImage, setBuyImage] = useState(require('../images/blush.jpg'));  
  const [productID, setProductID] = useState(null);

  useEffect(() => {
    if (location.state?.imageSource) {
      setImageSource(location.state.imageSource);
    }
  }, [location.state]); 

  const handleBack = async () => {
    resetSunglasses();
    resetJewelry();
    setShowSunglassesProducts(false);
    setShowJewelryProducts(false);
  }
  const handleSunglassesBtnClick = async () => {
    setShowSunglassesProducts(true);
  }
  const handleJewelryBtnClick = async () => {
    setShowJewelryProducts(true);
  }

  const handleSunglassesClick = (sunglasses, productName, pID) => {
    setProductID(pID);    
    let productImage = '../images/catalog/sunglasses/'+ productName + '.png';
    setBuyImage(productImage);
    setSelectedSunglasses(sunglasses);
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

  const handleJewelryClick = (jewelry, productName, pID) => {
    setProductID(pID);    
    let productImage = '../images/catalog/jewelry/'+ productName + '.png';
    setBuyImage(productImage);
    setSelectedJewelry(jewelry);
    const jewelryName = jewelry.split('/').pop().split('.')[0]; 

    fetch('http://localhost:5000/select-jewelry', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jewelry: jewelryName }), 
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => console.error("Error in handleJewelryClick:", error));
};

  
  const handleMakeupBtnClick = () => {
    resetSunglasses();
    resetJewelry();
    navigate('/virtual-try-on-live', { state: { imageSource } });
  };

  const resetSunglasses = () => {
    fetch('http://localhost:5000/reset-sunglasses', {  
      method: 'POST',
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error("Error in reset:", error));
  };

  const resetJewelry = () => {
    fetch('http://localhost:5000/reset-jewelry', {  
      method: 'POST',
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error("Error in reset:", error));
  };
  
  const directBuyProduct = () => {
    console.log("ProductID: " + productID);
    const productNumber = parseInt(productID.replace('P', ''), 10);
    console.log("productNumber: " + productNumber);
    if (productNumber >= 70)
      navigate(`/jewelryProductDescription/${productID}`);
    else if (productNumber < 70)
      navigate(`/sunglassesProductDescription/${productID}`);
    else
      navigate('/accessory-catalog');
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
              {(showJewelryProducts || showSunglassesProducts) && (
                <>
                  <button id="side-btn" onClick={directBuyProduct}>
                    <img src={buyImage} alt="Buy" className="button-icon" />
                    <span>Buy</span>
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="controls">
            { showSunglassesProducts ? (
              <div className="product-options-container">
                <div className="product-options">
                <button className="back-option" onClick={handleBack}>
                  <i className="fa fa-caret-left" style={{ fontSize: '20px' }}></i></button>
                <button className="reset-option" onClick={resetSunglasses}></button>
                <button className="sg-option" onClick={() => handleSunglassesClick(s1, 'sg-1', 'P061')} style={{ border: selectedSunglasses === s1 ? '2px solid #646363' : 'none' }}>
                    <img src={s1} alt="Option A" />
                </button>
                <button className="sg-option" onClick={() => handleSunglassesClick(s2, 'sg-2', 'P062')} style={{ border: selectedSunglasses === s2 ? '2px solid #646363' : 'none' }}>
                    <img src={s2} alt="Option B" />
                </button>
                <button className="sg-option" onClick={() => handleSunglassesClick(s3, 'sg-3', 'P063')} style={{ border: selectedSunglasses === s3 ? '2px solid #646363' : 'none' }}>
                    <img src={s3} alt="Option C" />
                </button>
                <button className="sg-option" onClick={() => handleSunglassesClick(s4, 'sg-4', 'P064')} style={{ border: selectedSunglasses === s4 ? '2px solid #646363' : 'none' }}>
                    <img src={s4} alt="Option D" />
                </button>
                <button className="sg-option" onClick={() => handleSunglassesClick(s5, 'sg-5', 'P065')} style={{ border: selectedSunglasses === s5 ? '2px solid #646363' : 'none' }}>
                    <img src={s5} alt="Option E" />
                </button>
                <button className="sg-option" onClick={() => handleSunglassesClick(s6, 'sg-6', 'P066')} style={{ border: selectedSunglasses === s6 ? '2px solid #646363' : 'none' }}>
                    <img src={s6} alt="Option F" />
                </button>
                <button className="sg-option" onClick={() => handleSunglassesClick(s7, 'sg-1', 'P067')} style={{ border: selectedSunglasses === s7 ? '2px solid #646363' : 'none' }}>
                    <img src={s7} alt="Option G" />
                </button>
                <button className="sg-option" onClick={() => handleSunglassesClick(s8, 'sg-8', 'P068')} style={{ border: selectedSunglasses === s8 ? '2px solid #646363' : 'none' }}>
                    <img src={s8} alt="Option H" />
                </button>
                </div>
              </div>
            ) : showJewelryProducts ? (
              <div className="product-options-container">
                <div className="product-options">
                <button className="back-option" onClick={handleBack}>
                  <i className="fa fa-caret-left" style={{ fontSize: '20px' }}></i></button>
                <button className="reset-option" onClick={resetJewelry}></button>
                <button className="j-option" onClick={() => handleJewelryClick(j1, 'j1', 'P071')} style={{ border: selectedJewelry === j1 ? '2px solid #646363' : 'none' }}>
                    <img src={j1} alt="Option 1" />
                </button>
                <button className="j-option" onClick={() => handleJewelryClick(j2, 'j2', 'P072')} style={{ border: selectedJewelry === j2 ? '2px solid #646363' : 'none' }}>
                    <img src={j2} alt="Option 2" />
                </button>
                <button className="j-option" onClick={() => handleJewelryClick(j3, 'j3', 'P073')} style={{ border: selectedJewelry === j3 ? '2px solid #646363' : 'none' }}>
                    <img src={j3} alt="Option 1" />
                </button>
                <button className="j-option" onClick={() => handleJewelryClick(j4, 'j4', 'P074')} style={{ border: selectedJewelry === j4 ? '2px solid #646363' : 'none' }}>
                    <img src={j4} alt="Option 2" />
                </button>
                  <button
                    className="j-option"
                    onClick={() => handleJewelryClick(j6, 'j6', 'P076')}
                    style={{ border: selectedJewelry === j6 ? '2px solid #646363' : 'none' }}
                  >
                    <img src={j6} alt="Option 2" />
                  </button>
                  <button
                    className="j-option"
                    onClick={() => handleJewelryClick(j7, 'j7', 'P077')}
                    style={{ border: selectedJewelry === j7 ? '2px solid #646363' : 'none' }}
                  >
                    <img src={j7} alt="Option 2" />
                  </button>
                  <button
                    className="j-option"
                    onClick={() => handleJewelryClick(j8, 'j8', 'P078')}
                    style={{ border: selectedJewelry === j8 ? '2px solid #646363' : 'none' }}
                  >
                    <img src={j8} alt="Option 2" />
                  </button>
                  <button
                    className="j-option"
                    onClick={() => handleJewelryClick(j9, 'j9', 'P079')}
                    style={{ border: selectedJewelry === j9 ? '2px solid #646363' : 'none' }}
                  >
                    <img src={j9} alt="Option 2" />
                  </button>
                  <button
                    className="j-option"
                    onClick={() => handleJewelryClick(j10, 'j10', 'P080')}
                    style={{ border: selectedJewelry === j10 ? '2px solid #646363' : 'none' }}
                  >
                    <img src={j10} alt="Option 2" />
                  </button>
                  <button
                    className="j-option"
                    onClick={() => handleJewelryClick(j11, 'j11', 'P081')}
                    style={{ border: selectedJewelry === j11 ? '2px solid #646363' : 'none' }}
                  >
                    <img src={j11} alt="Option 2" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="type-options">
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
