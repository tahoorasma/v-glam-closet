import React from 'react';
import { Link } from 'react-router-dom';
import './accessoryCatalog.css';
import j1 from './images/j1.jpg';
import j2 from './images/j2.jpg';
import j3 from './images/j3.jpg';
import j4 from './images/j4.jpg';
import Navbar from './navbar';

const AccessoryCatalog = () => {
    return (
        <div>
            <div className="header">
                V-Glam Closet
            </div>
            <Navbar />

            <div className="tabs-container">
                <Link to="/jewelry" className="tab-link" style={{color:'white', backgroundColor: 'black'}}>Jewelry</Link>
                <Link to="/sunglasses" className="tab-link">Sunglasses</Link>
            </div>

            <div className="container mt-4">
                <div className="product-grid" style={{ marginTop: '-18px' }}>
                    <div className="product-card">
                        <img src={j1} alt="Powder Blush" />
                        <h3>
                            <Link to="/powder-blush" className="product-link">Thick Hoop Earrings</Link>
                        </h3>
                        <p className="price">Rs3000.00</p>
                        <button className="btn-add-to-bag">Add to Bag</button>
                    </div>

                    <div className="product-card">
                        <img src={j2} alt="Lipstick" />
                        <h3>
                            <Link to="/lipstick" className="product-link">Gold Bow Necklace</Link>
                        </h3>
                        <p className="price">Rs2000.00</p>
                        <button className="btn-add-to-bag">Add to Bag</button>
                    </div>

                    <div className="product-card">
                        <img src={j3} alt="Foundation" />
                        <h3>
                            <Link to="/foundation" className="product-link">Retro Pearl Earrings</Link>
                        </h3>
                        <p className="price">Rs4500.00</p>
                        <button className="btn-add-to-bag">Add to Bag</button>
                    </div>

                    <div className="product-card">
                        <img src={j4} alt="Eyeshadow" />
                        <h3>
                            <Link to="/eyeshadow" className="product-link">Drop Earrings</Link>
                        </h3>
                        <p className="price">Rs1500.00</p>
                        <button className="btn-add-to-bag">Add to Bag</button>
                    </div>
                </div>
            </div>

            <div className="footer">
                <p>&copy; 2024 V-Glam Closet</p>
            </div>
        </div>
    );
};

export default AccessoryCatalog;
