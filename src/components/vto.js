import React, { useState, useEffect } from 'react'; 
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './vto.css';
import cmp from './images/compare.jpg'
import buy from './images/blush.jpg'
import ss from './images/glitter_eyeshadows/strawberry-stacked.png'
import gf from './images/glitter_eyeshadows/grapefruit.png'
import fg from './images/glitter_eyeshadows/feeling-grape.png'
import rr from './images/glitter_eyeshadows/raspberry-rave.png'
import bb from './images/glitter_eyeshadows/blueberry-bank.png'
import ww from './images/glitter_eyeshadows/watermelon-wealth.png'
import defaultModel from './images/models/model1.png';
import axios from 'axios';
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
  const [selectedBlush, setSelectedBlush] = useState(null);
  const [selectedLipstick, setSelectedLipstick] = useState(null);
  const [selectedEyeShadow, setSelectedEyeShadow] = useState(null);

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
  const handleBlushClick = async (blushId) => {
    const validBlushIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    if (!validBlushIds.includes(blushId)) {
        alert("Invalid blush selection.");
        return;
    }
    setSelectedBlush(blushId);
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
    formData.append('image', imageFile);
    formData.append('blush', blushId.toString());
    try {
        const response = await axios.post('http://localhost:5000/apply-blush', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        if (response.data.status === "success") {
            setProcessedImage(response.data.processed_image_url);
        } else {
            console.error('Failed to apply blush:', response.data.message);
            alert('Failed to apply blush. Please try again.');
        }
    } catch (error) {
        console.error('Error in handleBlushClick:', error);
        alert('Failed to apply blush. Please try again.');
    }
};

const handleLipstickClick = async (lipstickId) => {
  setSelectedLipstick(lipstickId);

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

  formData.append('image', imageFile);
  formData.append('lipstick', lipstickId);

  try {
    const response = await axios.post('http://localhost:5000/apply-lipstick', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (response.data.status === "success") {
        setProcessedImage(response.data.processed_image_url);
    } else {
        console.error('Failed to apply lipstick:', response.data.message);
        alert('Failed to apply lipstick. Please try again.');
    }
} catch (error) {
    console.error('Error in handleLipstickClick:', error);
    alert('Failed to apply lipstick. Please try again.');
}
};

const handleEyeShadowClick = async (eyeShadowColor, eyeShadowName, isGlitter) => {
    setSelectedEyeShadow(eyeShadowName);

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
    formData.append('image', imageFile);
    formData.append('eyeShadow', eyeShadowColor);
    formData.append('glitter', isGlitter);

    try {
        const response = await axios.post('http://localhost:5000/eyeshadow-try-on', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        setProcessedImage(response.data.processed_image_url);
    } catch (error) {
        console.error('Error processing eyeshadow:', error);
        alert('Failed to apply eyeshadow. Please try again.');
    }
  };
  
  const handleAccessoryBtnClick = () => {
      navigate('/virtual-try-on-accessory', { state: { imageSource }});
  };

  const handleReset = () => {
    setSelectedFoundation(null);
    setSelectedLipstick(null);
    setSelectedEyeShadow(null);
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
          <div className="row">
            <div className="col-12 col-md-10">
              <div className="photo-area">
                <div className="model-container">
                  {processedImage ? (
                    <img id="user-photo" src={processedImage} alt="Processed" />
                  ) : (
                    <img id="user-photo" src={imageSource} alt="User" />
                  )}
                </div>
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
                  <button className="makeup-option" onClick={() => handleLipstickClick(1)} style={{ background: 'rgb(151, 15, 33)' }}></button>
                  <button className="makeup-option" onClick={() => handleLipstickClick(2)} style={{ background: 'rgb(195, 83, 83)' }}></button>
                  <button className="makeup-option" onClick={() => handleLipstickClick(3)} style={{ background: 'rgb(195, 73, 99)' }}></button>
                  <button className="makeup-option" onClick={() => handleLipstickClick(4)} style={{ background: 'rgb(226, 16, 17)' }}></button>
                  <button className="makeup-option" onClick={() => handleLipstickClick(5)} style={{ background: 'rgb(135, 10, 44)' }}></button>
                  <button className="makeup-option" onClick={() => handleLipstickClick(6)} style={{ background: 'rgb(173, 89, 89)' }}></button>
                  <button className="makeup-option" onClick={() => handleLipstickClick(7)} style={{ background: 'rgb(141, 70, 76)' }}></button>
                  <button className="makeup-option" onClick={() => handleLipstickClick(8)} style={{ background: 'rgb(185, 0, 37)' }}></button>
                  <button className="makeup-option" onClick={() => handleLipstickClick(9)} style={{ background: 'rgb(218, 67, 90)' }}></button>
                  <button className="makeup-option" onClick={() => handleLipstickClick(10)} style={{ background: 'rgb(191, 69, 89)' }}></button>
                </div>
              </div>
            ) : showBlushProducts ? (
              //blush from nars-powder blush
              <div className="product-options-container">
                <div className="product-options">
                <button className="back-option" onClick={handleBack}>
                  <i className="fa fa-caret-left" style={{ fontSize: '20px' }}></i></button>
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
            ) : showEyeShadowProducts ? (
              //eye shadow from nars-hardwired eyeshadow
              <div className="product-options-container">
                <div className="product-options">
                <button className="back-option" onClick={handleBack}>
                  <i className="fa fa-caret-left" style={{ fontSize: '20px' }}></i></button>
                <button className="reset-option" onClick={handleReset}></button>
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
          </div>

          <div className="action-buttons">
            <button id="mk-btn">Makeup</button>
            <button id="ac-btn" onClick={() => handleAccessoryBtnClick()}>Accessory</button>
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
