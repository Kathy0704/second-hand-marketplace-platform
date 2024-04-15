import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './searchItemForm.css';
import axios from 'axios';

function SearchForm() {
  const [formData, setFormData] = useState({
    keyword: '',
    category: '',
    minimumPrice: '',
    maximumPrice: '',
    condition: '',
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    axios
      .get('http://localhost:3001/search', { params: formData })

      .then((response) => {
        console.log(response.data);
        navigate('/searchresult', { state: { data: response.data } });
      })
      .catch((error) => console.error(error));
  };
  function handleCancel() {
    navigate('/mainMenu');
  }

  return (
    <form className="searchForm" onSubmit={handleSubmit}>
      <div>
        <label>Keyword:</label>
        <input
          type="text"
          name="keyword"
          value={formData.keyword}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Category:</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleInputChange}
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
        <label>Minimum Price:</label>
        <input
          type="number"
          name="minimumPrice"
          value={formData.minimumPrice}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Maximum Price:</label>
        <input
          type="number"
          name="maximumPrice"
          value={formData.maximumPrice}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Condition at least:</label>
        <select
          name="condition"
          value={formData.condition}
          onChange={handleInputChange}
        >
          <option value="">Select Condition</option>
          <option value="New">New</option>
          <option value="Very Good">Very Good</option>
          <option value="Good">Good</option>
          <option value="Fair">Fair</option>
          <option value="Poor">Poor</option>
        </select>
      </div>
      <div className="button-container">
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
        <button type="submit">Search</button>
      </div>
    </form>
  );
}

export default SearchForm;
