import React from 'react';
import { Link } from 'react-router-dom';
import './categoryWiseMakeup.css';
import s1 from './images/catalog/sunglasses/sg-1.png';
import s2 from './images/catalog/sunglasses/sg-2.png';
import s3 from './images/catalog/sunglasses/sg-3.png';
import s4 from './images/catalog/sunglasses/sg-4.png';
import s5 from './images/catalog/sunglasses/sg-5.png';
import s6 from './images/catalog/sunglasses/sg-6.png';
import s7 from './images/catalog/sunglasses/sg-7.png';
import s8 from './images/catalog/sunglasses/sg-8.png';
import s9 from './images/catalog/sunglasses/sg-9.png';
import Navbar from './navbar';

const SunglassesCatalog = () => {
    return (
        <div>
            <div className="header">
                V-Glam Closet
            </div>
            <Navbar />

            <div className="tabs-container">
                <Link to="/accessory-catalog" className="tab-link">Jewelry</Link>
                <Link to="" className="tab-link" style={{color:'white', backgroundColor: 'black'}}>Sunglasses</Link>
            </div>

            <div className="container mt-4">
                <div className="product-grid" style={{ marginTop: '-18px' }}>
                    <div className="cwm-product-card">
                        <img src={s1} alt="sunglasses-01" />
                        <h3>
                            <Link to="" className="product-link">Midnight Shades</Link>
                        </h3>
                        <p className="price">Rs 3000.00</p>
                        <p className="product-reviews">4.9 <span style={{ color: '#fcba03', fontSize: '1.2em' }}>★</span> ratings</p>
                        <button className="btn-add-to-bag">Add to Bag</button>
                    </div>
                    <div className="cwm-product-card">
                        <img src={s2} alt="sunglasses-02" />
                        <h3>
                            <Link to="" className="product-link">Noir Frames</Link>
                        </h3>
                        <p className="price">Rs 3500.00</p>
                        <p className="product-reviews">4.9 <span style={{ color: '#fcba03', fontSize: '1.2em' }}>★</span> ratings</p>
                        <button className="btn-add-to-bag">Add to Bag</button>
                    </div>
                    <div className="cwm-product-card">
                        <img src={s3} alt="sunglasses-03" />
                        <h3>
                            <Link to="" className="product-link">Eclipse Wear</Link>
                        </h3>
                        <p className="price">Rs 3800.00</p>
                        <p className="product-reviews">4.9 <span style={{ color: '#fcba03', fontSize: '1.2em' }}>★</span> ratings</p>
                        <button className="btn-add-to-bag">Add to Bag</button>
                    </div>
                    <div className="cwm-product-card">
                        <img src={s4} alt="sunglasses-04" />
                        <h3>
                            <Link to="" className="product-link">Shadow Specs</Link>
                        </h3>
                        <p className="price">Rs 4500.00</p>
                        <p className="product-reviews">4.7 <span style={{ color: '#fcba03', fontSize: '1.2em' }}>★</span> ratings</p>
                        <button className="btn-add-to-bag">Add to Bag</button>
                    </div>
                    <div className="cwm-product-card">
                        <img src={s5} alt="sunglasses-05" />
                        <h3>
                            <Link to="" className="product-link">Jet Black Sunnies</Link>
                        </h3>
                        <p className="price">Rs 5600.00</p>
                        <p className="product-reviews">4.9 <span style={{ color: '#fcba03', fontSize: '1.2em' }}>★</span> ratings</p>
                        <button className="btn-add-to-bag">Add to Bag</button>
                    </div>
                    <div className="cwm-product-card">
                        <img src={s6} alt="sunglasses-06" />
                        <h3>
                            <Link to="" className="product-link">Dark Knight Glasses</Link>
                        </h3>
                        <p className="price">Rs 6300.00</p>
                        <p className="product-reviews">4.8 <span style={{ color: '#fcba03', fontSize: '1.2em' }}>★</span> ratings</p>
                        <button className="btn-add-to-bag">Add to Bag</button>
                    </div>
                    <div className="cwm-product-card">
                        <img src={s7} alt="sunglasses-07" />
                        <h3>
                            <Link to="" className="product-link">Obsidian Shades</Link>
                        </h3>
                        <p className="price">Rs 3900.00</p>
                        <p className="product-reviews">4.9 <span style={{ color: '#fcba03', fontSize: '1.2em' }}>★</span> ratings</p>
                        <button className="btn-add-to-bag">Add to Bag</button>
                    </div>
                    <div className="cwm-product-card">
                        <img src={s8} alt="sunglasses-08" />
                        <h3>
                            <Link to="" className="product-link">Blackout Subglasses</Link>
                        </h3>
                        <p className="price">Rs 4000.00</p>
                        <p className="product-reviews">4.6 <span style={{ color: '#fcba03', fontSize: '1.2em' }}>★</span> ratings</p>
                        <button className="btn-add-to-bag">Add to Bag</button>
                    </div>
                    <div className="cwm-product-card">
                        <img src={s9} alt="sunglasses-09" />
                        <h3>
                            <Link to="" className="product-link">Carbon Sunnies</Link>
                        </h3>
                        <p className="price">Rs 4850.00</p>
                        <p className="product-reviews">4.4 <span style={{ color: '#fcba03', fontSize: '1.2em' }}>★</span> ratings</p>
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

export default SunglassesCatalog;
