import React, { useState } from 'react';
import './addToBag.css';
import { Link } from 'react-router-dom';
import cp1 from '../images/cp1.jpeg';
import cp2 from '../images/cp2.jpeg';

const AddToBag = () => {
    const [items, setItems] = useState([
        {
            id: 1,
            name: 'Gloss Bomb Universal Lip Luminizer',
            price: 9000,
            image: cp1,
            quantity: 1,
        },
        {
            id: 2,
            name: 'Soft Matte Foundation',
            price: 4500,
            image: cp2,
            quantity: 1,
        },
    ]);

    const increaseQuantity = (id) => {
        setItems(items.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
    };

    const decreaseQuantity = (id) => {
        setItems(items.map(item => item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item));
    };

    const removeItem = (id) => {
        setItems(items.filter(item => item.id !== id));
    };

    const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div>
            <div className="sidebar-header">
                <h2>Your Bag ({items.length})</h2>
            </div>
            <div className="atb-sidebar-content">
                {items.map(item => (
                    <div key={item.id} className="cart-item">
                        <img src={item.image} alt={item.name} className="cart-item-image" />
                        <div className="cart-item-details">
                            <h4>{item.name}</h4>
                            <p>Rs. {item.price.toLocaleString()} PKR</p>
                            <div className="quantity-controls">
                                <button onClick={() => decreaseQuantity(item.id)}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => increaseQuantity(item.id)}>+</button>
                            </div>
                            <button className="remove-btn" onClick={() => removeItem(item.id)}>Remove</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="sidebar-footer">
                <div className="total">
                    <h6>Total:</h6>
                    <h5>Rs. {totalPrice.toLocaleString()} PKR</h5>
                </div>
                <Link to="/checkout">
                    <button className="checkout-btn">Checkout</button>
                </Link>
            </div>
        </div>
    );
};

export default AddToBag;
