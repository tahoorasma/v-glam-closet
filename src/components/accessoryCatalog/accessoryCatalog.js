import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './accessoryCatalog.css';
import Navbar from '../navbar';
import AddToBag from '../addToBag/addToBag';

const AccessoryCatalog = () => {
    const [showBag, setShowBag] = useState(false);
    const [products, setProducts] = useState([]);
    const [activeTab, setActiveTab] = useState('jewelry');

    useEffect(() => {
        fetch(`http://localhost:5000/accessoryCatalog?subcategory=${activeTab}`)
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching accessories:', error));
    }, [activeTab]); 

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const handleOpenBag = () => {
        setShowBag(true);
    };

    const handleCloseBag = () => {
        setShowBag(false);
    };

    return (
        <div>
            <div className="header">V-Glam Closet</div>
            <Navbar />

            <div className="tabs-container">
                <Link to="" className="tab-link" style={{color:'white', backgroundColor: 'black'}}>Jewelry</Link>
                <Link to="/sunglasses-catalog" className="tab-link">Sunglasses</Link>
            </div>

            <div className="container mt-4">
                <div className="product-grid" style={{ marginTop: '-18px' }}>
                    {products.map((product, index) => (
                        <div key={index} className="product-card">
                            <img 
                                src={product.imageLink} 
                                alt={product.productName} 
                            />
                            <h3>
                                <Link to={`/${product.subCategoryID}`} className="product-link">{product.productName}</Link>
                            </h3>
                            <p className="price">Rs{product.price.toFixed(2)}</p>
                            <button className="btn-add-to-bag" onClick={handleOpenBag}>Add to Bag</button>
                        </div>
                    ))}
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

export default AccessoryCatalog;
