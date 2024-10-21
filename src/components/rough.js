import React, { useState, useEffect, useRef } from 'react'; 
import { useLocation } from 'react-router-dom';
import './vto.css';
import a from './images/sunglasses/sg-1.png';
import b from './images/sunglasses/sg-2.png';
import c from './images/sunglasses/sg-3.png';
import d from './images/sunglasses/sg-4.png';
import e from './images/sunglasses/sg-5.png';
import f from './images/sunglasses/sg-6.png';
import g from './images/sunglasses/sg-7.png';
import h from './images/sunglasses/sg-8.png';
import Navbar from './navbar';
import axios from 'axios';

const VirtualTryOnLive = () => {
  const location = useLocation();
  const [selectedSunglasses, setSelectedSunglasses] = useState(null);
  const [processedImage, setProcessedImage] = useState(null); 
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    startCamera();
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);  

  const handleSunglassesClick = (sunglasses) => {
    console.log('Selected sunglasses:', sunglasses); // Log the selected sunglasses path 
    setSelectedSunglasses(sunglasses);
  };
  

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      // Set the video source object only once
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
  
        // Wait for the video to load its metadata (dimensions, etc.) before playing
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play().then(() => {
            console.log("Video playing successfully");
          }).catch(error => {
            console.error('Error playing video:', error);
          });
        };
      }
  
      requestAnimationFrame(draw);
    } catch (error) {
      console.error('Error accessing camera:', error);
      if (error.name === 'NotAllowedError') {
        alert('Camera access denied. Please allow camera access in your browser settings.');
      } else {
        alert('An error occurred while accessing the camera. Please try again.');
      }
    }
  };
  
  const draw = () => {
  const canvas = canvasRef.current;
  const context = canvas.getContext('2d');

  if (videoRef.current && videoRef.current.videoWidth > 0 && videoRef.current.videoHeight > 0) {
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    if (selectedSunglasses) {
      const img = new Image();
      img.src = selectedSunglasses;
      img.onload = () => {
        const imgX = (canvas.width - img.width) / 2;
        const imgY = (canvas.height - img.height) / 2;
        context.drawImage(img, imgX, imgY);
      };

      // Add timestamp or unique frame identifier
      const frameTimestamp = Date.now(); // Use current time as frame ID
      console.log(`Sending frame with timestamp: ${frameTimestamp}`);

      canvas.toBlob(blob => {
        if (blob) {
          const formData = new FormData();
          formData.append('image', blob, `frame_${frameTimestamp}.jpg`);

          if (selectedSunglasses) {
            formData.append('sunglasses', selectedSunglasses.split('/').pop().split('.')[0]);
          }

          axios.post('http://localhost:5000/sunglasses-try-on-live', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then(response => {
            console.log(`Received processed frame for timestamp: ${frameTimestamp}`);
            console.log('Processed image URL:', response.data.processed_image_url);
            setProcessedImage(response.data.processed_image_url);
          })
          .catch(error => {
            console.error('Error occurred during the POST request:', error);
          
            if (error.response) {
              console.error('Server responded with status:', error.response.status);
              console.error('Response data:', error.response.data);
            } else if (error.request) {
              console.error('No response received:', error.request);
            } else {
              console.error('Error in setting up request:', error.message);
            }
          });
        }
      }, 'image/jpeg');
    }
  }

  requestAnimationFrame(draw);
};

  
  const handleReset = () => {
    setSelectedSunglasses(null);
    setProcessedImage(null);
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
                <img src={processedImage} alt="Processed Image" style={{ width: '100%', height: 'auto' }} />
              ) : (
                <video ref={videoRef} autoPlay style={{ width: '100%', height: 'auto' }} />
              )}
              <canvas ref={canvasRef} style={{ display: 'none' }} />
            </div>
          </div>

          <div className="controls">
            <div className="product-options">
              <button className="product-option" onClick={handleReset}>
                <i className="fa fa-ban" style={{ color: '#7b7b7b', marginLeft: '15px', border: '1px solid #7b7b7b', padding: '5px', fontSize: '36px' }}></i>
              </button>
              <button className="product-option" onClick={() => handleSunglassesClick(a)}>
                <img src={a} alt="Option A" />
              </button>
              <button className="product-option" onClick={() => handleSunglassesClick(b)}>
                <img src={b} alt="Option B" />
              </button>
              <button className="product-option" onClick={() => handleSunglassesClick(c)}>
                <img src={c} alt="Option C" />
              </button>
              <button className="product-option" onClick={() => handleSunglassesClick(d)}>
                <img src={d} alt="Option D" />
              </button>
              <button className="product-option" onClick={() => handleSunglassesClick(e)}>
                <img src={e} alt="Option E" />
              </button>
              <button className="product-option" onClick={() => handleSunglassesClick(f)}>
                <img src={f} alt="Option F" />
              </button>
              <button className="product-option" onClick={() => handleSunglassesClick(g)}>
                <img src={g} alt="Option G" />
              </button>
              <button className="product-option" onClick={() => handleSunglassesClick(h)}>
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

export default VirtualTryOnLive;
