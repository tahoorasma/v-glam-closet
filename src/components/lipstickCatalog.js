import React from 'react';
import { Link } from 'react-router-dom';
import './categoryWiseMakeup.css';
import l1 from './images/catalog/lipstick/mvi-charmed.jpg';
import l2 from './images/catalog/lipstick/mvi-cheeky.jpg';
import l3 from './images/catalog/lipstick/mvi-coy.jpg';
import l4 from './images/catalog/lipstick/mvi-lippy.jpg';
import l5 from './images/catalog/lipstick/mvi-peachy.jpg';
import l6 from './images/catalog/lipstick/mvi-peppy.jpg';
import l7 from './images/catalog/lipstick/mvi-pink-mashup.jpg';
import l8 from './images/catalog/lipstick/mvi-red-hot.jpg';
import l9 from './images/catalog/lipstick/mvi-rogue.jpg';
import l10 from './images/catalog/lipstick/mvi-unrivaled.jpg';
import Navbar from './navbar';

const LipstickCatalog = () => {
    return (
        <div>
            <div className="header">
                V-Glam Closet
            </div>
            <Navbar />

            <div className="hyperlinks" style={{ margin: '20px 0', padding: '0 40px', textAlign: 'left', color:'black' }}>
                <Link to="/makeup" className="hyperlink" style={{ color:'#575555' }}>Makeup</Link> /
                <Link to="" className="hyperlink" style={{ color:'#e66a7e' }}> Lipstick</Link>
            </div>

            <div className="container mt-4">
                <div className="product-grid" style={{ marginTop: '-18px' }}>
                    <div className="cwm-product-card">
                        <img src={l1} alt="Maybelline Superstay Vinyl Ink-Charmed" />
                        <h3>
                            <Link to="" className="product-link">Maybelline Superstay Vinyl Ink-Charmed</Link>
                        </h3>
                        <p className="price">Rs 3650.00</p>
                        <p className="product-reviews">4.9 <span style={{ color: '#fcba03', fontSize: '1.2em' }}>★</span> ratings</p>
                        <button className="btn-add-to-bag">Add to Bag</button>
                    </div>
                    <div className="cwm-product-card">
                        <img src={l2} alt="Maybelline Superstay Vinyl Ink-Cheeky" />
                        <h3>
                            <Link to="" className="product-link">Maybelline Superstay Vinyl Ink-Cheeky</Link>
                        </h3>
                        <p className="price">Rs 3650.00</p>
                        <p className="product-reviews">5 <span style={{ color: '#fcba03', fontSize: '1.2em' }}>★</span> ratings</p>
                        <button className="btn-add-to-bag">Add to Bag</button>
                    </div>
                    <div className="cwm-product-card">
                        <img src={l3} alt="Maybelline Superstay Vinyl Ink-Coy" />
                        <h3>
                            <Link to="" className="product-link">Maybelline Superstay Vinyl Ink-Coy</Link>
                        </h3>
                        <p className="price">Rs 3650.00</p>
                        <p className="product-reviews">4.8 <span style={{ color: '#fcba03', fontSize: '1.2em' }}>★</span> ratings</p>
                        <button className="btn-add-to-bag">Add to Bag</button>
                    </div>
                    <div className="cwm-product-card">
                        <img src={l4} alt="Maybelline Superstay Vinyl Ink-Lippy" />
                        <h3>
                            <Link to="" className="product-link">Maybelline Superstay Vinyl Ink-Lippy</Link>
                        </h3>
                        <p className="price">Rs 3650.00</p>
                        <p className="product-reviews">4.9 <span style={{ color: '#fcba03', fontSize: '1.2em' }}>★</span> ratings</p>
                        <button className="btn-add-to-bag">Add to Bag</button>
                    </div>
                    <div className="cwm-product-card">
                        <img src={l5} alt="Maybelline Superstay Vinyl Ink-Peachy" />
                        <h3>
                            <Link to="" className="product-link">Maybelline Superstay Vinyl Ink-Peachy</Link>
                        </h3>
                        <p className="price">Rs 3650.00</p>
                        <p className="product-reviews">4.9 <span style={{ color: '#fcba03', fontSize: '1.2em' }}>★</span> ratings</p>
                        <button className="btn-add-to-bag">Add to Bag</button>
                    </div>
                    <div className="cwm-product-card">
                        <img src={l6} alt="Maybelline Superstay Vinyl Ink-Peppy" />
                        <h3>
                            <Link to="" className="product-link">Maybelline Superstay Vinyl Ink-Peppy</Link>
                        </h3>
                        <p className="price">Rs 3650.00</p>
                        <p className="product-reviews">4.8 <span style={{ color: '#fcba03', fontSize: '1.2em' }}>★</span> ratings</p>
                        <button className="btn-add-to-bag">Add to Bag</button>
                    </div>
                    <div className="cwm-product-card">
                        <img src={l7} alt="Maybelline Superstay Vinyl Ink-Pink Mashup" />
                        <h3>
                            <Link to="" className="product-link">Maybelline Superstay Vinyl Ink-Pink Mashup</Link>
                        </h3>
                        <p className="price">Rs 3650.00</p>
                        <p className="product-reviews">5 <span style={{ color: '#fcba03', fontSize: '1.2em' }}>★</span> ratings</p>
                        <button className="btn-add-to-bag">Add to Bag</button>
                    </div>
                    <div className="cwm-product-card">
                        <img src={l8} alt="Maybelline Superstay Vinyl Ink-Red Hot" />
                        <h3>
                            <Link to="" className="product-link">Maybelline Superstay Vinyl Ink-Red Hot</Link>
                        </h3>
                        <p className="price">Rs 3650.00</p>
                        <p className="product-reviews">5 <span style={{ color: '#fcba03', fontSize: '1.2em' }}>★</span> ratings</p>
                        <button className="btn-add-to-bag">Add to Bag</button>
                    </div>
                    <div className="cwm-product-card">
                        <img src={l9} alt="Maybelline Superstay Vinyl Ink-Rogue" />
                        <h3>
                            <Link to="" className="product-link">Maybelline Superstay Vinyl Ink-Rogue</Link>
                        </h3>
                        <p className="price">Rs 3650.00</p>
                        <p className="product-reviews">4.9 <span style={{ color: '#fcba03', fontSize: '1.2em' }}>★</span> ratings</p>
                        <button className="btn-add-to-bag">Add to Bag</button>
                    </div>
                    <div className="cwm-product-card">
                        <img src={l10} alt="Maybelline Superstay Vinyl Ink-Unrivaled" />
                        <h3>
                            <Link to="" className="product-link">Maybelline Superstay Vinyl Ink-Unrivaled</Link>
                        </h3>
                        <p className="price">Rs 3650.00</p>
                        <p className="product-reviews">4.8 <span style={{ color: '#fcba03', fontSize: '1.2em' }}>★</span> ratings</p>
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

export default LipstickCatalog;
