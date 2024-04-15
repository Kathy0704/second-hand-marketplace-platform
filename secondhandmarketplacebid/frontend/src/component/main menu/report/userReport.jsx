import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserForm from './UserForm';

function UserReport() {
  const [resultData, setResultData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/userreport');

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

  return <UserForm resultData={resultData} />;
}

export default UserReport;
