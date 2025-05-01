import React, { useState, useEffect } from 'react';
import './bestSellers.css';
import Navbar from '../navbar';

const BestSellers = () => {
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortedProducts, setSortedProducts] = useState([]);

    useEffect(() => {
        const query = selectedCategory !== "All" ? `?subcategory=${selectedCategory.toLowerCase()}` : "";
        fetch(`http://localhost:5000/best-sellers${query}`)
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setSortedProducts(data);
            })
            .catch(err => console.error("Error fetching best sellers:", err));
    }, [selectedCategory]);    

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        console.log("Category: "+category);
        let url = 'http://127.0.0.1:5000/best-sellers';
        if (category !== "All") {
            url += `?subcategory=${category.toLowerCase()}`;
            console.log("Url: "+url);
        }
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setSortedProducts(data);
            })
            .catch(err => console.error("Error fetching best sellers by subcategory:", err));
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
                    {filteredProducts.map((product) => (
                        <div key={product.productID} className="bs-product-card">
                            <img src={product.imageLink} alt={product.productName} />
                            <div className="product-info">
                                <p className="product-name">{product.productName}</p>
                                <p className="product-price">Rs {product.price}</p>
                                <p className="product-reviews">{product.rating} <span style={{ color: '#fcba03', fontSize: '1.2em' }}>★</span> ratings</p>
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
