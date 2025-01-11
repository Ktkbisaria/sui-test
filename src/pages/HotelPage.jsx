import React, { useEffect, useState } from "react";

const HotelPage = () => {
    const [hotels, setHotels] = useState([]); // Initialize with an empty array
    const [loading, setLoading] = useState(true); // State to track loading status

    // Simulate fetching data
    useEffect(() => {
        const fetchHotels = async () => {
            try {
                // Simulate an API call
                const response = await fetch("https://api.example.com/hotels");
                const data = await response.json();
                setHotels(data); // Set the hotels data
            } catch (error) {
                console.error("Error fetching hotels:", error);
                setHotels([]); // Fallback to an empty array if there's an error
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchHotels();
    }, []);

    // Display a loading message while fetching
    if (loading) {
        return <p>Loading hotels...</p>;
    }

    // Handle empty hotels array
    if (!hotels.length) {
        return <p>No hotels available at the moment.</p>;
    }

    // Render hotels once the data is available
    return (
        <div>
            <h1>Hotel Listings</h1>
            <ul>
                {hotels.map((hotel) => (
                    <li key={hotel.id}>
                        <h2>{hotel.name}</h2>
                        <p>{hotel.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HotelPage;
