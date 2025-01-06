import React, { useState } from 'react';
import './checkout.css';
import Navbar from './navbar';
import cp1 from './images/cp1.jpeg';
import cp2 from './images/cp2.jpeg';

const Checkout = () => {
  const [form, setForm] = useState({
    email: '',
    city: '',
    firstName: '',
    lastName: '',
    address: '',
    phone: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleOrder = () => {
    alert('Order Completed!');
  };

  return (
    <div className="checkout-container">
  <header className="header">V-Glam Closet</header>
  <Navbar />
  <div className="checkout-content">
    <div className="cart-info">
      <h2>Cart</h2>
      <div className="product">
        <img src={cp1} alt="Product 1" />
        <div>
          <h6>Gloss Bomb Universal Lip Luminizer</h6>
          <p>PKR 9000</p>
        </div>
      </div>
      <div className="product">
        <img src={cp2} alt="Product 2" />
        <div>
          <h6>Soft Matte Foundation</h6>
          <p>PKR 4500</p>
        </div>
      </div>
      <div className="total">
      <h6>Total:</h6>
      <h5>PKR 13500</h5>
      </div>
    </div>

    <div className="form-container">
      <h2>Contact</h2>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleInputChange}
      />
      <div className="checkbox">
        <input type="checkbox" id="subscribe" />
        <label htmlFor="subscribe">Click here to receive updates</label>
      </div>
      <h2>Delivery</h2>
      <select name="city" value={form.city} onChange={handleInputChange}>
        <option value="">Select city</option>
        <option value="City1">Lahore</option>
        <option value="City2">Karachi</option>
      </select>
      <div className="name-inputs">
        <input
          type="text"
          name="firstName"
          placeholder="First name"
          value={form.firstName}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last name"
          value={form.lastName}
          onChange={handleInputChange}
        />
      </div>
      <input
        type="text"
        name="address"
        placeholder="Address"
        value={form.address}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="phone"
        placeholder="Phone"
        value={form.phone}
        onChange={handleInputChange}
      />
      <div className="payment">
        <h2>Payment</h2>
        <div className="payment-method">
          <input type="radio" id="card" name="payment" />
          <label htmlFor="card">Debit/Credit Card</label>
        </div>
        <div className="payment-method">
          <input type="radio" id="cod" name="payment" />
          <label htmlFor="cod">Cash on Delivery</label>
        </div>
      </div>
      <button className="complete-order" onClick={handleOrder}>
        Complete Order
      </button>
    </div>
  </div>
  <footer className="footer">
    <p>&copy; 2024 V-Glam Closet</p>
  </footer>
</div>
  );
};

export default Checkout;