import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './vto.css';
import cmp from '../images/compare.jpg';
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
import axios from 'axios';

const VirtualTryOnAccessory = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [imageSource, setImageSource] = useState(defaultModel);
  const [processedImage, setProcessedImage] = useState(null);
  const [showSunglassesProducts, setShowSunglassesProducts] = useState(false);
  const [showJewelryProducts, setShowJewelryProducts] = useState(false);
  const [selectedSunglasses, setSelectedSunglasses] = useState(null);
  const [selectedJewelry, setSelectedJewelry] = useState(null);
  const [buyImage, setBuyImage] = useState(require('../images/blush.jpg'));
  const [sliderValue, setSliderValue] = useState(50);
  const [showComparison, setShowComparison] = useState(false);  
  const [productID, setProductID] = useState(null);

  useEffect(() => {
    if (location.state?.imageSource) {
      setImageSource(location.state.imageSource);
    }
  }, [location.state]);

  const handleBack = async () => {
    setShowSunglassesProducts(false);
    setShowJewelryProducts(false);
  };

  const handleSunglassesBtnClick = async () => {
    setShowSunglassesProducts(true);
  };

  const handleJewelryBtnClick = async () => {
    setShowJewelryProducts(true);
  };

  const handleSunglassesClick = async (sunglasses, sunglassesName, pID) => {
    setProductID(pID);    
    let productImage = '../images/catalog/sunglasses/' + sunglassesName + '.png';
    setBuyImage(productImage);
    setSelectedSunglasses(sunglasses);

    const formData = new FormData();

    let imageFile;
    if (location.state?.uploadPhoto) {
      imageFile = location.state.imageSource;
    } else if (location.state?.imageSource) {
      const response = await fetch(imageSource);
      const blob = await response.blob();
      imageFile = new File([blob], location.state.imageSource, { type: blob.type });
    } else {
      const response = await fetch(defaultModel);
      const blob = await response.blob();
      imageFile = new File([blob], 'model.jpg', { type: blob.type });
    }

    console.log('Image File:', imageFile);
    console.log('Sunglasses', selectedSunglasses);
    formData.append('image', imageFile);
    formData.append('sunglasses', sunglassesName);

    try {
      const response = await axios.post('http://localhost:5000/sunglasses-try-on', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setProcessedImage(response.data.processed_image_url);
    } catch (error) {
      console.error('Error processing sunglasses:', error);
      alert('Failed to process sunglasses. Please try again.');
    }
  };

  const handleJewelryClick = async (jewelry, jewelryName, pID) => {
    setProductID(pID);
    let productImage = '../images/catalog/jewelry/' + jewelryName + '.png';
    setBuyImage(productImage);
    setSelectedJewelry(jewelry);

    const formData = new FormData();

    try {
      let imageFile;
      if (location.state?.uploadPhoto) {
        imageFile = location.state.imageSource;
      } else if (location.state?.imageSource) {
        const response = await fetch(imageSource);
        const blob = await response.blob();
        imageFile = new File([blob], location.state.imageSource, { type: blob.type });
      } else {
        const response = await fetch(defaultModel);
        const blob = await response.blob();
        imageFile = new File([blob], 'model.jpg', { type: blob.type });
      }

      console.log('Image File:', imageFile);
      console.log('Jewelry', selectedJewelry);
      formData.append('image', imageFile);
      formData.append('jewelry', jewelryName);

      const response = await axios.post('http://localhost:5000/jewelry-try-on', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.processed_image_url) {
        setProcessedImage(response.data.processed_image_url);
      } else {
        alert('Jewelry applied, but no processed image was returned.');
      }
    } catch (error) {
      console.error('Error processing jewelry:', error);
      const errorMessage =
        error.response?.data?.error || 'Failed to process jewelry. Please try again.';
      alert(errorMessage);
    }
  };

  const handleMakeupBtnClick = () => {
    handleReset();
    navigate('/virtual-try-on', { state: { imageSource } });
  };

  const handleReset = () => {
    setSelectedSunglasses(null);
    setProcessedImage(null);
    setImageSource(imageSource);
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

  const handleCompareClick = () => {
    setShowComparison(!showComparison);
  };

  const renderComparisonSlider = () => {
    return (
      <div className="comparison-slider">
        <img
          className="image-before slider-image"
          src={imageSource}
          alt="Original"
        />
        <img
          className="image-after slider-image"
          src={processedImage}
          alt="Processed"
          style={{ clipPath: `inset(0 ${100 - sliderValue}% 0 0)` }}
        />
        <input
          type="range"
          min="0"
          max="100"
          value={sliderValue}
          onChange={(e) => setSliderValue(e.target.value)}
          className="slider"
        />
        <div
          className="slider-line"
          style={{ left: `${sliderValue}%` }}
          aria-hidden="true"
        ></div>
        <div
          className="slider-button"
          style={{ left: `${sliderValue}%` }}
          aria-hidden="true"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            viewBox="0 0 256 256"
          >
            <rect width="256" height="256" fill="none"></rect>
            <line
              x1="128"
              y1="40"
              x2="128"
              y2="216"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            ></line>
            <line
              x1="96"
              y1="128"
              x2="16"
              y2="128"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            ></line>
            <polyline
              points="48 160 16 128 48 96"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            ></polyline>
            <line
              x1="160"
              y1="128"
              x2="240"
              y2="128"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            ></line>
            <polyline
              points="208 96 240 128 208 160"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            ></polyline>
          </svg>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="header">V-Glam Closet</div>
      <Navbar />

      <div className="virtual-tryon-container">
        <h3>
          <b>VIRTUAL TRY-ON</b>
        </h3>
        <p>
          Time to make up your mind! Experience your perfect makeup shades or try a bold new look
          with our virtual try-on tool.
        </p>

        <div className="tryon-ui">
          <div className="photo-area">
            <div className="model-container">
              {showComparison ? (
                renderComparisonSlider()
              ) : processedImage ? (
                <img id="user-photo" src={processedImage} alt="Processed" />
              ) : (
                <img id="user-photo" src={imageSource} alt="User" />
              )}
            </div>
          </div>

          <div className="col-12 col-md-2">
            <div className="button-container">
              {(showJewelryProducts || showSunglassesProducts) && (
                <>
                  <button id="side-btn-vto" onClick={handleCompareClick}>
                    <img src={cmp} alt="Compare" className="button-icon" />
                    <span>Compare</span>
                  </button>
                  <button id="side-btn" onClick={directBuyProduct}>
                    <img src={buyImage} alt="Buy" className="button-icon" />
                    <span>Buy</span>
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="controls">
            {showSunglassesProducts ? (
              <div className="product-options-container">
                <div className="product-options">
                  <button className="back-option" onClick={handleBack}>
                    <i className="fa fa-caret-left" style={{ fontSize: '20px' }}></i>
                  </button>
                  <button className="reset-option" onClick={handleReset}></button>
                  <button
                    className="sg-option"
                    onClick={() => handleSunglassesClick(s1, 'sg-1', 'P061')}
                    style={{ border: selectedSunglasses === s1 ? '2px solid #646363' : 'none' }}
                  >
                    <img src={s1} alt="Option A" />
                  </button>
                  <button
                    className="sg-option"
                    onClick={() => handleSunglassesClick(s2, 'sg-2', 'P062')}
                    style={{ border: selectedSunglasses === s2 ? '2px solid #646363' : 'none' }}
                  >
                    <img src={s2} alt="Option B" />
                  </button>
                  <button
                    className="sg-option"
                    onClick={() => handleSunglassesClick(s3, 'sg-3', 'P063')}
                    style={{ border: selectedSunglasses === s3 ? '2px solid #646363' : 'none' }}
                  >
                    <img src={s3} alt="Option C" />
                  </button>
                  <button
                    className="sg-option"
                    onClick={() => handleSunglassesClick(s4, 'sg-4', 'P064')}
                    style={{ border: selectedSunglasses === s4 ? '2px solid #646363' : 'none' }}
                  >
                    <img src={s4} alt="Option D" />
                  </button>
                  <button
                    className="sg-option"
                    onClick={() => handleSunglassesClick(s5, 'sg-5', 'P065')}
                    style={{ border: selectedSunglasses === s5 ? '2px solid #646363' : 'none' }}
                  >
                    <img src={s5} alt="Option E" />
                  </button>
                  <button
                    className="sg-option"
                    onClick={() => handleSunglassesClick(s6, 'sg-6', 'P066')}
                    style={{ border: selectedSunglasses === s6 ? '2px solid #646363' : 'none' }}
                  >
                    <img src={s6} alt="Option F" />
                  </button>
                  <button
                    className="sg-option"
                    onClick={() => handleSunglassesClick(s7, 'sg-7', 'P067')}
                    style={{ border: selectedSunglasses === s7 ? '2px solid #646363' : 'none' }}
                  >
                    <img src={s7} alt="Option G" />
                  </button>
                  <button
                    className="sg-option"
                    onClick={() => handleSunglassesClick(s8, 'sg-8', 'P068')}
                    style={{ border: selectedSunglasses === s8 ? '2px solid #646363' : 'none' }}
                  >
                    <img src={s8} alt="Option H" />
                  </button>
                </div>
              </div>
            ) : showJewelryProducts ? (
              <div className="product-options-container">
                <div className="product-options">
                  <button className="back-option" onClick={handleBack}>
                    <i className="fa fa-caret-left" style={{ fontSize: '20px' }}></i>
                  </button>
                  <button className="reset-option" onClick={handleReset}></button>
                  <button
                    className="j-option"
                    onClick={() => handleJewelryClick(j1, 'j1', 'P071')}
                    style={{ border: selectedJewelry === j1 ? '2px solid #646363' : 'none' }}
                  >
                    <img src={j1} alt="Option 1" />
                  </button>
                  <button
                    className="j-option"
                    onClick={() => handleJewelryClick(j2, 'j2', 'P072')}
                    style={{ border: selectedJewelry === j2 ? '2px solid #646363' : 'none' }}
                  >
                    <img src={j2} alt="Option 2" />
                  </button>
                  <button
                    className="j-option"
                    onClick={() => handleJewelryClick(j3, 'j3', 'P073')}
                    style={{ border: selectedJewelry === j3 ? '2px solid #646363' : 'none' }}
                  >
                    <img src={j3} alt="Option 1" />
                  </button>
                  <button
                    className="j-option"
                    onClick={() => handleJewelryClick(j4, 'j4', 'P074')}
                    style={{ border: selectedJewelry === j4 ? '2px solid #646363' : 'none' }}
                  >
                    <img src={j4} alt="Option 2" />
                  </button>
                  <button
                    className="j-option"
                    onClick={() => handleJewelryClick(j5, 'j5', 'P075')}
                    style={{ border: selectedJewelry === j5 ? '2px solid #646363' : 'none' }}
                  >
                    <img src={j5} alt="Option 2" />
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
                  Sunglasses
                </button>
                <button className="product-option" onClick={() => handleJewelryBtnClick()}>
                  Jewelry
                </button>
              </div>
            )}

            <div className="action-buttons-ac-vto">
              <button id="ac-btn" onClick={() => handleMakeupBtnClick()}>
                Makeup
              </button>
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

export default VirtualTryOnAccessory;