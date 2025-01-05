import React from 'react';
import { Link } from 'react-router-dom';
import './categoryWiseMakeup.css';
import b1 from './images/catalog/blush/nars-237.png';
import b2 from './images/catalog/blush/nars-252.png';
import b3 from './images/catalog/blush/nars-775.png';
import b4 from './images/catalog/blush/nars-776.png';
import b5 from './images/catalog/blush/nars-777.png';
import b6 from './images/catalog/blush/nars-778.png';
import b7 from './images/catalog/blush/nars-888.png';
import b8 from './images/catalog/blush/nars-901.png';
import b9 from './images/catalog/blush/nars-902.png';
import b10 from './images/catalog/blush/rare-bliss.png';
import b11 from './images/catalog/blush/rare-grateful.png';
import b12 from './images/catalog/blush/rare-encourage.png';
import b13 from './images/catalog/blush/rare-happy.png';
import b14 from './images/catalog/blush/rare-hope.png';
import b15 from './images/catalog/blush/rare-love.png';
import b16 from './images/catalog/blush/rare-lucky.png';
import b17 from './images/catalog/blush/rare-virtue.png';
import b18 from './images/catalog/blush/rare-believe.png';
import b19 from './images/catalog/blush/rare-dewy.png';
import Navbar from './navbar';

