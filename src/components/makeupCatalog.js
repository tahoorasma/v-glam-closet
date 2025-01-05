import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './makeupCatalog.css';
import cp1 from './images/cp1.jpeg';
import cp2 from './images/cp2.jpeg';
import cp3 from './images/cp3.jpeg';
import cp4 from './images/cp4.jpeg';
import Navbar from './navbar';
import AddToBag from './addToBag';

const MakeupCatalog = () => {
    const [showBag, setShowBag] = useState(false); 

    const handleOpenBag = () => {
        setShowBag(true); 
    };

    const handleCloseBag = () => {
        setShowBag(false);
    };

    return (
        <div>
            <div className="header">
                V-Glam Closet
            </div>
            <Navbar />
            <div className="container mt-4">
                <div className="product-grid" style={{marginTop: '-18px'}}>
                    <div className="product-card">
                        <img src={cp1} alt="Powder Blush" />
                        <h3>
                            <Link to="/powder-blush" className="product-link">Powder Blush</Link>
                        </h3>
                        <div className="shade-options">
                            <div className="shade" style={{ backgroundColor: '#f5a5b2' }}></div>
                            <div className="shade" style={{ backgroundColor: '#e57373' }}></div>
                            <div className="shade" style={{ backgroundColor: '#d32f2f' }}></div>
                        </div>
                        <p className="price">Rs3000.00</p>
                        <button className="btn-add-to-bag" onClick={handleOpenBag}>Add to Bag</button>
                    </div>

                    <div className="product-card">
                        <img src={cp2} alt="Lipstick" />
                        <h3>
                            <Link to="/lipstick" className="product-link">Matte Lipstick</Link>
                        </h3>
                        <div className="shade-options">
                            <div className="shade" style={{ backgroundColor: '#f7c5c7' }}></div>
                            <div className="shade" style={{ backgroundColor: '#ec407a' }}></div>
                            <div className="shade" style={{ backgroundColor: '#c2185b' }}></div>
                        </div>
                        <p className="price">Rs2000.00</p>
                        <button className="btn-add-to-bag" onClick={handleOpenBag}>Add to Bag</button>
                    </div>

                    <div className="product-card">
                        <img src={cp3} alt="Foundation" />
                        <h3>
                            <Link to="/foundation" className="product-link">Soft Matte Foundation</Link>
                        </h3>
                        <div className="shade-options">
                            <div className="shade" style={{ backgroundColor: '#ffcc80' }}></div>
                            <div className="shade" style={{ backgroundColor: '#fb8c00' }}></div>
                            <div className="shade" style={{ backgroundColor: '#ef6c00' }}></div>
                        </div>
                        <p className="price">Rs4500.00</p>
                        <button className="btn-add-to-bag" onClick={handleOpenBag}>Add to Bag</button>
                    </div>

                    <div className="product-card">
                        <img src={cp4} alt="Eyeshadow" />
                        <h3>
                            <Link to="/eyeshadow" className="product-link">Nude Eyeshadow</Link>
                        </h3>
                        <div className="shade-options">
                            <div className="shade" style={{ backgroundColor: '#e5be83' }}></div>
                            <div className="shade" style={{ backgroundColor: '#d69b54' }}></div>
                            <div className="shade" style={{ backgroundColor: '#80522d' }}></div>
                        </div>
                        <p className="price">Rs1500.00</p>
                        <button className="btn-add-to-bag" onClick={handleOpenBag}>Add to Bag</button>
                    </div>
                </div>
            </div>
            {showBag && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="close-modal-btn" onClick={handleCloseBag}>
                            &times;
                        </button>
                        <AddToBag />
                    </div>
                </div>
            )}
            <div className="footer">
                <p>&copy; 2024 V-Glam Closet</p>
            </div>
        </div>
    );
};

export default MakeupCatalog;