import React from 'react';
import { Link } from 'react-router-dom';
import './makeupCatalog.css';
import f1 from './images/catalog/foundation/NYX-csws.png';
import f2 from './images/catalog/foundation/Maybelline-fitme.png';
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
                            <Link to="" className="product-link">NYX-Can't Stop Won't Stop</Link>
                        </h3>
                        <p className="price">Rs4500.00</p>
                        <button className="btn-add-to-bag">Add to Bag</button>
                    </div>

                    <div className="product-card">
                        <img src={f2} alt="Maybelline-Fit Me" />
                        <h3>
                            <Link to="" className="product-link">Maybelline-Fit Me</Link>
                        </h3>
                        <p className="price">Rs3650.00</p>
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
