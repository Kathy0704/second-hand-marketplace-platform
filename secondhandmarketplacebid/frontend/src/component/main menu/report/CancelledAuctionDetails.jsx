import React from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import CancelledAuctionForm from './cancelledAuctionForm';

function CancelledAuctionDetails() {
  const [resultData, setResultData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/cancelReport');
        setResultData(response.data);
      } catch (error) {
        console.error(
          'There was an error fetching the top rated items:',
          error,
        );
      }
    };

    fetchData();
  }, []);
  return (
    <div className="login-box" style={{ width: '50vw' }}>
      <CancelledAuctionForm resultData={resultData} />
    </div>
  );
}

export default CancelledAuctionDetails;
