import React from 'react';

import { useLocation } from 'react-router-dom';
import './table.css';

import { useNavigate } from 'react-router-dom';

function CategoryForm({ resultData }) {
  console.log(resultData, 'resultdata');
  const location = useLocation();
  const data = location.state?.data || resultData || [];
  const navigate = useNavigate();

  function handleClick() {
    navigate('/mainMenu');
  }

  return (
    <div>
      <div className="login-box" style={{ width: '50vw' }}>
        <table className="table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Total Items</th>
              <th>Min Price</th>
              <th>Max Price</th>
              <th>Average Price</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index}>
                  <td>{item.category || 'N/A'}</td>
                  <td>{item.total_items}</td>
                  <td>{item.min_price || 'N/A'}</td>
                  <td>{item.max_price || 'N/A'}</td>
                  <td>{item.average_price || 'N/A'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No results found</td>
              </tr>
            )}
          </tbody>
        </table>
        <button onClick={handleClick}>Done</button>
      </div>
    </div>
  );
}

export default CategoryForm;
