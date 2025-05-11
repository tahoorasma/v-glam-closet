import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import './bestSellers.css';
import Navbar from '../navbar';
import AddToBag from '../addToBag/addToBag';
import { v4 as uuidv4 } from "uuid";

const BestSellers = () => {
    const [products, setProducts] = useState([]);
    const [showBag, setShowBag] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("All");

    useEffect(() => {
        const query = selectedCategory !== "All" ? `?subcategory=${selectedCategory.toLowerCase()}` : "";
        const url = `http://localhost:5000/best-sellers${query}`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setProducts(data);
            })
            .catch(err => console.error("Error fetching best sellers:", err));
    }, [selectedCategory]);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    let userID = localStorage.getItem("userID");
    if (!userID) {
        userID = uuidv4();
        localStorage.setItem("userID", userID);
    }

    const sortProducts = (type) => {
        const sorted = [...products].sort((a, b) => {
            if (type === "lowToHigh") return a.price - b.price;
            if (type === "highToLow") return b.price - a.price;
            return 0;
        });
        setProducts(sorted);
    };

    const handleAddToBag = async (product) => {
        try {
            await axios.post("http://localhost:5000/addToCart", {
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
            <header className="header">V-Glam Closet</header>
            <Navbar />
            <div className="bs-container">
                <div className="bs-controls">
                    <div className="categories">
                        {["All", "Foundation", "Lipstick", "Blush", "Eyeshadow", "Jewelry", "Sunglasses"].map((category) => (
                            <button
                                key={category}
                                onClick={() => handleCategoryChange(category)}
                                className={selectedCategory === category ? "active" : ""}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                    <div className="sort">
                        <select onChange={(e) => sortProducts(e.target.value)}>
                            <option value="">Sort</option>
                            <option value="lowToHigh">Price: Low to High</option>
                            <option value="highToLow">Price: High to Low</option>
                        </select>
                    </div>
                </div>
                <div className="product-grid">
                    {products.map((product) => (
                        <div key={product._id || product.productID} className="bs-product-card">
                            <img
                                src={product.imageLink}
                                alt={product.productName}
                            />
                            <div className="product-info">
                                <Link to={`/productDescription/${product.productID}`} className="product-link">
                                    {product.productName}
                                </Link>
                                <p className="product-price">Rs {product.price}</p>
                                <p className="product-reviews">
                                    {product.rating} <span style={{ color: '#fcba03', fontSize: '1.2em' }}>★</span> ({product.ratingCount})
                                </p>
                                <button className="btn-add-to-bag" onClick={() => handleAddToBag(product)}>
                                    Add to Bag
                                </button>
                            </div>
                        </div>
                    ))}
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
            </div>
            <footer className="footer">&copy; 2024 V-Glam Closet</footer>
        </div>
    );
};

export default BestSellers;
