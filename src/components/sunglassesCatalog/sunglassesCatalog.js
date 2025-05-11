import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './sunglassesCatalog.css';
import Navbar from '../navbar';
import AddToBag from '../addToBag/addToBag';
import { v4 as uuidv4 } from "uuid";

const SunglassesCatalog = () => {
    const [showBag, setShowBag] = useState(false);
    const [products, setProducts] = useState([]);

    let userID = localStorage.getItem("userID");
    if (!userID) {
        userID = uuidv4();
        localStorage.setItem("userID", userID);
    }

    useEffect(() => {
        fetch(`http://192.168.18.110:5000/accessoryCatalog?subcategory=sunglasses`)
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching sunglasses:', error));
    }, []);

    const handleAddToBag = async (product) => {
        try {
            await axios.post("http://192.168.18.110:5000/addToCart", {
                userID: userID,
                productName: product.productName,
                productID: product.productID,
                quantity: 1
            });

            setShowBag(true);
        } catch (error) {
            console.error("Error adding item to cart:", error);
            alert("Failed to add item to cart");
        }
    };

    return (
        <div>
            <div className="header">V-Glam Closet</div>
            <Navbar />

            <div className="tabs-container">
                <Link to="/accessory-catalog" className="tab-link">Jewelry</Link>
                <Link to="" className="tab-link" style={{color:'white', backgroundColor: 'black'}}>Sunglasses</Link>
            </div>

            <div className="container mt-4">
                <div className="product-grid" style={{ marginTop: '-18px' }}>
                    {products.length > 0 ? (
                        products.map((product, index) => (
                            <div key={index} className="product-card">
                                <img 
                                    src={product.imageLink} 
                                    alt={product.productName} 
                                />
                                <h3>
                                    <Link to={`/sunglassesProductDescription/${product.productID}`} className="product-link">
                                        {product.productName}
                                    </Link>
                                </h3>
                                <p className="price">Rs {product.price.toFixed(2)}</p>
                                <p className="product-reviews">{product.rating} <span style={{ color: "#fcba03", fontSize: "1.2em" }}>★</span> ({product.ratingCount})</p>
                                <button className="btn-add-to-bag" onClick={() => handleAddToBag(product)}>
                                    Add to Bag
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>Loading sunglasses...</p>
                    )}
                </div>
            </div>

            {showBag && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="close-modal-btn" onClick={() => setShowBag(false)}>
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

export default SunglassesCatalog;
