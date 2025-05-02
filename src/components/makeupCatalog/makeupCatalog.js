import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../navbar"; 
import AddToBag from "../addToBag/addToBag";
import "./makeupCatalog.css";
import { v4 as uuidv4 } from "uuid";

const MakeupCatalog = () => {
    const [products, setProducts] = useState([]);
    const [showBag, setShowBag] = useState(false);
    
    let userID = localStorage.getItem("userID");
    if (!userID) {
        userID = uuidv4();
        localStorage.setItem("userID", userID);
    }

    useEffect(() => {
        fetch("http://127.0.0.1:5000/makeupCatalog")
            .then(response => response.json())
            .then(data => setProducts(data || []))
            .catch(error => console.error("Error fetching data:", error));
    }, []);

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
            <div className="header">V-Glam Closet</div>
            <Navbar />
                <div className="hyperlinks" style={{ margin: "20px 0", padding: "0 40px", textAlign: "left", color: "black" }}>
                    <Link to="/makeup" className="hyperlink" style={{ color: "#575555" }}>Makeup</Link> /
                    <Link to="" className="hyperlink" style={{ color: "#e66a7e" }}> All Makeup</Link>
                </div>
                <div className="product-grid" style={{ marginTop: "-18px" }}>
                    {products.length > 0 ? (
                        products.map((product, index) => (
                            <div className="product-card" key={index}>
                                <img src={product.imageLink} alt={product.productName} />
                                <h3>
                                    <Link to={`/productDescription/${product.productID}`} className="product-link">
                                        {product.productName}
                                    </Link>
                                </h3>
                                <p className="price">Rs {product.price}.00</p>
                                <p className="product-reviews">{product.rating} <span style={{ color: "#fcba03", fontSize: "1.2em" }}>★</span> ({product.ratingCount})</p>
                                <button className="btn-add-to-bag" onClick={() => handleAddToBag(product)}>
                                    Add to Bag
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>Loading products...</p>
                    )}
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

export default MakeupCatalog;
