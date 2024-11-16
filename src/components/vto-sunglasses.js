import React, { useState, useEffect } from 'react'; 
import { useLocation } from 'react-router-dom';
import './vto.css';
import defaultModel from './images/models/model1.png';
import a from './images/sunglasses/sg-1.png';
import b from './images/sunglasses/sg-2.png';
import c from './images/sunglasses/sg-3.png';
import d from './images/sunglasses/sg-4.png';
import e from './images/sunglasses/sg-5.png';
import f from './images/sunglasses/sg-6.png';
import g from './images/sunglasses/sg-7.png';
import h from './images/sunglasses/sg-8.png';
import Navbar from './navbar';
import axios, { formToJSON } from 'axios';

const VirtualTryOn = () => {
  const location = useLocation();
  const [imageSource, setImageSource] = useState(defaultModel);
  const [selectedSunglasses, setSelectedSunglasses] = useState(null);
  const [processedImage, setProcessedImage] = useState(null); 

  useEffect(() => {
    if (location.state?.selectedModel) {
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

  const handleSunglassesClick = async (sunglasses, sunglassesName) => {
    setSelectedSunglasses(sunglasses);
    
    const formData = new FormData();
    
    let imageFile;
    if (location.state?.uploadPhoto) {
      imageFile = location.state.uploadPhoto;
    } else if (location.state?.selectedModel) {
      const response = await fetch(imageSource);
      const blob = await response.blob();
      imageFile = new File([blob], location.state.selectedModel, { type: blob.type });
    } else {
      const response = await fetch(defaultModel);
      const blob = await response.blob();
      imageFile = new File([blob], "model.jpg", { type: blob.type });
    }

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

  const handleReset = () => {
    setSelectedSunglasses(null);
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
            <div className="product-options">
              <button className="product-option" onClick={handleReset}>
                <i className="fa fa-ban" style={{ color: '#7b7b7b', marginLeft: '15px', border: '1px solid #7b7b7b', padding: '5px', fontSize: '36px' }}></i>
              </button>
              <button className="product-option" onClick={() => handleSunglassesClick(a, 'sg-1')}>
                <img src={a} alt="Option A" />
              </button>
              <button className="product-option" onClick={() => handleSunglassesClick(b, 'sg-2')}>
                <img src={b} alt="Option B" />
              </button>
              <button className="product-option" onClick={() => handleSunglassesClick(c, 'sg-3')}>
                <img src={c} alt="Option C" />
              </button>
              <button className="product-option" onClick={() => handleSunglassesClick(d, 'sg-4')}>
                <img src={d} alt="Option D" />
              </button>
              <button className="product-option" onClick={() => handleSunglassesClick(e, 'sg-5')}>
                <img src={e} alt="Option E" />
              </button>
              <button className="product-option" onClick={() => handleSunglassesClick(f, 'sg-6')}>
                <img src={f} alt="Option F" />
              </button>
              <button className="product-option" onClick={() => handleSunglassesClick(g, 'sg-7')}>
                <img src={g} alt="Option G" />
              </button>
              <button className="product-option" onClick={() => handleSunglassesClick(h, 'sg-8')}>
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

export default VirtualTryOn;
