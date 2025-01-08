// HomePage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import Header from './Header';

function HomePage() {
  const [searchData, setSearchData] = useState({
    hotelNameOrCity: '',
    checkInDate: '',
    checkOutDate: '',
    persons: 1,
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchData({ ...searchData, [name]: value });
  };

  const handleSearch = () => {
    const { hotelNameOrCity, checkInDate, checkOutDate, persons } = searchData;
    if (!hotelNameOrCity || !checkInDate || !checkOutDate || persons < 1) {
      setError('All fields are mandatory!');
      return;
    }
    setError('');
    navigate('/explore-hotels', { state: { searchData } });
  };

  return (
    <div className="home-page">
      <Header></Header>
      <header className="hero-section">
      
        <h1>Find Your Perfect Stay</h1>
        <div className="search-bar">
          <input
            type="text"
            name="hotelNameOrCity"
            placeholder="Enter hotel name or city"
            value={searchData.hotelNameOrCity}
            onChange={handleInputChange}
          />
          <input
            type="date"
            name="checkInDate"
            value={searchData.checkInDate}
            onChange={handleInputChange}
          />
          <input
            type="date"
            name="checkOutDate"
            value={searchData.checkOutDate}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="persons"
            placeholder="Number of persons"
            value={searchData.persons}
            onChange={handleInputChange}
            min="1"
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        {error && <p className="error-message">{error}</p>}
      </header>
    </div>
  );
}

export default HomePage;
