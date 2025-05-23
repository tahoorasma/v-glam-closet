import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../navbar";
import "./eyeshadowCatalog.css";
import AddToBag from "../addToBag/addToBag";
import { v4 as uuidv4 } from "uuid";

const EyeshadowCatalog = () => {
    const [eyeshadowProducts, setEyeshadowProducts] = useState([]);
    const [showBag, setShowBag] = useState(false);
    const [addedProduct, setAddedProduct] = useState(null);

    let userID = localStorage.getItem("userID");
    if (!userID) {
        userID = uuidv4();
        localStorage.setItem("userID", userID);
    }

    useEffect(() => {
        fetch("http://localhost:5000/eyeshadowProducts")
            .then(response => response.json())
            .then(data => setEyeshadowProducts(data))
            .catch(error => console.error("Error fetching eyeshadow products:", error));
    }, []);

    const handleAddToBag = async (product) => {
        try {
            await axios.post("http://localhost:5000/addToCart", {
                userID: userID,
                productID: product.productID,
                productName: product.productName,
                quantity: 1
            });

            setAddedProduct(product);
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

            <div className="hyperlinks" style={{ margin: "20px 0", padding: "0 40px", textAlign: "left", color: "black" }}>
                <Link to="/makeup" className="hyperlink" style={{ color: "#575555" }}>Makeup</Link> /
                <Link to="" className="hyperlink" style={{ color: "#e66a7e" }}> Eyeshadow</Link>
            </div>

            <div className="container mt-4">
                <div className="product-grid" style={{ marginTop: "-18px" }}>
                    {eyeshadowProducts.length > 0 ? (
                        eyeshadowProducts.map((product, index) => (
                            <div key={index} className="cwm-product-card">
                                <img src={product.imageLink} alt={product.productName} />
                                <h3>
                                    <Link to={`/eyeshadowProductDescription/${product.productID}`} className="product-link">
                                        {product.productName}
                                    </Link>
                                </h3>
                                <p className="price">Rs {product.price}</p>
                                <p className="product-reviews">{product.rating} <span style={{ color: "#fcba03", fontSize: "1.2em" }}>★</span> ({product.ratingCount})</p>
                                <button className="btn-add-to-bag" onClick={() => handleAddToBag(product)}>Add to Bag</button>
                            </div>
                        ))
                    ) : (
                        <p>Loading eyeshadow products...</p>
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

export default EyeshadowCatalog;
