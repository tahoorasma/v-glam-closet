import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../navbar"; 
import AddToBag from "../addToBag/addToBag";
import  "./makeupCatalog.css"
const MakeupCatalog = () => {
    const [products, setProducts] = useState([]);
    const [showBag, setShowBag] = useState(false);

    useEffect(() => {
        fetch("http://127.0.0.1:5000/makeupCatalog")
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("Fetched data:", data);
                setProducts(data || []);
            })
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    const handleOpenBag = () => setShowBag(true);
    const handleCloseBag = () => setShowBag(false);

    return (
        <div>
            <Navbar />
            <div className="container mt-4">
                <h2 className="header">V-Glam Closet</h2>
                <div className="product-grid" style={{ marginTop: "-18px" }}>
                    {products.length > 0 ? (
                        products.map((product, index) => (
                            <div className="product-card" key={index}>
                                 <img src={product.imageLink} alt={product.productName} />
                                <h3>
                                    <Link to={`/${product.productID}`} className="product-link">
                                        {product.productName}
                                    </Link>
                                </h3>
                                <p>{product.description}</p>
                                <p className="price">Rs{product.price}.00</p>
                                <button className="btn-add-to-bag" onClick={handleOpenBag}>Add to Bag</button>
                            </div>
                        ))
                    ) : (
                        <p>Loading products...</p>
                    )}
                </div>
            </div>

            {showBag && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="close-modal-btn" onClick={handleCloseBag}>&times;</button>
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
