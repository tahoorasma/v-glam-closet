import React, { useState } from 'react';
import './bestSellers.css';
import Navbar from './navbar';
import bs1 from "./images/catalog/blush/nars-237.png";
import bs2 from "./images/catalog/blush/rare-bliss.png";
import bs3 from "./images/eyeshadow.jpg";
import bs4 from "./images/catalog/foundation/NYX-light.png";
import bs5 from "./images/catalog/eyeshadow/icy-nude.png";
import bs6 from "./images/catalog/eyeshadow/violet-knit.png";
import bs7 from "./images/catalog/sunglasses/sg-4.png";
import 'bootstrap/dist/css/bootstrap.min.css';

const BestSellers = () => {
    const [products] = useState([
        { id: 1, name: "Ombre Blush", price: 4500, reviews: 4108, image: bs1, category: "Face" },
        { id: 2, name: "Soft liquid Blush", price: 3500, reviews: 447, image: bs2, category: "Face" },
        { id: 3, name: "Bliss Eyeshadow", price: 5000, reviews: 1704, image: bs3, category: "Eyes" },
        { id: 4, name: "NYX-Light Foundation", price: 3500, reviews: 447, image: bs4, category: "Face" },
        { id: 5, name: "Icy Nude Eyeshadow", price: 2000, reviews: 1704, image: bs5, category: "Eyes" },
        { id: 6, name: "Violet Knit Eyeshadow", price: 5500, reviews: 447, image: bs6, category: "Face" },
        { id: 7, name: "Sunglasses", price: 3000, reviews: 1704, image: bs7, category: "Eyes" },
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
            <div className="container mt-3">
                <div className="bs controls">
                    <div className="categories">
                        <button onClick={() => handleCategoryChange("All")}>All</button>
                        <button onClick={() => handleCategoryChange("Face")}>Face</button>
                        <button onClick={() => handleCategoryChange("Lip")}>Lip</button>
                        <button onClick={() => handleCategoryChange("Eyes")}>Eyes</button>
                    </div>
                    <div className="sort">
                        <select className="form-select" onChange={(e) => sortProducts(e.target.value)}>
                            <option value="">Sort</option>
                            <option value="lowToHigh">Price: Low to High</option>
                            <option value="highToLow">Price: High to Low</option>
                        </select>
                    </div>
                </div>
                <div className="product-grid mt-3">
                    {filteredProducts.map((product) => (
                        <div key={product.id} className="product-card">
                            <img src={product.image} alt={product.name} />
                            <div className="product-info">
                                <p className="product-name">{product.name}</p>
                                <p className="product-price">Rs {product.price}</p>
                                <p className="product-reviews">{product.reviews} reviews</p>
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
