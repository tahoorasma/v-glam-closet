import React, { useState, useEffect } from 'react';
import SelfieMode from './selfieMode/selfieMode';
import Blush from './blush/blush';

const SelfiePage = () => {
  const [stream, setStream] = useState(null);
  const [cameraAllowed, setCameraAllowed] = useState(false);
  const [blushMode, setBlushMode] = useState(false);
  useEffect(() => {
    if (cameraAllowed) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          setStream(stream);
          const videoElement = document.getElementById('camera-feed');
          if (videoElement && !videoElement.srcObject) {
            videoElement.srcObject = stream;
            videoElement.play().catch((error) => {
              console.warn('Video play was interrupted:', error);
            });
          }
        })
        .catch((error) => {
          console.error('Error accessing the camera:', error);
          alert('Camera access denied or not available.');
        });
    } else {
      const videoElement = document.getElementById('camera-feed');
      if (videoElement && videoElement.srcObject) {
        const stream = videoElement.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        videoElement.srcObject = null;
      }
    }
  }, [cameraAllowed]);

  const handleAllowCamera = () => {
    setCameraAllowed(true);
  };

  const handleBlushClick = () => {
    setBlushMode(true);
  };

  return (
    <div>
      {!blushMode ? (
        <SelfieMode
          stream={stream}
          cameraAllowed={cameraAllowed}
          handleAllowCamera={handleAllowCamera}
          handleBlushClick={handleBlushClick}
        />
      ) : (
        <Blush stream={stream} />
      )}
    </div>
  );
};

export default SelfiePage;
