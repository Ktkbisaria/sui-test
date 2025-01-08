import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import HotelDetails from './components/HotelDetails'; // Import HotelDetails

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hotels/:id" element={<HotelDetails />} /> {/* Define the route */}
      </Routes>
    </Router>
  );
};

export default App;
