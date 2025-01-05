import React from 'react';
import { Link } from 'react-router-dom';
import './categoryWiseMakeup.css';
import f1 from './images/catalog/foundation/NYX-pale.png';
import f2 from './images/catalog/foundation/NYX-light-porcelian.png';
import f3 from './images/catalog/foundation/NYX-light-ivory.png';
import f4 from './images/catalog/foundation/NYX-light.png';
import f5 from './images/catalog/foundation/NYX-fair.png';
import f6 from './images/catalog/foundation/NYX-vanilla.png';
import f7 from './images/catalog/foundation/NYX-warm-vanilla.png';
import f8 from './images/catalog/foundation/NYX-nude.png';
import f9 from './images/catalog/foundation/NYX-natural.png';
import f10 from './images/catalog/foundation/NYX-true-beige.png';
import f11 from './images/catalog/foundation/NYX-buff.png';
import f12 from './images/catalog/foundation/NYX-medium-buff.png';
import f13 from './images/catalog/foundation/NYX-medium-olive.png';
import f14 from './images/catalog/foundation/NYX-soft-beige.png';
import Navbar from './navbar';

const FoundationCatalog = () => {
    return (
        <div>
            <div className="header">
                V-Glam Closet
            </div>
            <Navbar />

            <div className="hyperlinks" style={{ margin: '20px 0', padding: '0 40px', textAlign: 'left', color:'black' }}>
                <Link to="/makeup" className="hyperlink" style={{ color:'#575555' }}>Makeup</Link> /
                <Link to="" className="hyperlink" style={{ color:'#e66a7e' }}> Foundation</Link>
            </div>

            <div className="container mt-4">
                <div className="product-grid" style={{ marginTop: '-18px' }}>
                    <div className="product-card">
                        <img src={f1} alt="NYX-Can't Stop Won't Stop" />
                        <h3>
                            <Link to="" className="product-link">NYX-Can't Stop Won't Stop-Pale</Link>
                        </h3>
                        <p className="price">Rs4500.00</p>
                        <button className="btn-add-to-bag">Add to Bag</button>
                    </div>
                    <div className="product-card">
                        <img src={f2} alt="NYX-Can't Stop Won't Stop" />
                        <h3>
                            <Link to="" className="product-link">NYX-Can't Stop Won't Stop-Light Porcelian</Link>
                        </h3>
                        <p className="price">Rs4500.00</p>
                        <button className="btn-add-to-bag">Add to Bag</button>
                    </div>
                    <div className="product-card">
                        <img src={f3} alt="NYX-Can't Stop Won't Stop" />
                        <h3>
                            <Link to="" className="product-link">NYX-Can't Stop Won't Stop-Light Ivory</Link>
                        </h3>
                        <p className="price">Rs4500.00</p>
                        <button className="btn-add-to-bag">Add to Bag</button>
                    </div>
                    <div className="product-card">
                        <img src={f4} alt="NYX-Can't Stop Won't Stop" />
                        <h3>
                            <Link to="" className="product-link">NYX-Can't Stop Won't Stop-Light</Link>
                        </h3>
                        <p className="price">Rs4500.00</p>
                        <button className="btn-add-to-bag">Add to Bag</button>
                    </div>
                    <div className="product-card">
                        <img src={f5} alt="NYX-Can't Stop Won't Stop" />
                        <h3>
                            <Link to="" className="product-link">NYX-Can't Stop Won't Stop-Fair</Link>
                        </h3>
                        <p className="price">Rs4500.00</p>
                        <button className="btn-add-to-bag">Add to Bag</button>
                    </div>
                    <div className="product-card">
                        <img src={f6} alt="NYX-Can't Stop Won't Stop" />
                        <h3>
                            <Link to="" className="product-link">NYX-Can't Stop Won't Stop-Vanilla</Link>
                        </h3>
                        <p className="price">Rs4500.00</p>
                        <button className="btn-add-to-bag">Add to Bag</button>
                    </div>
                    <div className="product-card">
                        <img src={f7} alt="NYX-Can't Stop Won't Stop" />
                        <h3>
                            <Link to="" className="product-link">NYX-Can't Stop Won't Stop-Warm Vanilla</Link>
                        </h3>
                        <p className="price">Rs4500.00</p>
                        <button className="btn-add-to-bag">Add to Bag</button>
                    </div>
                    <div className="product-card">
                        <img src={f8} alt="NYX-Can't Stop Won't Stop" />
                        <h3>
                            <Link to="" className="product-link">NYX-Can't Stop Won't Stop-Nude</Link>
                        </h3>
                        <p className="price">Rs4500.00</p>
                        <button className="btn-add-to-bag">Add to Bag</button>
                    </div>
                    <div className="product-card">
                        <img src={f9} alt="NYX-Can't Stop Won't Stop" />
                        <h3>
                            <Link to="" className="product-link">NYX-Can't Stop Won't Stop-Natural</Link>
                        </h3>
                        <p className="price">Rs4500.00</p>
                        <button className="btn-add-to-bag">Add to Bag</button>
                    </div>
                    <div className="product-card">
                        <img src={f10} alt="NYX-Can't Stop Won't Stop" />
                        <h3>
                            <Link to="" className="product-link">NYX-Can't Stop Won't Stop-True Beige</Link>
                        </h3>
                        <p className="price">Rs4500.00</p>
                        <button className="btn-add-to-bag">Add to Bag</button>
                    </div>
                    <div className="product-card">
                        <img src={f11} alt="NYX-Can't Stop Won't Stop" />
                        <h3>
                            <Link to="" className="product-link">NYX-Can't Stop Won't Stop-Buff</Link>
                        </h3>
                        <p className="price">Rs4500.00</p>
                        <button className="btn-add-to-bag">Add to Bag</button>
                    </div>
                    <div className="product-card">
                        <img src={f12} alt="NYX-Can't Stop Won't Stop" />
                        <h3>
                            <Link to="" className="product-link">NYX-Can't Stop Won't Stop-Medium Buff</Link>
                        </h3>
                        <p className="price">Rs4500.00</p>
                        <button className="btn-add-to-bag">Add to Bag</button>
                    </div>
                    <div className="product-card">
                        <img src={f13} alt="NYX-Can't Stop Won't Stop" />
                        <h3>
                            <Link to="" className="product-link">NYX-Can't Stop Won't Stop-Medium Olive</Link>
                        </h3>
                        <p className="price">Rs4500.00</p>
                        <button className="btn-add-to-bag">Add to Bag</button>
                    </div>
                    <div className="product-card">
                        <img src={f14} alt="NYX-Can't Stop Won't Stop" />
                        <h3>
                            <Link to="" className="product-link">NYX-Can't Stop Won't Stop-Soft Beige</Link>
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

export default FoundationCatalog;
