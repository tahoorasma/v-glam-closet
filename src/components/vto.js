import React, { useState, useEffect } from 'react'; 
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './vto.css';
import defaultModel from './images/models/model1.png';
import axios, { formToJSON } from 'axios';
import Navbar from './navbar';

const VirtualTryOn = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [imageSource, setImageSource] = useState(defaultModel);
  const [processedImage, setProcessedImage] = useState(null); 
  const [showFoundationProducts, setShowFoundationProducts] = useState(false);
  const [showLipstickProducts, setShowLipstickProducts] = useState(false);
  const [showBlushProducts, setShowBlushProducts] = useState(false);
  const [showEyeShadowProducts, setShowEyeShadowProducts] = useState(false);
  const [selectedFoundation, setSelectedFoundation] = useState(null);
  const [selectedLipstick, setSelectedLipstick] = useState(null);

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
      if (location.state?.uploadPhoto) {
        const reader = new FileReader();
        reader.onload = (e) => setImageSource(e.target.result);
        reader.readAsDataURL(location.state.uploadPhoto);
        return;
    }
    
    }
  }, [location.state]);  

  const handleBack = async () => {
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
  const handleFoundationClick = async (shadeColor, shadeName) => {
    setSelectedFoundation(shadeName);

    const formData = new FormData();

    let imageFile;
    try {
        if (location.state?.uploadPhoto) {
            imageFile = location.state.uploadPhoto;
        } else if (location.state?.selectedModel) {
          const response = await fetch(imageSource);
            const blob = await response.blob();
            imageFile = new File([blob], imageSource, { type: blob.type });
        } else if (location.state?.imageSource) {
            const response = await fetch(imageSource);
            const blob = await response.blob();
            imageFile = new File([blob], imageSource, { type: blob.type });
        } else {
            const response = await fetch(defaultModel);
            const blob = await response.blob();
            imageFile = new File([blob], "model.jpg", { type: blob.type });
        }
    } catch (error) {
        console.error("Error fetching the image:", error);
        alert("Failed to load image. Please check your setup.");
        return;
    }

    if (!imageFile) {
        console.error("No valid image file found.");
        alert("No valid image available for processing.");
        return;
    }
    console.log("Image File:", imageFile);
    console.log("Foundation Shade:", shadeColor);

    formData.append('image', imageFile);
    formData.append('foundation', shadeColor);

    try {
        const response = await axios.post('http://localhost:5000/foundation-try-on', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        setProcessedImage(response.data.processed_image_url);
    } catch (error) {
        console.error('Error processing foundation:', error);
        alert('Failed to apply foundation. Please try again.');
    }
  };

  const handleLipstickClick = async (shadeColor, shadeName) => {
    setSelectedLipstick(shadeName);
  
    const formData = new FormData();
  
    let imageFile;
    try {
      if (location.state?.uploadPhoto) {
        imageFile = location.state.uploadPhoto;
      } else if (location.state?.selectedModel) {
        const response = await fetch(imageSource);
        const blob = await response.blob();
        imageFile = new File([blob], imageSource, { type: blob.type });
      } else if (location.state?.imageSource) {
        const response = await fetch(imageSource);
        const blob = await response.blob();
        imageFile = new File([blob], imageSource, { type: blob.type });
      } else {
        const response = await fetch(defaultModel);
        const blob = await response.blob();
        imageFile = new File([blob], "model.jpg", { type: blob.type });
      }
    } catch (error) {
      console.error("Error fetching the image:", error);
      alert("Failed to load image. Please check your setup.");
      return;
    }
  
    if (!imageFile) {
      console.error("No valid image file found.");
      alert("No valid image available for processing.");
      return;
    }
    console.log("Image File:", imageFile);
    console.log("Lipstick shade:", shadeColor);
  
    formData.append('image', imageFile);
    formData.append('lipstick', shadeColor);
  
    try {
      const response = await axios.post('http://localhost:5000/lipstick-try-on', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setProcessedImage(response.data.processed_image_url);
    } catch (error) {
      console.error('Error processing lipstick:', error);
      alert('Failed to apply lipstick. Please try again.');
    }
  };
  
  const handleBlushClick = async () => {}
  const handleEyeShadowClick = async () => {}

  const handleNext = () => {
    const optionsContainer = document.querySelector('.product-options');
    optionsContainer.scrollBy({ left: 100, behavior: 'smooth' });
  };
  
  const handlePrev = () => {
    const optionsContainer = document.querySelector('.product-options');
    optionsContainer.scrollBy({ left: -100, behavior: 'smooth' });
  };  
  
  const handleAccessoryBtnClick = () => {
      navigate('/virtual-try-on-accessory', { state: { imageSource }});
  };

  const handleReset = () => {
    setSelectedFoundation(null);
    setSelectedLipstick(null);
    setProcessedImage(null); 
    setImageSource(imageSource);
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
              {processedImage ? (
                <img id="user-photo" src={processedImage} alt="Processed" />
              ) : (
                <img id="user-photo" src={imageSource} alt="User" />
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
                <button className="reset-option" onClick={handleReset}></button>
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
                  {/* */}
                </div>
              </div>
            ) : showLipstickProducts ? (
              //lipstick from maybelline-super stay vinyl ink
              <div className="product-options-container">
                <div className="product-options">
                <button className="back-option" onClick={handleBack}>
                  <i className="fa fa-caret-left" style={{ fontSize: '20px' }}></i></button>
                <button className="reset-option" onClick={handleReset}></button>
                  <button className="makeup-option" onClick={() => handleLipstickClick('#970d22', 'lippy')} style={{ background: 'rgb(151, 15, 33)' }}></button>
                  <button className="makeup-option" onClick={() => handleLipstickClick('#c35353', 'peachy')} style={{ background: 'rgb(195, 83, 83)' }}></button>
                  <button className="makeup-option" onClick={() => handleLipstickClick('#c34963', 'coy')} style={{ background: 'rgb(195, 73, 99)' }}></button>
                  <button className="makeup-option" onClick={() => handleLipstickClick('#e21011', 'red-hot')} style={{ background: 'rgb(226, 16, 17)' }}></button>
                  <button className="makeup-option" onClick={() => handleLipstickClick('#870a2c', 'unrivaled')} style={{ background: 'rgb(135, 10, 44)' }}></button>
                  <button className="makeup-option" onClick={() => handleLipstickClick('#ad5959', 'cheeky')} style={{ background: 'rgb(173, 89, 89)' }}></button>
                  <button className="makeup-option" onClick={() => handleLipstickClick('#8d464c', 'witty')} style={{ background: 'rgb(141, 70, 76)' }}></button>
                  <button className="makeup-option" onClick={() => handleLipstickClick('#b90025', 'wicked')} style={{ background: 'rgb(185, 0, 37)' }}></button>
                  <button className="makeup-option" onClick={() => handleLipstickClick('#da435a', 'rogue')} style={{ background: 'rgb(218, 67, 90)' }}></button>
                  <button className="makeup-option" onClick={() => handleLipstickClick('#bf4559', 'sultry')} style={{ background: 'rgb(191, 69, 89)' }}></button>
                </div>
              </div>
            ) : showBlushProducts ? (
              //blush from nars-powder blush
              <div className="product-options-container">
                <div className="product-options">
                <button className="back-option" onClick={handleBack}>
                  <i className="fa fa-caret-left" style={{ fontSize: '20px' }}></i></button>
                <button className="reset-option" onClick={handleReset}></button>
                  <button className="makeup-option" onClick={() => handleBlushClick()} style={{ background: '#faa7a6' }} alt="777"></button>
                  <button className="makeup-option" onClick={() => handleBlushClick()} style={{ background: '#f58a8f' }} alt="778"></button>
                  <button className="makeup-option" onClick={() => handleBlushClick()} style={{ background: '#ff8288' }} alt="776"></button>
                  <button className="makeup-option" onClick={() => handleBlushClick()} style={{ background: '#a84d4b' }} alt="775"></button>
                  <button className="makeup-option" onClick={() => handleBlushClick()} style={{ background: '#ef8e8d' }} alt="237"></button>
                  <button className="makeup-option" onClick={() => handleBlushClick()} style={{ background: '#ed6f5e' }} alt="923"></button>
                  <button className="makeup-option" onClick={() => handleBlushClick()} style={{ background: '#b86262' }} alt="901"></button>
                  <button className="makeup-option" onClick={() => handleBlushClick()} style={{ background: '#bf636b' }} alt="888"></button>
                  <button className="makeup-option" onClick={() => handleBlushClick()} style={{ background: '#df7b7e' }} alt="252"></button>
                  <button className="makeup-option" onClick={() => handleBlushClick()} style={{ background: '#af6163' }} alt="902"></button>
                </div>
              </div>
            ) : showEyeShadowProducts ? (
              //eye shadow from nars-hardwired eyeshadow
              <div className="product-options-container">
                <div className="product-options">
                <button className="back-option" onClick={handleBack}>
                  <i className="fa fa-caret-left" style={{ fontSize: '20px' }}></i></button>
                <button className="reset-option" onClick={handleReset}></button>
                  <button className="eyeshadow-option" onClick={() => handleEyeShadowClick()} style={{ background: '#f19ea1' }} alt="melrose"></button>
                  <button className="eyeshadow-option" onClick={() => handleEyeShadowClick()} style={{ background: '#e9a486' }} alt="pattaya"></button>
                  <button className="eyeshadow-option" onClick={() => handleEyeShadowClick()} style={{ background: '#dd8776' }} alt="mendoza"></button>
                  <button className="eyeshadow-option" onClick={() => handleEyeShadowClick()} style={{ background: '#916982' }} alt="madrid"></button>
                  <button className="eyeshadow-option" onClick={() => handleEyeShadowClick()} style={{ background: '#bd8797' }} alt="earthshine"></button>
                  <button className="eyeshadow-option" onClick={() => handleEyeShadowClick()} style={{ background: '#af8070' }} alt="firenze"></button>
                  <button className="eyeshadow-option" onClick={() => handleEyeShadowClick()} style={{ background: '#831e76' }} alt="chile"></button>
                  <button className="eyeshadow-option" onClick={() => handleEyeShadowClick()} style={{ background: '#e4bd9b' }} alt="rio"></button>
                </div>
              </div>
            ) : (
              <div className="product-options">
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

export default VirtualTryOn;
