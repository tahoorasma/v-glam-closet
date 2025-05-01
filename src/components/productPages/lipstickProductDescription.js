import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../navbar";
import "./productDescription.css";
import axios from "axios";
import AddToBag from "../addToBag/addToBag";
import { v4 as uuidv4 } from "uuid";

const LipstickProductDescription = () => {
    const { productID } = useParams();
    const [product, setProduct] = useState(null);
    const [showBag, setShowBag] = useState(false);    
    const [mostViewed, setMostViewed] = useState([]);

    let userID = localStorage.getItem("userID");
    if (!userID) {
        userID = uuidv4();
        localStorage.setItem("userID", userID);
    }

    useEffect(() => {
        fetch(`http://127.0.0.1:5000/product/${productID}`)
            .then(response => response.json())
            .then(data => setProduct(data))
            .catch(error => console.error("Error fetching product details:", error));
        
            fetch('http://127.0.0.1:5000/most-viewed-lipstick')
                .then(response => response.json())
                .then(data => setMostViewed(data.slice(0, 3))) 
                .catch(error => console.error("Error fetching most viewed products:", error));
        
    }, [productID]);

    if (!product) {
        return <p>Loading product details...</p>;
    }

    const handleAddToBag = async (product) => {
        try {
            await axios.post("http://localhost:5000/addToCart", {
                userID: userID,
                productID: product.productID,
                productName: product.productName,
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
            
            <div className="pd-header">V-Glam Closet</div>
            <Navbar />

            <div className="hyperlinks" style={{ margin: "20px 0", padding: "0 40px", textAlign: "left", color: "black" }}>
                <Link to="/makeup" className="hyperlink" style={{ color: "#575555" }}>Makeup</Link> /
                <Link to="/lipstick-catalog" className="hyperlink" style={{ color: "#575555" }}> Lipsticks</Link> / 
                <Link to="" className="hyperlink" style={{ color: "#e66a7e" }}> {product.productID}</Link>
            </div>

            <div className="pd-product-container">
                <img src={product.imageLink} alt={product.productName} className="pd-product-image" />
                <div className="pd-product-details">
                    <h2>{product.productName}</h2>
                    <p className="pd-description">{product.description}</p>
                    <p className="pd-price">Rs {product.price}.00</p>
                    <p className="pd-rating">Rating: {product.rating}/5</p>
                    <p className="pd-stats">Sold: {product.sellingCount} | Viewed: {product.accessCount}</p>
                    <button className="btn-add-to-bag" onClick={() => handleAddToBag(product)}>
                        Add to Bag
                    </button>
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

            <div className="most-viewed-section">
                <hr className="section-divider" />
                <h2 className="section-title">Frequently Bought Together With</h2>
                <div className="most-viewed-row">
                    {mostViewed.map((item) => (
                        <div key={item.productID} className="most-viewed-card">
                            <div className="most-viewed-image-container">
                                <img src={item.imageLink} alt={item.productName} className="most-viewed-image" />
                            </div>
                            <div className="most-viewed-content">
                                <h4 className="most-viewed-name">{item.productName}</h4>
                                <p className="most-viewed-price">Rs {item.price}.00</p>
                                <div className="most-viewed-footer">
                                    <p className="most-viewed-count">Views: {item.accessCount}</p>
                                    <Link to={`/lipstickProductDescription/${item.productID}`} className="most-viewed-link">View Details</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <hr className="section-divider" />
            </div>  
            
            <div className="most-viewed-section">
                <hr className="section-divider" />
                <h2 className="section-title">Frequently Accessed Lipsticks</h2>
                <div className="most-viewed-row">
                    {mostViewed.map((item) => (
                        <div key={item.productID} className="most-viewed-card">
                            <div className="most-viewed-image-container">
                                <img src={item.imageLink} alt={item.productName} className="most-viewed-image" />
                            </div>
                            <div className="most-viewed-content">
                                <h4 className="most-viewed-name">{item.productName}</h4>
                                <p className="most-viewed-price">Rs {item.price}.00</p>
                                <div className="most-viewed-footer">
                                    <p className="most-viewed-count">Views: {item.accessCount}</p>
                                    <Link to={`/lipstickProductDescription/${item.productID}`} className="most-viewed-link">View Details</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <hr className="section-divider" />
            </div>       

            <div className="footer">
                <p>&copy; 2024 V-Glam Closet</p>
            </div>

        </div>
    );
};

export default LipstickProductDescription;
