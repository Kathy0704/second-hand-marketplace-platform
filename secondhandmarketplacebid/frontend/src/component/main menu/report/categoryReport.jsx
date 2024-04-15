import React from 'react';
import CategoryForm from './categoryReportForm';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

function CategoryReport() {
  const [resultData, setResultData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/category');
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
      <CategoryForm resultData={resultData} />
    </div>
  );
}

export default CategoryReport;
