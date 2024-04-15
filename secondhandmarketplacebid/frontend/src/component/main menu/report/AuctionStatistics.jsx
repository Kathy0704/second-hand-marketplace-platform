import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './auctionstatistics.css';
import { useNavigate } from 'react-router-dom';

function AuctionStatistics() {
  const [statistics, setStatistics] = useState({
    'Auctions Active': 0,
    'Auctions Finished': 0,
    'Auctions Won': 0,
    'Auctions Cancelled': 0,
    'Items Rated': 0,
    'Items Not Rated': 0,
  });
  const navigate = useNavigate();

  function handleClick() {
    navigate('/mainMenu');
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/auctionstat');
        const data = response.data;

        const stats = {
          'Auctions Active': 0,
          'Auctions Finished': 0,
          'Auctions Won': 0,
          'Auctions Cancelled': 0,
          'Items Rated': 0,
          'Items Not Rated': 0,
        };

        data.forEach((stat) => {
          stats[stat.type] = stat.ct;
        });
        setStatistics(stats);
      } catch (error) {
        console.error(
          'There was an error fetching the auction statistics:',
          error,
        );
      }
    };

    fetchData();
  }, []);

  return (
    <div className="login-box" style={{ width: '30vw', padding: '20px' }}>
      <h2>Auction Statistics</h2>
      <div className="statistic-item">
        <strong style={{ marginRight: '20px' }}>Active Auctions:</strong>{' '}
        {statistics['Auctions Active']}
      </div>
      <div className="statistic-item">
        <strong style={{ marginRight: '20px' }}>Finished Auctions:</strong>{' '}
        {statistics['Auctions Finished']}
      </div>
      <div className="statistic-item">
        <strong style={{ marginRight: '20px' }}>Auctions Won:</strong>{' '}
        {statistics['Auctions Won']}
      </div>
      <div className="statistic-item">
        <strong style={{ marginRight: '20px' }}>Cancelled Auctions:</strong>{' '}
        {statistics['Auctions Cancelled']}
      </div>
      <div className="statistic-item">
        <strong style={{ marginRight: '20px' }}>Items Rated:</strong>{' '}
        {statistics['Items Rated']}
      </div>
      <div className="statistic-item">
        <strong style={{ marginRight: '20px' }}>Items Not Rated:</strong>{' '}
        {statistics['Items Not Rated']}
      </div>
      <button onClick={handleClick}>Done</button>
    </div>
  );
}

export default AuctionStatistics;
