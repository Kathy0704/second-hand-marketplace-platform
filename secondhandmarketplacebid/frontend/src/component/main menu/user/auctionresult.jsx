import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AuctionResultForm from './AuctionResultForm';

function AuctionResult(props) {
  const [resultData, setResultData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/results');
        console.log(response.data);

        setResultData(response.data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);

  if (!resultData) {
    return <div>Loading...</div>;
  }
  const scrollableStyle = {
    height: '30vh', // Control the height of the container
    overflowY: 'auto', // Enable vertical scrolling
  };

  return (
    <div className="login-box" style={scrollableStyle}>
      <AuctionResultForm resultData={resultData} />
    </div>
  );
}

export default AuctionResult;
