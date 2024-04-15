import React from 'react';
import { useLocation } from 'react-router-dom';
import './table.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function SearchResultForm() {
  const location = useLocation();

  const data = location.state?.data || [];
  const navigate = useNavigate();
  function handleClick() {
    navigate('/search');
  }

  return (
    <div>
      <div className="login-box" style={{ width: '50vw' }}>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Item Name</th>
              <th>Current Bid</th>
              <th>High Bidder</th>
              <th>Get It Now Price</th>
              <th>Auction End Time</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>
                    <Link to={`/items/${item.id}`}>{item.item_name}</Link>
                  </td>
                  <td>
                    {item.current_bid != null
                      ? `$${parseFloat(item.current_bid).toFixed(2)}`
                      : '-'}
                  </td>
                  <td>{item.high_bidder != null ? item.high_bidder : '-'}</td>
                  <td>
                    {item.get_it_now_price != null
                      ? `$${parseFloat(item.get_it_now_price).toFixed(2)}`
                      : '-'}
                  </td>
                  <td>{new Date(item.auction_end_time).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No results found</td>
              </tr>
            )}
          </tbody>
        </table>
        <button onClick={handleClick}>back to search </button>
      </div>
    </div>
  );
}

export default SearchResultForm;
