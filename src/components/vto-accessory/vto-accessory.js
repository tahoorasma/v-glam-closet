import React, { useState, useEffect } from 'react'; 
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './vto.css';
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

  useEffect(() => {
    if (location.state?.imageSource) {
      setImageSource(location.state.imageSource);
    }
  }, [location.state]); 

  const handleBack = async () => {
    setShowSunglassesProducts(false);
    setShowJewelryProducts(false);
  }
  const handleSunglassesBtnClick = async () => {
    setShowSunglassesProducts(true);
  }
  const handleJewelryBtnClick = async () => {
    setShowJewelryProducts(true);
  }
  const handleSunglassesClick = async (sunglasses, sunglassesName) => {
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
      imageFile = new File([blob], "model.jpg", { type: blob.type });
    }
    console.log("Image File:", imageFile);
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

  const handleJewelryClick = async (jewelry, jewelryName) => {
    setSelectedJewelry(jewelry);

    const formData = new FormData();

    try {
        // Determine the image source
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
            imageFile = new File([blob], "model.jpg", { type: blob.type });
        }

        console.log("Image File:", imageFile);
        console.log('Jewelry', selectedJewelry);
        // Append image and jewelry data to the form
        formData.append("image", imageFile);
        formData.append("jewelry", jewelryName);

        // Send POST request to the backend
        const response = await axios.post('http://localhost:5000/jewelry-try-on', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        // Check for the processed image URL
        if (response.data.processed_image_url) {
            setProcessedImage(response.data.processed_image_url);
        } else {
            alert("Jewelry applied, but no processed image was returned.");
        }
    } catch (error) {
        console.error("Error processing jewelry:", error);

        // Handle errors, including the "No ears detected" case
        const errorMessage =
            error.response?.data?.error || "Failed to process jewelry. Please try again.";
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
            { showSunglassesProducts ? (
              <div className="product-options-container">
                <div className="product-options">
                <button className="back-option" onClick={handleBack}>
                  <i className="fa fa-caret-left" style={{ fontSize: '20px' }}></i></button>
                <button className="reset-option" onClick={handleReset}></button>
                    <button className="sg-option" onClick={() => handleSunglassesClick(s1, 'sg-1')}>
                        <img src={s1} alt="Option A" />
                    </button>
                    <button className="sg-option" onClick={() => handleSunglassesClick(s2, 'sg-2')}>
                        <img src={s2} alt="Option B" />
                    </button>
                    <button className="sg-option" onClick={() => handleSunglassesClick(s3, 'sg-3')}>
                        <img src={s3} alt="Option C" />
                    </button>
                    <button className="sg-option" onClick={() => handleSunglassesClick(s4, 'sg-4')}>
                        <img src={s4} alt="Option D" />
                    </button>
                    <button className="sg-option" onClick={() => handleSunglassesClick(s5, 'sg-5')}>
                        <img src={s5} alt="Option E" />
                    </button>
                    <button className="sg-option" onClick={() => handleSunglassesClick(s6, 'sg-6')}>
                        <img src={s6} alt="Option F" />
                    </button>
                    <button className="sg-option" onClick={() => handleSunglassesClick(s7, 'sg-7')}>
                        <img src={s7} alt="Option G" />
                    </button>
                    <button className="sg-option" onClick={() => handleSunglassesClick(s8, 'sg-8')}>
                        <img src={s8} alt="Option H" />
                    </button>
                </div>
              </div>
            ) : showJewelryProducts ? (
              <div className="product-options-container">
                <div className="product-options">
                <button className="back-option" onClick={handleBack}>
                  <i className="fa fa-caret-left" style={{ fontSize: '20px' }}></i></button>
                <button className="reset-option" onClick={handleReset}></button>
                    <button className="sg-option" onClick={() => handleJewelryClick(j1, 'j1')}>
                        <img src={j1} alt="Option 1" />
                    </button>
                    <button className="sg-option" onClick={() => handleJewelryClick(j2, 'j2')}>
                        <img src={j2} alt="Option 2" />
                    </button>
                    <button className="sg-option" onClick={() => handleJewelryClick(j3, 'j3')}>
                        <img src={j3} alt="Option 1" />
                    </button>
                    <button className="sg-option" onClick={() => handleJewelryClick(j4, 'j4')}>
                        <img src={j4} alt="Option 2" />
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

export default VirtualTryOnAccessory;
