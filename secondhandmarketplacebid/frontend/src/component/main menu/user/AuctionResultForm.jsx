import React from 'react';
import { useLocation } from 'react-router-dom';
import './table.css'; // 如果.table.css位于相同目录下；
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function AuctionResultForm({ resultData }) {
  const location = useLocation();
  const data = location.state?.data || resultData || [];
  const navigate = useNavigate();

  function handleClick() {
    navigate('/mainMenu');
  }

  return (
    <div>
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Item ID</th>
              <th>Item Name</th>
              <th>Sale Price</th>
              <th>Winner</th>
              <th>Auction End Time</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index}>
                  <td>{item.itemid}</td>
                  <td>
                    <Link
                      to={{
                        pathname: `/items/itemresult/${item.itemid}`,
                        state: { winner: item.winner || 'N/A' },
                      }}
                    >
                      {item.item_name}
                    </Link>
                  </td>
                  <td>{item.sale_price || 'N/A'}</td>
                  <td>{item.winner || 'N/A'}</td>
                  <td>
                    {item.auction_end_time
                      ? new Date(item.auction_end_time).toLocaleString()
                      : 'N/A'}
                  </td>{' '}
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

export default AuctionResultForm;
