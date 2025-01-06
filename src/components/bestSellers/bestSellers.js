import React, { useState } from 'react';
import './bestSellers.css';
import Navbar from '../navbar';
import bs1 from "../images/catalog/blush/nars-237.png";
import bs2 from "../images/catalog/blush/rare-bliss.png";
import bs3 from "../images/catalog/eyeshadow/ultimate-utopia.png";
import bs4 from "../images/catalog/foundation/NYX-light.png";
import bs5 from "../images/catalog/eyeshadow/icy-nude.png";
import bs6 from "../images/catalog/eyeshadow/violet-knit.png";
import bs7 from "../images/catalog/sunglasses/sg-4.png";

const BestSellers = () => {
    const [products] = useState([
        { id: 1, name: "Ombre Blush", price: 4500, ratings: 4, image: bs1, category: "Face" },
        { id: 2, name: "Soft liquid Blush", price: 3500, ratings: 4.4, image: bs2, category: "Face" },
        { id: 3, name: "Bliss Eyeshadow", price: 5000, ratings: 4.6, image: bs3, category: "Eyes" },
        { id: 4, name: "NYX-Light Foundation", price: 3500, ratings: 5, image: bs4, category: "Face" },
        { id: 5, name: "Icy Nude Eyeshadow", price: 2000, ratings: 4, image: bs5, category: "Eyes" },
        { id: 6, name: "Violet Knit Eyeshadow", price: 5500, ratings: 4.1, image: bs6, category: "Face" },
        { id: 7, name: "Sunglasses", price: 3000, ratings: 4.2, image: bs7, category: "Eyes" },
    ]);

    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortedProducts, setSortedProducts] = useState(products);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    const sortProducts = (type) => {
        const sorted = [...products].sort((a, b) => {
            if (type === "lowToHigh") return a.price - b.price;
            if (type === "highToLow") return b.price - a.price;
            return 0;
        });
        setSortedProducts(sorted);
    };

    const filteredProducts = sortedProducts.filter((product) => {
        return selectedCategory === "All" || product.category === selectedCategory;
    });

    return (
        <div>
            <header className="header">V-Glam Closet</header>
            <Navbar />
            <div className="bs-container">
                <div className="bs-controls">
                    <div className="categories">
                        {["All", "Face", "Lip", "Eyes"].map((category) => (
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
                    {filteredProducts.map((product) => (
                        <div key={product.id} className="bs-product-card">
                            <img src={product.image} alt={product.name} />
                            <div className="product-info">
                                <p className="product-name">{product.name}</p>
                                <p className="product-price">Rs {product.price}</p>
                                <p className="product-reviews">{product.ratings} <span style={{ color: '#fcba03', fontSize: '1.2em' }}>★</span> ratings</p>
                                <button className="add-to-bag">Add to Bag</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <footer className="footer">&copy; 2024 V-Glam Closet</footer>
        </div>
    );
};

export default BestSellers;
