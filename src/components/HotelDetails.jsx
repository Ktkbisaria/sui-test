import React from 'react';
import { useParams } from 'react-router-dom';

const HotelDetails = () => {
  const { id } = useParams(); // Get the hotel ID from the URL
  return (
    <div>
      <h1>Hotel Details</h1>
      <p>Details for Hotel ID: {id}</p>
      {/* Add logic to fetch and display specific hotel details */}
    </div>
  );
};

export default HotelDetails;
