import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TopRatedForm from './TopRateItemForm';

function TopRatedItems() {
  const [resultData, setResultData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/topRate');
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
      <TopRatedForm resultData={resultData} />
    </div>
  );
}

export default TopRatedItems;
