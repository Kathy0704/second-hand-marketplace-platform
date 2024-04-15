import React from 'react';
import { useLocation } from 'react-router-dom';
import './table.css';
import { useNavigate } from 'react-router-dom';

function CancelledAuctionForm({ resultData }) {
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
              <th>ID</th>
              <th>Listed by</th>
              <th>Cancelled Date</th>
              <th>Reason</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index}>
                  <td>{item.itemid}</td>
                  <td>{item.username}</td>
                  <td>{item.date || 'N/A'}</td>
                  <td>{item.reason || 'N/A'}</td>
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

export default CancelledAuctionForm;
