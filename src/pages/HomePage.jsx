import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import { fetchHotelNames, fetchHotelsList } from '../services/api';
import Header from './Header';

function HomePage() {
  const [searchData, setSearchData] = useState({
    hotelNameOrCity: '',
    checkInDate: '',
    checkOutDate: '',
    persons: 1,
  });
  const [error, setError] = useState('');
  const [hotelSuggestions, setHotelSuggestions] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [filters, setFilters] = useState({ priceRange: '', rating: '', city: '' });
  const [sortOption, setSortOption] = useState('');
  const navigate = useNavigate();

  // Fetch hotel names and cities for search suggestions
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const data = await fetchHotelNames();
        setHotelSuggestions(data);
      } catch (error) {
        console.error('Error fetching hotel names:', error);
      }
    };
    fetchHotels();
  }, []);

  // Fetch hotel list for Explore section
  useEffect(() => {
    const fetchHotelsData = async () => {
      try {
        const data = await fetchHotelsList(1, 30); // Fetch first page with 30 hotels
        const processedHotels = data.map((hotel) => ({
          ...hotel,
          minPrice: Math.min(...hotel.rooms.map((room) => room.price)),
          maxPrice: Math.max(...hotel.rooms.map((room) => room.price)),
        }));
        setHotels(processedHotels);
      } catch (error) {
        console.error('Error fetching hotels list:', error);
      }
    };
    fetchHotelsData();
  }, []);

  // Handle input change and filter suggestions
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchData({ ...searchData, [name]: value });

    if (name === 'hotelNameOrCity') {
      const filtered = hotelSuggestions.filter((hotel) =>
        hotel.name.toLowerCase().includes(value.toLowerCase()) ||
        hotel.city.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setSearchData({ ...searchData, hotelNameOrCity: suggestion.name });
    setFilteredSuggestions([]);
  };

  // Handle search submission
  const handleSearch = () => {
    const { hotelNameOrCity, checkInDate, checkOutDate, persons } = searchData;
    if (!hotelNameOrCity || !checkInDate || !checkOutDate || persons < 1) {
      setError('All fields are mandatory!');
      return;
    }
    setError('');
    navigate('/explore-hotels', { state: { searchData } });
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  // Handle sorting
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  // Apply filters and sorting
  const getFilteredAndSortedHotels = () => {
    let filteredHotels = hotels;

    // Apply filters
    if (filters.priceRange) {
      if (filters.priceRange === 'upTo1000') {
        filteredHotels = filteredHotels.filter((hotel) => hotel.minPrice <= 1000);
      } else if (filters.priceRange === '1000To2000') {
        filteredHotels = filteredHotels.filter((hotel) => hotel.minPrice > 1000 && hotel.minPrice <= 2000);
      } else if (filters.priceRange === '2000To5000') {
        filteredHotels = filteredHotels.filter((hotel) => hotel.minPrice > 2000 && hotel.minPrice <= 5000);
      } else if (filters.priceRange === 'above5000') {
        filteredHotels = filteredHotels.filter((hotel) => hotel.minPrice > 5000);
      }
    }

    if (filters.rating) {
      filteredHotels = filteredHotels.filter((hotel) => hotel.rating === Number(filters.rating));
    }

    if (filters.city) {
      filteredHotels = filteredHotels.filter((hotel) => hotel.city === filters.city);
    }

    // Apply sorting
    if (sortOption === 'priceAsc') {
      filteredHotels = filteredHotels.sort((a, b) => a.minPrice - b.minPrice);
    } else if (sortOption === 'priceDesc') {
      filteredHotels = filteredHotels.sort((a, b) => b.minPrice - a.minPrice);
    } else if (sortOption === 'rating') {
      filteredHotels = filteredHotels.sort((a, b) => b.rating - a.rating);
    }

    return filteredHotels;
  };

  return (
    <div className="home-page">
      <Header></Header>
      <header className="hero-section">
        <div className="hero-content">
          <h1>Find the Perfect deal, always.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique officia non
            corrupti pariatur aspernatur.
          </p>
          <div className="search-bar">
            <div className="search-input-wrapper">
              <input
                type="text"
                name="hotelNameOrCity"
                placeholder="Type city, place, or hotel name"
                value={searchData.hotelNameOrCity}
                onChange={handleInputChange}
              />
              {filteredSuggestions.length > 0 && (
                <ul className="suggestions-list">
                  {filteredSuggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion.name}, {suggestion.city}
                    </li>
                  ))}
                </ul>
              )}
            </div>
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
              value={searchData.persons}
              onChange={handleInputChange}
              min="1"
              placeholder="2"
            />
            <button onClick={handleSearch}>Search</button>
          </div>
          {error && <p className="error-message">{error}</p>}
        </div>
      
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
      <section className="explore-hotels">
        <h2>Explore Hotels</h2>
        <div className="filters">
          <select name="priceRange" onChange={handleFilterChange}>
            <option value="">Price Range</option>
            <option value="upTo1000">Up to Rs. 1000</option>
            <option value="1000To2000">Rs. 1001 to Rs. 2000</option>
            <option value="2000To5000">Rs. 2001 to Rs. 5000</option>
            <option value="above5000">Above Rs. 5000</option>
          </select>
          <select name="rating" onChange={handleFilterChange}>
            <option value="">Rating</option>
            <option value="1">1 Star</option>
            <option value="2">2 Star</option>
            <option value="3">3 Star</option>
            <option value="4">4 Star</option>
            <option value="5">5 Star</option>
          </select>
          <select name="city" onChange={handleFilterChange}>
            <option value="">City</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Kolkata">Kolkata</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Jaipur">Jaipur</option>
          </select>
          <select name="sortOption" onChange={handleSortChange}>
            <option value="">Sort By</option>
            <option value="priceAsc">Price (Low to High)</option>
            <option value="priceDesc">Price (High to Low)</option>
            <option value="rating">Rating</option>
          </select>
        </div>
        <div className="hotel-list">
          {getFilteredAndSortedHotels().map((hotel) => (
            <div key={hotel.id} className="hotel-card">
              <img src={hotel.image} alt={hotel.name} />
              <h3>{hotel.name}</h3>
              <p>{hotel.city}</p>
              <p>
                ₹{hotel.minPrice} - ₹{hotel.maxPrice}
              </p>
              <button onClick={() => navigate(`/hotel/${hotel.id}`)}>View</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
