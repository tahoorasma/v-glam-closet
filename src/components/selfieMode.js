import React, { useRef, useEffect } from 'react';
import './selfieMode.css';

const SelfieMode = ({ stream, cameraAllowed, handleAllowCamera, handleBlushClick }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
      videoRef.current.play().catch((error) => {
        console.warn('Video play was interrupted:', error);
      });
    }
  }, [stream]);

  return (
    <div className="selfie-mode-container">
      {!cameraAllowed ? (
        <div className="camera-permission">
          <p>Click the button below to enable Selfie Mode</p>
          <button className="allow-button" onClick={handleAllowCamera}>Enable Selfie Mode</button>
        </div>
      ) : (
        <div>
        <div className="camera-feed-wrapper">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
          />
          </div>
          <div className="options-bar">
            <button className="option-button">Foundation</button>
            <button className="option-button">Lipstick</button>
            <button className="option-button" onClick={handleBlushClick}>Blush</button>
            <button className="option-button">Eyeshadow</button>
          </div>
          </div>
      )}
    </div>
  );
};

export default SelfieMode;
