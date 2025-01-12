import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import Header from './Header';
import bgimg from '../assets/bgimg.png'
import mdi_people from '../assets/mdi_people.png';

function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const hotelsPerPage = 10;

  const [searchData, setSearchData] = useState({
    selectedHotel: null,
    checkInDate: '',
    checkOutDate: '',
    persons: 1,
  });
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [filters, setFilters] = useState({
    rating: [],
    priceRange: [],
    city: [],
  });
  const [error, setError] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const navigate = useNavigate();

  // Fetch hotels for explore section
  const fetchHotels = async () => {
    try {
      const response = await fetch('https://www.gocomet.com/api/assignment/hotels?page=1&size=30');
      const data = await response.json();
      const hotelsWithPrices = data.hotels.map(hotel => ({
        ...hotel,
        minPrice: Math.min(...hotel.rooms.map(room => room.price)),
        maxPrice: Math.max(...hotel.rooms.map(room => room.price))
      }));
      setHotels(hotelsWithPrices);
      setFilteredHotels(hotelsWithPrices);
    } catch (err) {
      console.error('Error fetching hotels:', err);
    }
  };

  const indexOfLastHotel = currentPage * hotelsPerPage;
  const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage;

  const currentHotels = filteredHotels.slice(indexOfFirstHotel, indexOfLastHotel);

  // Function to handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredHotels.length / hotelsPerPage);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await fetch(
          `https://www.gocomet.com/api/assignment/hotels?page=${currentPage}&size=${hotelsPerPage}`
        );
        const data = await response.json();

        // Assuming the API returns an array of hotels with image_url
        if (data && data.hotels) {
          setHotels(data.hotels);
        }
      } catch (error) {
        console.error('Error fetching hotels:', error);
      }
    };

    fetchHotels();
  }, [currentPage]);

  // Handle page change
  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Fetch hotel names for search
  const fetchHotelNames = async (query) => {
    try {
      const response = await fetch('https://www.gocomet.com/api/assignment/hotels-name');
      const data = await response.json();
      const filtered = data.filter(hotel => 
        hotel.name.toLowerCase().includes(query.toLowerCase()) ||
        hotel.city.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
    } catch (err) {
      console.error('Error fetching hotel names:', err);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  useEffect(() => {
    if (searchQuery.length > 2) {
      fetchHotelNames(searchQuery);
      setShowSearchResults(true);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  }, [searchQuery]);

  const handleSearchSelect = (hotel) => {
    setSearchData(prev => ({ ...prev, selectedHotel: hotel }));
    setSearchQuery(hotel.name);
    setShowSearchResults(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'hotelSearch') {
      setSearchQuery(value);
      if (!value) {
        setSearchData(prev => ({ ...prev, selectedHotel: null }));
      }
    } else {
      setSearchData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSearch = () => {
    const { selectedHotel, checkInDate, checkOutDate, persons } = searchData;
    if (!selectedHotel || !checkInDate || !checkOutDate || persons < 1) {
      setError('All fields are mandatory!');
      return;
    }
    setError('');
    navigate('/explore-hotels', { state: { searchData } });
  };

  const applyFilters = () => {
    let filtered = [...hotels];

    if (filters.rating.length > 0) {
      filtered = filtered.filter(hotel => 
        filters.rating.some(rating => hotel.rating >= rating && hotel.rating < Number(rating) + 1)
      );
    }

    if (filters.priceRange.length > 0) {
      filtered = filtered.filter(hotel => 
        filters.priceRange.some(range => {
          const [min, max] = range.split('-').map(Number);
          return hotel.minPrice >= min && hotel.maxPrice <= (max || Infinity);
        })
      );
    }

    if (filters.city.length > 0) {
      filtered = filtered.filter(hotel => 
        filters.city.includes(hotel.city)
      );
    }

    setFilteredHotels(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [filters]);

  const handleFilterChange = (e, category) => {
    const { value, checked } = e.target;
    setFilters(prev => ({
      ...prev,
      [category]: checked
        ? [...prev[category], value]
        : prev[category].filter(item => item !== value)
    }));
  };

  

  return (
    <div className="home-page">
      <Header></Header>
      <div className="bgimg-container"></div>
      <header className="hero-section">
        <h1>Find Your Perfect deal, always</h1>
        <br></br>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique officia non corrupti pariatur aspernatur sint modi commodi cum possimus blanditiis facilis beatae repellendus, autem voluptates ratione delectus architecto quae dolore.</p>
        <br></br>
        <br></br>
        <br></br>
        <div className="search-bar">
          <div className="search-input-container">
            <input className = "hotelName"
              type="text"
              name="hotelSearch"
              placeholder="Enter hotel name or city"
              value={searchQuery}
              onChange={handleInputChange}
              autoComplete="off"
            />
            {showSearchResults && searchResults.length > 0 && (
              <div className="search-results">
                {searchResults.map((hotel, index) => (
                  <div
                    key={index}
                    className="search-result-item"
                    onClick={() => handleSearchSelect(hotel)}
                  >
                    {hotel.name} - {hotel.city}
                  </div>
                ))}
              </div>
            )}
          </div>
    <input
    type="date"
    name="checkInDate"
    value={searchData.checkInDate}
    onChange={handleInputChange}
    min={new Date().toISOString().split('T')[0]}
  />
  <span class="divider"></span>
  <input
    type="date"
    name="checkOutDate"
    value={searchData.checkOutDate}
    onChange={handleInputChange}
    min={searchData.checkInDate || new Date().toISOString().split('T')[0]}
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

      <div className="main-content">
        <aside className="filters">
          <h3>Filters</h3>
          <div className="filter-category">
            <h4>Price Range</h4>
            {[
              { value: '0-1000', label: 'Up to Rs. 1000' },
              { value: '1001-2000', label: 'Rs. 1001 - Rs. 2000' },
              { value: '2001-5000', label: 'Rs. 2001 - Rs. 5000' },
              { value: '5001-', label: 'Above Rs. 5000' }
            ].map(({ value, label }) => (
              <label key={value}>
                <input
                  type="checkbox"
                  value={value}
                  onChange={(e) => handleFilterChange(e, 'priceRange')}
                  checked={filters.priceRange.includes(value)}
                />
                {label}
              </label>
            ))}
          </div>
          <div className="filter-category">
            <h4>Rating</h4>
            {[
              { value: '1', label: '0 - 1 Star' },
              { value: '2', label: '1 - 2 Star' },
              { value: '3', label: '2 - 3 Star' },
              { value: '4', label: '4 - 5 Star' }
            ].map(({ value, label }) => (
              <label key={value}>
                <input
                  type="checkbox"
                  value={value}
                  onChange={(e) => handleFilterChange(e, 'rating')}
                  checked={filters.rating.includes(value)}
                />
                {label}
              </label>
            ))}
          </div>
          <div className="filter-category">
            <h4>City</h4>
            {['Mumbai', 'Delhi', 'Kolkata', 'Bangalore'].map(city => (
              <label key={city}>
                <input
                  type="checkbox"
                  value={city}
                  onChange={(e) => handleFilterChange(e, 'city')}
                  checked={filters.city.includes(city)}
                />
                {city}
              </label>
            ))}
          </div>
        </aside>

        {/* <section className="explore-hotels">
          <h2>Explore Hotels</h2>
          <div className="hotels-grid">
            {filteredHotels.map((hotel) => (
              <div key={hotel.id} className="hotel-card">
                <img src={hotel.imageUrl} alt={hotel.name} />
                <div className="hotel-details">
                  <h3>{hotel.name}</h3>
                  <p>{hotel.city}</p>
                  <p>₹{hotel.minPrice} - ₹{hotel.maxPrice}</p>
                  <button onClick={() => navigate(`/hotels/${hotel.id}`)}>
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section> */}

<section className="explore-hotels">
      <h2>Explore Hotels</h2>
      <div className="hotels-grid">
  {currentHotels.map((hotel) => (
    <div key={hotel.id} className="hotel-card">
      <img src={hotel.image_url} alt={hotel.name} />
      <div className="hotel-details">
        <h3>{hotel.name}</h3>
        <p>{hotel.city}</p>
        <div className="price-and-button">
          <p>₹{hotel.minPrice} - ₹{hotel.maxPrice}</p>
          <button onClick={() => navigate(`/hotels/${hotel.id}`)}>View</button>
        </div>
      </div>
    </div>
  ))}
</div>

      
      {/* Pagination controls */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={index + 1 === currentPage ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </section>

      </div>
    </div>
  );
}

export default HomePage;