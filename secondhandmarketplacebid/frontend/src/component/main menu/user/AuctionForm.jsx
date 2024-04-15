import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuctionForm.css';
import axios from 'axios';

function AuctionForm(props) {
  const naviagate = useNavigate();
  const initialFormData = {
    name: '',
    username: JSON.parse(localStorage.getItem('userInfo')).username,
    description: '',
    category: '',
    condition: '',
    start_bid: '',
    min_sale: '',
    auction_length: '',
    get_it_now: '',
    returnable: false,
  };
  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleValidation = () => {
    if (parseFloat(formData.min_sale) < parseFloat(formData.start_bid)) {
      alert('minimum sale price must be greater or equal to starting bid');
      return false;
    }

    if (formData.get_it_now.length > 0) {
      if (parseFloat(formData.get_it_now) < parseFloat(formData.min_sale)) {
        alert('get it now must be greater or equal to minimum sale price ');
        return false;
      }
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (handleValidation()) {
      axios
        .post('http://localhost:3001/item', formData)
        .then((response) => {
          console.log('response data', response.data);
          alert('Item listed successfully');
          setFormData(initialFormData);
        })
        .catch((error) => {
          if (error.response) {
            console.error(
              'Server returned status code:',
              error.response.status,
            );
            console.error('Response data:', error.response.data);
          } else if (error.request) {
            console.error('No response received:', error.request);
          } else {
            console.error('An error occurred:', error.message);
          }
        });
    }
  };
  function handleCancel() {
    naviagate('/mainMenu');
  }

  return (
    <form className="AuctionForm" onSubmit={handleSubmit}>
      <div>
        <label>Item Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Category:</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          required
        >
          <option value="">Select Category</option>
          <option value="Art">Art</option>
          <option value="Books">Books</option>
          <option value="Electronics">Electronics</option>
          <option value="Home & Garden">Home & Garden</option>
          <option value="Sporting Goods">Sporting Goods</option>
          <option value="Toys">Toys</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div>
        <label>Condition:</label>
        <select
          name="condition"
          value={formData.condition}
          onChange={handleInputChange}
          required
        >
          <option value="">Select Condition</option>
          <option value="New">New</option>
          <option value="Very Good">Very Good</option>
          <option value="Good">Good</option>
          <option value="Fair">Fair</option>
          <option value="Poor">Poor</option>
        </select>
      </div>
      <div>
        <label>Start Auction Bidding At:</label>
        <input
          type="number"
          name="start_bid"
          min="0.01"
          step="0.01"
          value={formData.start_bid}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Minimum Sale Price:</label>
        <input
          type="number"
          name="min_sale"
          min="0.01"
          step="0.01"
          value={formData.min_sale}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Auction Ends In (Days) :</label>
        <select
          name="auction_length"
          value={formData.auction_length}
          onChange={handleInputChange}
          required
        >
          <option value="">Select Aucton Length</option>
          <option value="1">1</option>
          <option value="3">3</option>
          <option value="5">5</option>
          <option value="7">7</option>
        </select>
      </div>
      <div>
        <label>Get It Now Price:</label>
        <input
          type="number"
          name="get_it_now"
          min="0.01"
          step="0.01"
          value={formData.get_it_now}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Return Accepted?</label>
        <input
          type="checkbox"
          name="returnable"
          checked={formData.returnable}
          onChange={handleInputChange}
        />
      </div>
      <div className="button-container">
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
        <button type="submit">List my Item</button>
      </div>
    </form>
  );
}

export default AuctionForm;
