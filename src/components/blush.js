import React, { useState, useEffect, useRef } from 'react';
import './blush.css';
import blush1 from './images/blush.jpg';
import blush2 from './images/blush.jpg';
import blush3 from './images/blush.jpg';

const Blush = ({ stream }) => {
  const [selectedBlush, setSelectedBlush] = useState(null); 
  const videoRef = useRef(null); 
  const blushOptions = [
    { id: 1, name: 'Blush1', imageUrl: blush1 },
    { id: 2, name: 'Blush2', imageUrl: blush2 },
    { id: 3, name: 'Blush3', imageUrl: blush3 }
  ];

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
      videoRef.current.play().catch((error) => {
        console.warn('Video play was interrupted:', error);
      });
    }
  }, [stream]); 


  const handleBlushSelect = (blush) => {
    setSelectedBlush(blush);
  };

  const handleBack = () => {
    window.history.back(); 
  };

  return (
    <div className="selfie-mode-container">
      <div className="camera-feed-wrapper">
        <video
          ref={videoRef} 
          autoPlay
          playsInline
          muted
        />
      </div>

      <div className="blush-options">
      <div><button className="back-button" onClick={handleBack}>←</button>
        <h2 className="blush-label">Blush</h2></div>
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
