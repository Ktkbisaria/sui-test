import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ExploreHotelsPage.css';
import { fetchHotelsList } from '../services/api';

function ExploreHotelsPage() {
  const [hotels, setHotels] = useState([]);
  const [filters, setFilters] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const searchData = location.state?.searchData || {};

  useEffect(() => {
    fetchHotelsList().then((data) => setHotels(data));
  }, []);

  const handleFilterChange = (e) => {
    setFilters(e.target.value);
  };

  const handleViewHotel = (id) => {
    navigate(`/hotel-details/${id}`);
  };

  return (
    <div className="explore-hotels-page">
      <header>
        <h1>Explore Hotels</h1>
        <input
          type="text"
          placeholder="Filter by name or city"
          value={filters}
          onChange={handleFilterChange}
        />
      </header>
      <div className="hotel-list">
        {hotels
          .filter(
            (hotel) =>
              hotel.name.toLowerCase().includes(filters.toLowerCase()) ||
              hotel.city.toLowerCase().includes(filters.toLowerCase())
          )
          .map((hotel) => (
            <div className="hotel-card" key={hotel.id}>
              <h2>{hotel.name}</h2>
              <p>{hotel.city}</p>
              <p>
                Price Range: ₹{Math.min(...hotel.rooms.map((room) => room.price))} - ₹
                {Math.max(...hotel.rooms.map((room) => room.price))}
              </p>
              <button onClick={() => handleViewHotel(hotel.id)}>View</button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ExploreHotelsPage;
