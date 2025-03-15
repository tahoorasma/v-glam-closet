import React, { useState } from 'react';
import './checkout.css';
import Navbar from '../navbar';
import { useLocation } from 'react-router-dom';

const Checkout = () => {
  const location = useLocation();
  const { cartItems, totalPrice } = location.state || { cartItems: [], totalPrice: 0 };

  const [form, setForm] = useState({
    email: '',
    city: '',
    firstName: '',
    lastName: '',
    address: '',
    phone: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    if (type === 'radio') {
      setPaymentMethod(value);
      setErrors({ ...errors, paymentMethod: '' });
    } else {
      setForm({ ...form, [name]: value });
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    let newErrors = {};

    if (!form.email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!form.city) {
      newErrors.city = 'City is required';
    }
    if (!form.firstName) {
      newErrors.firstName = 'First name is required';
    }
    if (!form.lastName) {
      newErrors.lastName = 'Last name is required';
    }
    if (!form.address) {
      newErrors.address = 'Address is required';
    }
    if (!form.phone || !/^\d{10,15}$/.test(form.phone)) {
      newErrors.phone = 'Invalid phone number';
    }
    if (!paymentMethod) {
      newErrors.paymentMethod = 'Please select a payment method';
    }

    return newErrors;
  };

  const handleOrder = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
  
    const userData = {
      name: `${form.firstName} ${form.lastName}`, 
      email: form.email,
      address: form.address,
    };
  
    const orderData = {
      productID: cartItems[0].productID,
      orderDate: new Date().toISOString().split('T')[0],
      NoOfItems: cartItems.reduce((total, item) => total + item.quantity, 0),
      amount: totalPrice,
    };
  
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/addOrder', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ userData, orderData }),
      });
  
      const result = await response.json();
      if (response.ok) {
        alert('Order placed successfully!');
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Order submission error:', error);
      alert('Failed to place order. Please try again later.');
    } finally {
      setLoading(false);
      setForm({
        email: '',
        city: '',
        firstName: '',
        lastName: '',
        address: '',
        phone: '',
      });
      setPaymentMethod('');
      setErrors({});
    }
  };
  

  return (
    <div className="checkout-container">
      <header className="header">V-Glam Closet</header>
      <Navbar />
      <div className="checkout-content">
        <div className="cart-info">
          <h2>Cart</h2>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item.productID} className="product">
                <img src={item.imageLink} alt={item.productName} />
                <div>
                  <h6>{item.productName}</h6>
                  <p>PKR {item.price.toLocaleString()} x {item.quantity}</p>
                </div>
              </div>
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}
          <div className="total">
            <h6>Total:</h6>
            <h5>PKR {totalPrice.toLocaleString()}</h5>
          </div>
        </div>

        <div className="form-container">
          <h2>Contact</h2>
          <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleInputChange} className={errors.email ? 'error-input' : ''} />
          {errors.email && <p className="error-text">{errors.email}</p>}
          <div><br></br></div>

          <h2>Delivery</h2>
          <select name="city" value={form.city} onChange={handleInputChange} className={errors.city ? 'error-input' : ''}>
            <option value="">Select city</option>
            <option value="Lahore">Lahore</option>
            <option value="Karachi">Karachi</option>
          </select>
          {errors.city && <p className="error-text">{errors.city}</p>}
          <div><br></br></div>
          <div className="name-inputs">
            <input type="text" name="firstName" placeholder="First name" value={form.firstName} onChange={handleInputChange} className={errors.firstName ? 'error-input' : ''} />
            <input type="text" name="lastName" placeholder="Last name" value={form.lastName} onChange={handleInputChange} className={errors.lastName ? 'error-input' : ''} />
          </div>
          <div><br></br></div>
          <input type="text" name="address" placeholder="Address" value={form.address} onChange={handleInputChange} className={errors.address ? 'error-input' : ''} />
          <div><br></br></div>
          <input type="text" name="phone" placeholder="Phone" value={form.phone} onChange={handleInputChange} className={errors.phone ? 'error-input' : ''} />
          <div><br></br></div>
          
          <div className="payment">
            <h2>Payment</h2>
            <div className="payment-method">
              <input type="radio" id="card" name="payment" value="card" checked={paymentMethod === 'card'} onChange={handleInputChange} />
              <label htmlFor="card">Debit/Credit Card</label>
            </div>
            <div className="payment-method">
              <input type="radio" id="cod" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={handleInputChange} />
              <label htmlFor="cod">Cash on Delivery</label>
            </div>
            {errors.paymentMethod && <p className="error-text">{errors.paymentMethod}</p>}
          </div>

          <button className="complete-order" onClick={handleOrder} disabled={loading}>
            {loading ? 'Processing...' : 'Complete Order'}
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
