import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './home.css';
import hp from './images/hp2.jpg';
import Navbar from './navbar';

const Home = () => {
  const [message, setMessage] = useState('');

  const backendURL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

  /*useEffect(() => {
    axios.get(`${backendURL}/api/data`)
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [backendURL]);*/

  const handleRunScript = () => {
    axios.post(`${backendURL}/api/run-script`)
      .then(response => {
        alert(response.data.message);
      })
      .catch(error => {
        console.error('Error running script:', error);
      });
  };

  return (
    <div>
      <div className="header">
        V-Glam Closet
      </div>
      <Navbar />
      <div className="main-banner">
        <img src={hp} alt="Sunkisser Banner" className="banner-image" />
        <div className="banner-content">
          <h1 style={{color:'white'}}>NEW! SUNKISSER</h1>
          <p>Multi-Use Liquid Blush and Bronzer</p>
          <button className="button" onClick={handleRunScript}>Shop Now</button>
        </div>
      </div>
      {message && (
        <div className="product-description">
          <h2>{message}</h2>
        </div>
      )}
      <div className="product-description">
        <h2>Virtual Beauty Studio</h2>
        <p>Experience the latest innovations in makeup. Virtually try on products and find your perfect shade.</p>
      </div>
      <div className="footer">
        <p>&copy; 2024 V-Glam Closet</p>
      </div>
    </div>
  );
};

export default Home;
