import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../navbar";
import "./productDescription.css";
import axios from "axios";
import AddToBag from "../addToBag/addToBag";
import { v4 as uuidv4 } from "uuid";

const BlushProductDescription = () => {
    const { productID } = useParams();
    const [product, setProduct] = useState(null);
    const [showBag, setShowBag] = useState(false);
    const [mostViewed, setMostViewed] = useState([]);
    const [frequentlyBought, setFrequentlyBought] = useState([]);
    const [loading, setLoading] = useState(true);

    let userID = localStorage.getItem("userID");
    if (!userID) {
        userID = uuidv4();
        localStorage.setItem("userID", userID);
    }

     useEffect(() => {
             const fetchAllData = async () => {
                 try {
                     setLoading(true);
                     const productResponse = await fetch(`http://127.0.0.1:5000/product/${productID}`);
                     if (!productResponse.ok) throw new Error('Product fetch failed');
                     const productData = await productResponse.json();
                     setProduct(productData);
     
                     const mostViewedResponse = await fetch('http://127.0.0.1:5000/most-viewed-blush');
                     if (!mostViewedResponse.ok) throw new Error('Most viewed fetch failed');
                     const mostViewedData = await mostViewedResponse.json();
                     setMostViewed(mostViewedData.slice(0, 3));
     
                     const fbtResponse = await fetch(`http://localhost:5000/getFrequentlyBought/${productID}`);
                     if (!fbtResponse.ok) {
                         console.log('No frequently bought items found');
                         setFrequentlyBought([]);
                     } else {
                         const fbtData = await fbtResponse.json();
                         setFrequentlyBought(fbtData || []);
                     }
                     setLoading(false);
                 } catch (error) {
                     console.error("Error fetching data:", error);
                     setLoading(false);
                     setFrequentlyBought([]);
                 }
             };
     
             if (productID) {
                 fetchAllData();
             }
         }, [productID]);
     
         if (loading || !product) {
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

            <div className="hyperlinks">
                <Link to="/makeup" className="hyperlink">Makeup</Link> /
                <Link to="/blush-catalog" className="hyperlink"> Blush</Link> / 
                <Link to="" className="hyperlink active"> {product.productID}</Link>
            </div>

            <div className="pd-product-container">
                <img src={product.imageLink} alt={product.productName} className="pd-product-image" />
                <div className="pd-product-details">
                    <h2>{product.productName}</h2>
                    <p className="pd-description">{product.description}</p>
                    <p className="pd-price">Rs {product.price}.00</p>
                    <p className="pd-rating">{product.rating} <span style={{ color: "#fcba03", fontSize: "1.2em" }}>★</span> ({product.ratingCount})</p>
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

            {frequentlyBought && frequentlyBought.length > 0 && (
                            <div className="most-viewed-section">
                                <hr className="section-divider" />
                                <h2 className="section-title">Frequently Bought Together With</h2>
                                <div className="most-viewed-row">
                                    {frequentlyBought.map((item) => (
                                        <div key={item.productID} className="most-viewed-card">
                                            <div className="most-viewed-image-container">
                                                <img src={item.imageLink} alt={item.productName} className="most-viewed-image" />
                                            </div>
                                            <div className="most-viewed-content">
                                                <h4 className="most-viewed-name">{item.productName}</h4>
                                                <p className="most-viewed-price">Rs {item.price}.00</p>
                                                <div className="most-viewed-footer">
                                                    <Link to={`/sunglassesProductDescription/${item.productID}`} className="most-viewed-link">View Details</Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <hr className="section-divider" />
                            </div>
                        )}  
            
            <div className="most-viewed-section">
                <hr className="section-divider" />
                <h2 className="section-title">Frequently Accessed Blush</h2>
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
                                    <Link to={`/blushProductDescription/${item.productID}`} className="most-viewed-link">View Details</Link>
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

export default BlushProductDescription;