import React, { useState } from 'react';
import './fsm.css';
import best_match from '../images/best_match.png';
import face_scan from '../images/face_scan.jpg';
import shade_match from '../images/shade_match.jpg';
import Navbar from '../navbar';
import { useNavigate } from 'react-router-dom';

const FoundationShadeMatch = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      navigate('/foundation-shade-match-live', { state: { imageUrl } });
    }
  };

  const handleProceed = () => {
    document.getElementById('image-upload').click();
  };

  return (
    <div className="fsm">
      <div className="header">V-Glam Closet</div>
      <Navbar />
      <div className="container">
        <div style={{ marginTop: '10px', textAlign: 'center' }}>
          <h3><b>FOUNDATION SHADE MATCH</b></h3>
          <p>Our foundation shade match feature uses smart facial analysis to detect your natural skin tone</p>
          <p>from a photo. By focusing on key areas like your forehead and cheeks, it determines the closest foundation</p>
          <p>shade for a flawless and natural look—helping you find the best match without stepping into a store.</p>
        </div>
        <div>
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />
          <button className="btn-add-to-bag" onClick={handleProceed}>
            Try Foundation Shade matcher!
          </button>
        </div>
        
      </div>
                  <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

      <div className="footer">
        <p>&copy; 2024 V-Glam Closet</p>
      </div>
    </div>
  );
};

export default FoundationShadeMatch;
