// api.js
import axios from 'axios';

const BASE_URL = 'https://www.gocomet.com/api/assignment';

// api.js
export const fetchHotelNames = async () => {
    const response = await fetch('https://www.gocomet.com/api/assignment/hotels-name');
    if (!response.ok) throw new Error('Failed to fetch hotel names');
    return response.json();
  };
  

  
  export const fetchHotelsList = async (page, size) => {
    const response = await fetch(`https://www.gocomet.com/api/assignment/hotels?page=${page}&size=${size}`);
    const data = await response.json();
    return data;
  };
  
  export const getHotelDetails = async (hotelId) => {
    const response = await fetch(`https://www.gocomet.com/api/assignment/hotels/${hotelId}`);
    const data = await response.json();
    return data;
  };
// src/services/api.js
export const fetchHotelsByName = async () => {
    const response = await fetch('https://www.gocomet.com/api/assignment/hotels-name');
    return response.json();
  };
  