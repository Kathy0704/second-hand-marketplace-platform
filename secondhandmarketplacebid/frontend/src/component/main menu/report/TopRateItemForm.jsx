import React from 'react';
import { useLocation } from 'react-router-dom';
import './table.css'; // 如果.table.css位于相同目录下；

import { useNavigate } from 'react-router-dom';

function TopRatedForm({ resultData }) {
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
              <th>Item Name</th>
              <th>Average Rating</th>
              <th>Rate Count</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>

                  <td>{item.avg_rating || 'N/A'}</td>
                  <td>{item.rating_ct || 'N/A'}</td>
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

export default TopRatedForm;
