import React from 'react';
import './rateForm.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function RatingForm({ rateData, username, position }) {
  const stars = [];

  const handleDeleteRate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete('http://localhost:3001/rate', {
        data: { itemID: rateData.itemid, rated_by: rateData.rated_by },
      });
      console.log(response.data);
      window.location.reload();
    } catch (error) {
      console.error(
        'Error deleting rating:',
        error.response ? error.response.data : 'An error occurred',
      );
    }
  };

  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span key={i} className={`star ${i <= rateData.rating ? 'active' : ''}`}>
        ★
      </span>,
    );
  }

  return (
    (rateData.rated_by ||
      rateData.rating != null ||
      rateData.rate_datetime ||
      rateData.comment) && (
      <div className="rating-form">
        <form>
          {position && (
            <button onClick={handleDeleteRate} type="button">
              Delete
            </button>
          )}
          {position == null && rateData.rated_by === username && (
            <button onClick={handleDeleteRate} type="button">
              Delete My Rate
            </button>
          )}
          <p>Item id: {rateData.itemid}</p>
          <p>Rated by: {rateData.rated_by}</p>
          <p>
            Rating: <span>{stars}</span>
          </p>
          <p>Date: {new Date(rateData.rate_datetime).toLocaleString()} </p>
          <p>Comment: {rateData.comment}</p>
        </form>
      </div>
    )
  );
}

export default RatingForm;
