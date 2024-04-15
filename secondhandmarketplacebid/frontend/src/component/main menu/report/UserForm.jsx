import React from 'react';
import { useLocation } from 'react-router-dom';
import './table.css';

import { useNavigate } from 'react-router-dom';

function UserForm({ resultData }) {
  const location = useLocation();
  const data = location.state?.data || resultData || [];
  const navigate = useNavigate();

  function handleClick() {
    navigate('/mainMenu');
  }
  const scrollableStyle = {
    height: '30vh', // 控制可滚动内容区域的高度
    overflowY: 'auto', // 允许在垂直方向上滚动
    width: '100%', // 根据需要调整宽度
  };

  return (
    <div>
      <div className="login-box" style={scrollableStyle}>
        <table className="table">
          <thead>
            <tr>
              <th>User Name</th>
              <th>List</th>
              <th>Sold</th>
              <th>Won</th>
              <th>Rated</th>
              <th>Most Frequent Condition</th>
            </tr>
          </thead>
          <tbody style={scrollableStyle}>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index}>
                  <td>{item.username}</td>

                  <td>{item.listed || 'N/A'}</td>

                  <td>{item.sold}</td>

                  <td>{item.won || 'N/A'}</td>
                  <td>{item.rated || 'N/A'}</td>
                  <td>{item.most_frequent_condition || 'N/A'}</td>
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

export default UserForm;
