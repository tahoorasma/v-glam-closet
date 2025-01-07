import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './home.css';
import hp from '../images/hp2.jpg';
import Navbar from '../navbar';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import virtualTryOnImage from "../images/vto-slider.png";
import foundationShadeMatchImage from "../images/fsm-slider.png";
import bestSellersImage from "../images/best-seller-slider.png";
import shopImg from "../images/sbc.jpg";
import foundationImg from "../images/mk-f.jpg";
import lipstickImg from "../images/mk-ls.jpg";
import blushImg from "../images/mk-b.jpg";
import eyeshadowImg from "../images/mk-es.jpg";
import accessoryImg from "../images/accessory.jpg";

const Home = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const backendURL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    customPaging: (i) => (
      <div className="dot"></div>
    ),
  };
  /*useEffect(() => {
    axios.get(`${backendURL}/api/data`)
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [backendURL]);

  const handleRunScript = () => {
    axios.post(`${backendURL}/api/run-script`)
      .then(response => {
        alert(response.data.message);
      })
      .catch(error => {
        console.error('Error running script:', error);
      });
  };
*/
  return (
    <div>
      <div className="header">
        V-Glam Closet
      </div>
      <Navbar />
      <div className="main-banner">
        <img src={hp} alt="Front Banner" className="banner-image" />
        <div className="banner-content">
          <h1 style={{color:'white'}}>NEW! HIGH SHINE</h1>
          <p>Multi-Use Liquid Lipstick and Lip Oil</p>
          <button className="button" onClick={() => navigate('/lipstick-catalog')}>Shop Now</button>
        </div>
      </div>
      {message && (
        <div className="product-description">
          <h2>{message}</h2>
        </div>
      )}
      <div className="product-description">
        <h1>VIRTUAL BEAUTY STUDIO</h1>
        <p>Experience the latest innovations in makeup. Virtually try on products and find your perfect shade.</p>
      </div>
      <div className="slider-container">
        <Slider {...settings}>
          <div>
            <img src={virtualTryOnImage} alt="Virtual Try-On" className="slider-image" />
            <div style={{ marginTop: '-150px',marginBottom: '150px', marginLeft:'-800px' }}>
              <button className="button" onClick={() => navigate('/virtual-try-on-modes')}>Shop Now</button>
            </div>
          </div>
          <div>
            <img src={foundationShadeMatchImage} alt="Foundation Shade Match" className="slider-image" />
            <div style={{ marginTop: '-150px', marginLeft:'830px' }}>
              <button className="button" onClick={() => navigate('/foundation-shade-match')}>Shop Now</button>
            </div>
          </div>
          <div>
            <img src={bestSellersImage} alt="Best Sellers" className="slider-image" />
            <div style={{ marginTop: '-130px', marginLeft:'-850px' }}>
              <button className="button" onClick={() => navigate('/best-sellers')}>Shop Now</button>
            </div>
          </div>
        </Slider>
      </div>
      <div className="product-description">
        <h1>DISCOVER MAKEUP OF YOUR CHOICE</h1>
        <p>Explore a wide range of products from top beauty brands, all at your fingertips.</p>
      </div>
      <div className="image-container">
        <img src={shopImg} alt="Shop" className="image" 
        style={{ marginLeft:'120px' }}/>
        <a href="/foundation-catalog">
            <img src={foundationImg} alt="Foundation" className="mk-image" style={{ marginLeft: '800px', marginTop: '-230px' }} />
        </a><br />
        <a href="/lipstick-catalog">
            <img src={lipstickImg} alt="Lipstick" className="mk-image" style={{ marginLeft: '120px', marginTop: '-200px' }} />
        </a><br />
        <a href="/blush-catalog">
            <img src={blushImg} alt="Blush" className="mk-image" style={{ marginLeft: '800px', marginTop: '-200px' }} />
        </a><br />
        <a href="/eyeshadow-catalog">
            <img src={eyeshadowImg} alt="Eyeshadow" className="mk-image" style={{ marginLeft: '120px', marginTop: '-200px' }} />
        </a>
      </div>
      <div className="product-description">
        <h1>DISCOVER ACCESSORIES OF YOUR CHOICE</h1>
        <p>Find the perfect accessories to complement your look and enhance your beauty routine.</p>
      </div>
      <div>
        <img src={accessoryImg} alt="Accessory" className="slider-image" 
          style={{width: '1380px', marginLeft: '80px', marginBottom: '70px' }}/>
          <div style={{marginLeft: '330px', marginTop: '-200px' }}>
            <button className="button" onClick={() => navigate('/accessory-catalog')}>Shop Jewelry</button>
          </div>
          <div style={{marginLeft: '1050px', marginTop: '-70px' }}>
            <button className="button" onClick={() => navigate('/sunglasses-catalog')}>Shop Sunglasses</button>
          </div>
      </div>
      <div className = "product-description" style={{marginBottom: '50px' , marginTop: '150px'}}>
        <h1>ABOUT US</h1>
          <p>We are passionate about bringing out the best in you through makeup and beauty.</p>
          <p>Our mission is to provide high-quality, cruelty-free products that empower you to express your unique style.</p>
          <p>Whether you’re looking for the perfect foundation shade or a bold new lipstick, we’ve got something for everyone.</p>
          <p>With a wide range of makeup, skincare, and accessories, we offer innovative solutions for every beauty lover.</p>
          <p>Join us on a journey of self-expression and confidence with</p>
          <p>V-Glam Closet – where beauty meets inspiration!</p>
      </div>
      <div className="footer">
        <p>&copy; 2024 V-Glam Closet</p>
      </div>
    </div>
  );
};

export default Home;
