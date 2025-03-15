import React, { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import "./addToBag.css";

const AddToBag = () => {
    const [items, setItems] = useState([]);

    let userID = localStorage.getItem("userID");
    if (!userID) {
        userID = uuidv4();
        localStorage.setItem("userID", userID);
    }

    const fetchCart = () => {
        axios
            .get(`http://localhost:5000/getCart?userID=${userID}`)
            .then((response) => {
                setItems(response.data);
            })
            .catch((error) => console.error("Error fetching cart:", error));
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const updateQuantity = async (id, action) => {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.productID === id
                    ? { 
                        ...item, 
                        quantity: action === "increase" ? item.quantity + 1 : Math.max(1, item.quantity - 1) 
                      }
                    : item
            )
        );
    
        try {
            await axios.post("http://localhost:5000/updateQuantity", {
                userID: userID,
                productID: id,
                action: action
            });
    
            fetchCart();
        } catch (error) {
            console.error("Error updating cart:", error.response?.data || error.message);
            alert("Failed to update cart");
        }
    };
    
    
    const removeItem = async (id) => {
        try {
            await axios.post("http://localhost:5000/removeFromCart", {
                userID: userID,
                productID: id,
            });

            setItems((prevItems) => prevItems.filter((item) => item.productID !== id));
        } catch (error) {
            console.error("Error removing item:", error);
            alert("Failed to remove item");
        }
    };

    const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div>
            <div className="sidebar-header">
                <h2>Your Bag ({items.length})</h2>
            </div>
            <div className="atb-sidebar-content">
                {items.map((item) => (
                    <div key={item.productID} className="cart-item">
                        <img src={item.imageLink} alt={item.productName} className="cart-item-image" />
                        <div className="cart-item-details">
                            <h4>{item.productName}</h4>
                            <p>Rs. {item.price.toLocaleString()} PKR</p>
                            <div className="quantity-controls">
                                <button onClick={() => updateQuantity(item.productID, "decrease")} disabled={item.quantity <= 1}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.productID, "increase")}>+</button>
                            </div>
                            <button className="remove-btn" onClick={() => removeItem(item.productID)}>Remove</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="atb-sidebar-footer">
                <div className="total">
                    <h6>Total:</h6>
                    <h5>Rs. {totalPrice.toLocaleString()} PKR</h5>
                </div>
                <Link to="/checkout" state={{ cartItems: items, totalPrice: totalPrice }}>
                <button className="atb-checkout-btn">Checkout</button>
                </Link>
            </div>
        </div>
    );
};

export default AddToBag;
