import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './vto-modes.css';
import mdl from '../images/models/model1.png'; 
import model1 from '../images/models/model1.png';
import model2 from '../images/models/model2.jpg';
import model3 from '../images/models/model3.jpg';
import model4 from '../images/models/model4.jpg';
import model5 from '../images/models/model5.png';
import model6 from '../images/models/model6.png';
import Navbar from '../navbar';

const VirtualTryOn = () => {
  const [selectedModel, setSelectedModel] = useState(null); 
  const [shownModel, setShownModel] = useState(mdl); 
  const [uploadPhoto, setUploadPhoto] = useState(null);
  const [mode, setMode] = useState(null);
  const [showModelModal, setShowModelModal] = useState(false);
  const navigate = useNavigate();

  const handleUseModelClick = () => {
    setShowModelModal(true);
  };

  const handleModelSelect = (model, modelImage) => {
    console.log('Model Image Path:', model);
    setSelectedModel(modelImage);
    setShownModel(model);
    setShowModelModal(false); 
  };

  const handleUploadPhotoClick = (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    console.log('Model Image Path:', imageUrl);
    setUploadPhoto(file);
    setShownModel(imageUrl);
    setMode('upload');
  };

  const handleProceed = () => {
    if (selectedModel) {
      navigate('/virtual-try-on', { state: { selectedModel } });
    } else if (uploadPhoto) {
      navigate('/virtual-try-on', { state: { uploadPhoto } });
    } else {
      navigate('/virtual-try-on-live');
    }
  };

  return (
    <div>
      <div className="header">V-Glam Closet</div>
      <Navbar />

      <div className="container" style={{ marginTop: '6%', marginBottom: '10%', padding: 0, boxSizing: 'border-box', height: '50%', width: '50%' }}>
        <div className="try-on-card">
          <div className="image-section">
            <img src={shownModel} alt="Model Face" className="model-face" />
          </div>
          <div className="info-section">
            <h1>Virtual Try-On</h1>
            <p>Select an option to proceed:</p>

            <div className="buttons">
              <button className="btn" style={{ color: 'white' }}>Selfie Mode</button>
              <label className="btn" style={{ color: 'white' }}>
                Upload Photo
                <input type="file" accept="image/*" onChange={handleUploadPhotoClick} style={{ display: 'none' }} />
              </label>

              <button className="btn" onClick={handleUseModelClick} style={{ color: 'white' }}>Use Model</button>
            </div>

            <button className="btn-p" onClick={handleProceed} style={{ color: 'white' }}>Proceed <b style={{ fontSize: '20px' }}>&rarr;</b></button>
          </div>
        </div>
      </div>

      {showModelModal && (
        <div className="model-modal">
          <div className="model-modal-content">
            <span className="close" onClick={() => setShowModelModal(false)}>&times;</span>
            <h2>Select a Model</h2>
            <div className="model-grid">
              <div className="row mt-3">
                <div className="col-lg-4">
                  <img src={model1} alt="Model 1" onClick={() => handleModelSelect(model1, 'models/model1.png')} className="model-image" />
                </div>
                <div className="col-lg-4">
                  <img src={model2} alt="Model 2" onClick={() => handleModelSelect(model2, 'models/model2.jpg')} className="model-image" />
                </div>
                <div className="col-lg-4">
                  <img src={model3} alt="Model 3" onClick={() => handleModelSelect(model3, 'models/model3.jpg')} className="model-image" />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-4">
                  <img src={model4} alt="Model 4" onClick={() => handleModelSelect(model4, 'models/model4.jpg')} className="model-image" />
                </div>
                <div className="col-lg-4">
                  <img src={model5} alt="Model 5" onClick={() => handleModelSelect(model5, 'models/model5.png')} className="model-image" />
                </div>
                <div className="col-lg-4">
                  <img src={model6} alt="Model 6" onClick={() => handleModelSelect(model6, 'models/model6.png')} className="model-image" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="footer">
        <p>&copy; 2024 V-Glam Closet</p>
      </div>
    </div>
  );
};

export default VirtualTryOn;
