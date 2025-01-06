import React from 'react';
import { Link } from 'react-router-dom';
import './makeup.css';
import makeup from '../images/makeup.jpg';
import found from '../images/found.jpg';
import blush from '../images/blush.jpg';
import lipstick from '../images/lipstick.jpg';
import eyeshadow from '../images/eyeshadow.jpg';
import vto from '../images/vto.jpg';
import Navbar from '../navbar';

const Makeup = () => {
  return (
    <div style={{backgroundColor: 'black', color: 'white'}}>
      <div className="header">
        V-Glam Closet
      </div>

      <Navbar />

      <div className="container mt-4">
        <h6 className="discover-makeup">
          <Link to="/makeup-catalog" style={{marginLeft: '5px', color:'white', textDecoration: 'none'}} >Discover Makeup <span className="arrow">&gt;</span></Link>
        </h6>
        <div className="row">
          <div className="col-md-3">
            <div className="product-item white-card">
              <img style={{ height: '350px', width: '270px'}} className="special-offer-img" src={makeup} alt="Special Offer" />
              <h3 style={{backgroundColor: 'white', color: 'black'}}>Exclusive Deals Just for You!</h3>
            </div>
          </div>
          <div className="col-md-9">
            <div className="row">
              <div className="col-md-3">
                <div className="product-item">
                  <img src={found} alt="Foundation" />
                  <h3><Link to="/foundation-catalog" style={{ color: 'white', textDecoration: 'none' }}>Foundation</Link></h3>
                </div>
              </div>
              <div className="col-md-3">
                <div className="product-item">
                  <img src={blush} alt="Blush" />
                  <h3><Link to="/blush-catalog" style={{ color: 'white', textDecoration: 'none' }}>Blush</Link></h3>
                </div>
              </div>
              <div className="col-md-3">
                <div className="product-item">
                  <img src={lipstick} alt="Lipstick" />
                  <h3><Link to="/lipstick-catalog" style={{ color: 'white', textDecoration: 'none' }}>Lipstick</Link></h3>
                </div>
              </div>
              <div className="col-md-3">
                <div className="product-item">
                  <img src={eyeshadow} alt="Eyeshadow" />
                  <h3><Link to="/eyeshadow-catalog" style={{ color: 'white', textDecoration: 'none' }}>Eyeshadow</Link></h3>
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-md-12">
                <div className="product-item virtual-tryon">
                  <img style={{ marginLeft: '350px', width: '500px', height: '185px' }} src={vto} alt="Virtual Try on" />
                  <h3 style={{ marginLeft: '320px', width: '500px' }}>
                    <Link to="/virtual-try-on" style={{ color: 'white', textDecoration: 'none' }}>Try out makeup virtually!</Link>
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
      <div><br></br></div> 
      <div><br></br></div> 
      <div><br></br></div> 

      <div className="footer">
        <p>&copy; 2024 V-Glam Closet</p>
      </div>
    </div>
  );
};

export default Makeup;
