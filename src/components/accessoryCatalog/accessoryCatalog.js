import React from 'react';
import { Link } from 'react-router-dom';
import './accessoryCatalog.css';
import j1 from './images/catalog/jewelry/j1.png';
import j2 from './images/catalog/jewelry/j2.png';
import j3 from './images/catalog/jewelry/j3.png';
import j4 from './images/catalog/jewelry/j4.png';
import j5 from './images/catalog/jewelry/j5.png';
import j6 from './images/catalog/jewelry/j6.png';
import j7 from './images/catalog/jewelry/j7.png';
import j8 from './images/catalog/jewelry/j8.png';
import j9 from './images/catalog/jewelry/j9.png';
import j10 from './images/catalog/jewelry/j10.png';
import j11 from './images/catalog/jewelry/j11.png';
import Navbar from '../navbar';

const AccessoryCatalog = () => {
    return (
        <div>
            <div className="header">
                V-Glam Closet
            </div>
            <Navbar />

            <div className="tabs-container">
                <Link to="" className="tab-link" style={{color:'white', backgroundColor: 'black'}}>Jewelry</Link>
                <Link to="/sunglasses-catalog" className="tab-link">Sunglasses</Link>
            </div>

            <div className="container mt-4">
                <div className="product-grid" style={{ marginTop: '-18px' }}>
                    <div className="product-card">
                        <img src={j1} alt="Powder Blush" />
                        <h3>
                            <Link to="/powder-blush" className="product-link">Pink Earrings</Link>
                        </h3>
                        <p className="price">Rs 3000.00</p>
                        <p className="product-reviews">4.9 <span style={{ color: '#fcba03', fontSize: '1.2em' }}>★</span> ratings</p>
                        <button className="btn-add-to-bag">Add to Bag</button>
                    </div>

                    <div className="product-card">
                        <img src={j2} alt="Lipstick" />
                        <h3>
                            <Link to="/lipstick" className="product-link">Gold Flower Earrings</Link>
                        </h3>
                        <p className="price">Rs 2000.00</p>
                        <p className="product-reviews">4.7 <span style={{ color: '#fcba03', fontSize: '1.2em' }}>★</span> ratings</p>
                        <button className="btn-add-to-bag">Add to Bag</button>
                    </div>

                    <div className="product-card">
                        <img src={j3} alt="Foundation" />
                        <h3>
                            <Link to="/foundation" className="product-link">Drop Earrings</Link>
                        </h3>
                        <p className="price">Rs 2500.00</p>
                        <p className="product-reviews">4.9 <span style={{ color: '#fcba03', fontSize: '1.2em' }}>★</span> ratings</p>
                        <button className="btn-add-to-bag">Add to Bag</button>
                    </div>

                    <div className="product-card">
                        <img src={j4} alt="Eyeshadow" />
                        <h3>
                            <Link to="/eyeshadow" className="product-link">Retro Pearl Earrings</Link>
                        </h3>
                        <p className="price">Rs 3500.00</p>
                        <p className="product-reviews">4.8 <span style={{ color: '#fcba03', fontSize: '1.2em' }}>★</span> ratings</p>
                        <button className="btn-add-to-bag">Add to Bag</button>
                    </div>
                    <div className="product-card">
                        <img src={j5} alt="Eyeshadow" />
                        <h3>
                            <Link to="/eyeshadow" className="product-link">Red Drop Earrings</Link>
                        </h3>
                        <p className="price">Rs 4500.00</p>
                        <p className="product-reviews">5 <span style={{ color: '#fcba03', fontSize: '1.2em' }}>★</span> ratings</p>
                        <button className="btn-add-to-bag">Add to Bag</button>
                    </div>
                    <div className="product-card">
                        <img src={j6} alt="Eyeshadow" />
                        <h3>
                            <Link to="/eyeshadow" className="product-link">Casual Studs</Link>
                        </h3>
                        <p className="price">Rs 2500.00</p>
                        <p className="product-reviews">4.9 <span style={{ color: '#fcba03', fontSize: '1.2em' }}>★</span> ratings</p>
                        <button className="btn-add-to-bag">Add to Bag</button>
                    </div>
                    <div className="product-card">
                        <img src={j7} alt="Eyeshadow" />
                        <h3>
                            <Link to="/eyeshadow" className="product-link">Blue Drop Earrings</Link>
                        </h3>
                        <p className="price">Rs 4500.00</p>
                        <p className="product-reviews">5 <span style={{ color: '#fcba03', fontSize: '1.2em' }}>★</span> ratings</p>
                        <button className="btn-add-to-bag">Add to Bag</button>
                    </div>
                    <div className="product-card">
                        <img src={j8} alt="Eyeshadow" />
                        <h3>
                            <Link to="/eyeshadow" className="product-link">Bow Pearl Earrings</Link>
                        </h3>
                        <p className="price">Rs 1500.00</p>
                        <p className="product-reviews">4.6 <span style={{ color: '#fcba03', fontSize: '1.2em' }}>★</span> ratings</p>
                        <button className="btn-add-to-bag">Add to Bag</button>
                    </div>
                    <div className="product-card">
                        <img src={j9} alt="Eyeshadow" />
                        <h3>
                            <Link to="/eyeshadow" className="product-link">Golden Hoops</Link>
                        </h3>
                        <p className="price">Rs 750.00</p>
                        <p className="product-reviews">4.4 <span style={{ color: '#fcba03', fontSize: '1.2em' }}>★</span> ratings</p>
                        <button className="btn-add-to-bag">Add to Bag</button>
                    </div>
                    <div className="product-card">
                        <img src={j10} alt="Eyeshadow" />
                        <h3>
                            <Link to="/eyeshadow" className="product-link">Sparkle Studs</Link>
                        </h3>
                        <p className="price">Rs 3500.00</p>
                        <p className="product-reviews">4.8 <span style={{ color: '#fcba03', fontSize: '1.2em' }}>★</span> ratings</p>
                        <button className="btn-add-to-bag">Add to Bag</button>
                    </div>
                    <div className="product-card">
                        <img src={j11} alt="Eyeshadow" />
                        <h3>
                            <Link to="/eyeshadow" className="product-link">Crystal Earrings</Link>
                        </h3>
                        <p className="price">Rs 4500.00</p>
                        <p className="product-reviews">4.9 <span style={{ color: '#fcba03', fontSize: '1.2em' }}>★</span> ratings</p>
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
