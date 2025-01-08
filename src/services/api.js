// api.js
import axios from 'axios';

const BASE_URL = 'https://www.gocomet.com/api/assignment';

export const getHotelNames = async () => {
    const response = await fetch('https://www.gocomet.com/api/assignment/hotels-name');
    const data = await response.json();
    return data;
  };
  
  export const getHotelsList = async (page, size) => {
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
  