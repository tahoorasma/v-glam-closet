import React from 'react';
import { Link } from 'react-router-dom';
import './eyeshadowCatalog.css';
import e1 from '../images/catalog/eyeshadow/afterglow.png';
import e2 from '../images/catalog/eyeshadow/berry-smoothie.png';
import e3 from '../images/catalog/eyeshadow/candy-berry.png';
import e4 from '../images/catalog/eyeshadow/glowshots.png';
import e6 from '../images/catalog/eyeshadow/hardwired.png';
import e7 from '../images/catalog/eyeshadow/icy-nude.png';
import e9 from '../images/catalog/eyeshadow/single.png';
import e10 from '../images/catalog/eyeshadow/ultimate-utopia.png';
import e11 from '../images/catalog/eyeshadow/vintage-jean.png';
import e12 from '../images/catalog/eyeshadow/violet-knit.png';
import Navbar from '../navbar';

const EyeshadowCatalog = () => {
    return (
        <div>
            <div className="header">
                V-Glam Closet
            </div>
            <Navbar />

            <div className="hyperlinks" style={{ margin: '20px 0', padding: '0 40px', textAlign: 'left', color:'black' }}>
                <Link to="/makeup" className="hyperlink" style={{ color:'#575555' }}>Makeup</Link> /
                <Link to="" className="hyperlink" style={{ color:'#e66a7e' }}> Eyeshadow</Link>
            </div>

            <div className="container mt-4">
                <div className="product-grid" style={{ marginTop: '-18px' }}>
                    <div className="cwm-product-card">
                        <img src={e1} alt="NYX-Can't Stop Won't Stop" />
                        <h3>
                            <Link to="" className="product-link">NARS-Afterglow Irresistible Eyeshadow Palette</Link>
                        </h3>
                        <p className="price">Rs 9590.00</p>
                        <p className="product-reviews">4.9 <span style={{ color: '#fcba03', fontSize: '1.2em' }}>★</span> ratings</p>
                        <button className="btn-add-to-bag">Add to Bag</button>
                    </div>
                    <div className="cwm-product-card">
                        <img src={e2} alt="Maybelline-Fit Me" />
                        <h3>
                            <Link to="" className="product-link">Dasique-Berry Smoothie Eyeshadow Palette</Link>
                        </h3>
                        <p className="price">Rs 8000.00</p>
                        <p className="product-reviews">4.8 <span style={{ color: '#fcba03', fontSize: '1.2em' }}>★</span> ratings</p>
                        <button className="btn-add-to-bag">Add to Bag</button>
                    </div>
                    <div className="cwm-product-card">
                        <img src={e3} alt="Maybelline-Fit Me" />
                        <h3>
                            <Link to="" className="product-link">Dasique-Candy Berry Eyeshadow Palette</Link>
                        </h3>
                        <p className="price">Rs 6950.00</p>
                        <p className="product-reviews">4.9 <span style={{ color: '#fcba03', fontSize: '1.2em' }}>★</span> ratings</p>
                        <button className="btn-add-to-bag">Add to Bag</button>
                    </div>
                    <div className="cwm-product-card">
                        <img src={e4} alt="Maybelline-Fit Me" />
                        <h3>
                            <Link to="" className="product-link">NYX-Ultimate Glow Shots Liquid Eyeshadow</Link>
                        </h3>
                        <p className="price">Rs 3000.00</p>
                        <p className="product-reviews">5 <span style={{ color: '#fcba03', fontSize: '1.2em' }}>★</span> ratings</p>
                        <button className="btn-add-to-bag">Add to Bag</button>
                    </div>
                    <div className="cwm-product-card">
                        <img src={e6} alt="Maybelline-Fit Me" />
                        <h3>
                            <Link to="" className="product-link">NARS-Hardwired Eyeshadows</Link>
                        </h3>
                        <p className="price">Rs 4300.00</p>
                        <p className="product-reviews">4.9 <span style={{ color: '#fcba03', fontSize: '1.2em' }}>★</span> ratings</p>
                        <button className="btn-add-to-bag">Add to Bag</button>
                    </div>
                    <div className="cwm-product-card">
                        <img src={e7} alt="Maybelline-Fit Me" />
                        <h3>
                            <Link to="" className="product-link">Huda Beauty-Icy Nude Eyeshadow Palette</Link>
                        </h3>
                        <p className="price">Rs 12500.00</p>
                        <p className="product-reviews">4.6 <span style={{ color: '#fcba03', fontSize: '1.2em' }}>★</span> ratings</p>
                        <button className="btn-add-to-bag">Add to Bag</button>
                    </div>
                    <div className="cwm-product-card">
                        <img src={e9} alt="Maybelline-Fit Me" />
                        <h3>
                            <Link to="" className="product-link">NARS-Single Eyeshadows</Link>
                        </h3>
                        <p className="price">Rs 3700.00</p>
                        <p className="product-reviews">4.9 <span style={{ color: '#fcba03', fontSize: '1.2em' }}>★</span> ratings</p>
                        <button className="btn-add-to-bag">Add to Bag</button>
                    </div>
                    <div className="cwm-product-card">
                        <img src={e10} alt="Maybelline-Fit Me" />
                        <h3>
                            <Link to="" className="product-link">NYX-Ultimate Utopia 40 Pan Palette</Link>
                        </h3>
                        <p className="price">Rs 9800.00</p>
                        <p className="product-reviews">5 <span style={{ color: '#fcba03', fontSize: '1.2em' }}>★</span> ratings</p>
                        <button className="btn-add-to-bag">Add to Bag</button>
                    </div>
                    <div className="cwm-product-card">
                        <img src={e11} alt="Maybelline-Fit Me" />
                        <h3>
                            <Link to="" className="product-link">NYX-Ultimate Vintage Jean Palette</Link>
                        </h3>
                        <p className="price">Rs 5600.00</p>
                        <p className="product-reviews">4.9 <span style={{ color: '#fcba03', fontSize: '1.2em' }}>★</span> ratings</p>
                        <button className="btn-add-to-bag">Add to Bag</button>
                    </div>
                    <div className="cwm-product-card">
                        <img src={e12} alt="Maybelline-Fit Me" />
                        <h3>
                            <Link to="" className="product-link">Dasique-Violet Knit Eyeshadow Palette</Link>
                        </h3>
                        <p className="price">Rs 6950.00</p>
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

export default EyeshadowCatalog;
