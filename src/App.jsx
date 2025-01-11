import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import HotelDetails from './components/HotelDetails';
//import HotelPage from './pages/HotelPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hotels/:id" element={<HotelDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
