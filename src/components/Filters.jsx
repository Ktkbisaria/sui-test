import React from 'react';
import './Filters.css';

const Filters = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    <div className="filters">
      <h3>Filters</h3>
      <label>
        Price Range:
        <select name="priceRange" onChange={handleChange}>
          <option value="">All</option>
          <option value="[0,1000]">Up to ₹1000</option>
          <option value="[1001,2000]">₹1001 - ₹2000</option>
          <option value="[2001,5000]">₹2001 - ₹5000</option>
          <option value="[5001,10000]">Above ₹5000</option>
        </select>
      </label>
      <label>
        Rating:
        <select name="rating" onChange={handleChange}>
          <option value="">All</option>
          <option value="1">1 Star</option>
          <option value="2">2 Stars</option>
          <option value="3">3 Stars</option>
          <option value="4">4 Stars</option>
          <option value="5">5 Stars</option>
        </select>
      </label>
      <label>
        City:
        <select name="city" onChange={handleChange}>
          <option value="">All</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Kolkata">Kolkata</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Jaipur">Jaipur</option>
        </select>
      </label>
    </div>
  );
};

export default Filters;