const BlushCatalog = () => {
    return (
        <div>
            <div className="header">
                V-Glam Closet
            </div>
            <Navbar />

            <div className="hyperlinks" style={{ margin: '20px 0', padding: '0 40px', textAlign: 'left', color:'black' }}>
                <Link to="/makeup" className="hyperlink" style={{ color:'#575555' }}>Makeup</Link> /
                <Link to="" className="hyperlink" style={{ color:'#e66a7e' }}> Blush</Link>
            </div>

            <div className="container mt-4">
                <div className="product-grid" style={{ marginTop: '-18px' }}>
                    <div className="cwm-product-card">
                        <img src={b1} alt="NARS-237" />
                        <h3>
                            <Link to="" className="product-link">NARS-Powder Blush 237</Link>
                        </h3>
                        <p className="price">Rs4500.00</p>
                        <button className="btn-add-to-bag">Add to Bag</button>
                    </div>
                    <div className="cwm-product-card">
                        <img src={b2} alt="NARS-252" />
                        <h3>
                            <Link to="" className="product-link">NARS-Powder Blush 252</Link>
                        </h3>
                        <p className="price">Rs4500.00</p>
                        <button className="btn-add-to-bag">Add to Bag</button>
                    </div>
                    <div className="cwm-product-card">
                        <img src={b3} alt="NARS-775" />
                        <h3>
                            <Link to="" className="product-link">NARS-Powder Blush 775</Link>
                        </h3>
                        <p className="price">Rs4500.00</p>
                        <button className="btn-add-to-bag">Add to Bag</button>
                    </div>
                    <div className="cwm-product-card">
                        <img src={b4} alt="NARS-776" />
                        <h3>
                            <Link to="" className="product-link">NARS-Powder Blush 776</Link>
                        </h3>
                        <p className="price">Rs4500.00</p>
                        <button className="btn-add-to-bag">Add to Bag</button>
                    </div>
                    <div className="cwm-product-card">
                        <img src={b5} alt="NARS-777" />
                        <h3>
                            <Link to="" className="product-link">NARS-Powder Blush 777</Link>
                        </h3>
                        <p className="price">Rs4500.00</p>
                        <button className="btn-add-to-bag">Add to Bag</button>
                    </div>
                    <div className="cwm-product-card">
                        <img src={b6} alt="NARS-778" />
                        <h3>
                            <Link to="" className="product-link">NARS-Powder Blush 778</Link>
                        </h3>
                        <p className="price">Rs4500.00</p>
                        <button className="btn-add-to-bag">Add to Bag</button>
                    </div>
                    <div className="cwm-product-card">
                        <img src={b7} alt="NARS-888" />
                        <h3>
                            <Link to="" className="product-link">NARS-Powder Blush 888</Link>
                        </h3>
                        <p className="price">Rs4500.00</p>
                        <button className="btn-add-to-bag">Add to Bag</button>
                    </div>
                    <div className="cwm-product-card">
                        <img src={b8} alt="NARS-901" />
                        <h3>
                            <Link to="" className="product-link">NARS-Powder Blush 901</Link>
                        </h3>
                        <p className="price">Rs4500.00</p>
                        <button className="btn-add-to-bag">Add to Bag</button>
                    </div>
                    <div className="cwm-product-card">
                        <img src={b9} alt="NARS-902" />
                        <h3>
                            <Link to="" className="product-link">NARS-Powder Blush 902</Link>
                        </h3>
                        <p className="price">Rs4500.00</p>
                        <button className="btn-add-to-bag">Add to Bag</button>
                    </div>
                    <div className="cwm-product-card">
                        <img src={b10} alt="Rare-Bliss" />
                        <h3>
                            <Link to="" className="product-link">Rare Beauty-Soft Pinch Liquid Blush-Bliss</Link>
                        </h3>
                        <p className="price">Rs4500.00</p>
                        <button className="btn-add-to-bag">Add to Bag</button>
                    </div>
                    <div className="cwm-product-card">
                        <img src={b11} alt="Rare-Grateful" />
                        <h3>
                            <Link to="" className="product-link">Rare Beauty-Soft Pinch Liquid Blush-Grateful</Link>
                        </h3>
                        <p className="price">Rs4500.00</p>
                        <button className="btn-add-to-bag">Add to Bag</button>
                    </div>
                    <div className="cwm-product-card">
                        <img src={b12} alt="Rare-Encourage" />
                        <h3>
                            <Link to="" className="product-link">Rare Beauty-Soft Pinch Liquid Blush-Encourage</Link>
                        </h3>
                        <p className="price">Rs4500.00</p>
                        <button className="btn-add-to-bag">Add to Bag</button>
                    </div>
                    <div className="cwm-product-card">
                        <img src={b13} alt="Rare-Happy" />
                        <h3>
                            <Link to="" className="product-link">Rare Beauty-Soft Pinch Liquid Blush-Happy</Link>
                        </h3>
                        <p className="price">Rs4500.00</p>
                        <button className="btn-add-to-bag">Add to Bag</button>
                    </div>
                    <div className="cwm-product-card">
                        <img src={b14} alt="Rare-Hope" />
                        <h3>
                            <Link to="" className="product-link">Rare Beauty-Soft Pinch Liquid Blush-Hope</Link>
                        </h3>
                        <p className="price">Rs4500.00</p>
                        <button className="btn-add-to-bag">Add to Bag</button>
                    </div>
                    <div className="cwm-product-card">
                        <img src={b15} alt="Rare-Love" />
                        <h3>
                            <Link to="" className="product-link">Rare Beauty-Soft Pinch Liquid Blush-Love</Link>
                        </h3>
                        <p className="price">Rs4500.00</p>
                        <button className="btn-add-to-bag">Add to Bag</button>
                    </div>
                    <div className="cwm-product-card">
                        <img src={b16} alt="Rare-Lucky" />
                        <h3>
                            <Link to="" className="product-link">Rare Beauty-Soft Pinch Liquid Blush-Lucky</Link>
                        </h3>
                        <p className="price">Rs4500.00</p>
                        <button className="btn-add-to-bag">Add to Bag</button>
                    </div>
                    <div className="cwm-product-card">
                        <img src={b17} alt="Rare-Virtue" />
                        <h3>
                            <Link to="" className="product-link">Rare Beauty-Soft Pinch Liquid Blush-Virtue</Link>
                        </h3>
                        <p className="price">Rs4500.00</p>
                        <button className="btn-add-to-bag">Add to Bag</button>
                    </div>
                    <div className="cwm-product-card">
                        <img src={b18} alt="Rare-Believe" />
                        <h3>
                            <Link to="" className="product-link">Rare Beauty-Soft Pinch Liquid Blush-Believe</Link>
                        </h3>
                        <p className="price">Rs4500.00</p>
                        <button className="btn-add-to-bag">Add to Bag</button>
                    </div>
                    <div className="cwm-product-card">
                        <img src={b19} alt="Rare-Dewy" />
                        <h3>
                            <Link to="" className="product-link">Rare Beauty-Soft Pinch Liquid Blush-Dewy</Link>
                        </h3>
                        <p className="price">Rs4500.00</p>
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

export default BlushCatalog;
