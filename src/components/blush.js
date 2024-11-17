import React, { useState, useEffect } from 'react';
import './blush.css';
import blush1 from './images/blush.jpg';
import blush2 from './images/blush.jpg';
import blush3 from './images/blush.jpg';

const Blush = ({ stream }) => {
  const [selectedBlush, setSelectedBlush] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const blushOptions = [
    { id: 1, name: 'Blush1', imageUrl: blush1 },
    { id: 2, name: 'Blush2', imageUrl: blush2 },
    { id: 3, name: 'Blush3', imageUrl: blush3 }
  ];

  useEffect(() => {
    console.log('Blush component mounted');
  }, []);

  const handleBlushSelect = async (blush) => {
    setSelectedBlush(blush);

    try {
      const response = await fetch('http://localhost:5000/select-blush', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ color: blush.id.toString() })
      });

      if (!response.ok) {
        throw new Error('Failed to select blush');
      }

      const result = await response.json();
      console.log('Blush selection response:', result);
    } catch (error) {
      console.error('Error selecting blush:', error);
    }
  };

  const handleBack = () => {
    window.history.back(); 
  };

  return (
    <div className="selfie-mode-container">
      <div className="camera-feed-wrapper">
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        
        {}
        <img
          src="http://localhost:5000/video_feed"
          alt="Live Video Feed"
          className="video-stream"
        />
      </div>

      <div className="blush-options">
        <div>
          <button className="back-button" onClick={handleBack}>←</button>
          <h2 className="blush-label">Blush</h2>
        </div>
        {blushOptions.map((blush) => (
          <div
            key={blush.id}
            className={`blush-button ${selectedBlush?.id === blush.id ? 'selected' : ''}`}
            onClick={() => handleBlushSelect(blush)}
          >
            <div className="blush-image" style={{ backgroundImage: `url(${blush.imageUrl})` }}></div>
            <p className="blush-name">{blush.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blush;
