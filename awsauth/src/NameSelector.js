import React, { useEffect, useState } from 'react';
import RandomNameCycle from './RandomNameCycle';

const NameSelector = () => {
  const [names, setNames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const base_url = 'https://nameselectorapi.azurewebsites.net/api/NameSelector?code=';
        const response = await fetch(base_url + process.env.REACT_APP_API_KEY);
        const data = await response.json();
        const nameValues = data.map(item => item.PreferredName); // Updated line
        setNames(nameValues);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <RandomNameCycle names={names} />
    </div>
  );
};

export default NameSelector;
