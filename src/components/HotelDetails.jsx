import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ChevronLeft, ChevronRight, Star, MapPin, Users } from "lucide-react";
import './HotelDetails.css'

const HotelDetails = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const response = await fetch(
          `https://www.gocomet.com/api/assignment/hotels/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch hotel details");
        }
        const data = await response.json();
        setHotel(data.hotel);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchHotelDetails();
  }, [id]);

  if (loading)
    return <div className="loading-screen">Loading...</div>;
  if (error)
    return <div className="loading-screen">Error: {error}</div>;

  const RoomCard = ({ room }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const nextImage = (e) => {
      e.stopPropagation();
      setCurrentImageIndex((prev) => (prev + 1) % room.image_urls.length);
    };

    const prevImage = (e) => {
      e.stopPropagation();
      setCurrentImageIndex((prev) => (prev - 1 + room.image_urls.length) % room.image_urls.length);
    };

    return (
      <div className="room-card">
        <div className="image-container">
          <img
            src={room.image_urls[currentImageIndex]}
            alt={room.name}
            className="room-image"
          />
          <div className="image-index">
            {currentImageIndex + 1} / {room.image_urls.length}
          </div>
          <button onClick={prevImage} className="image-nav prev">
            <ChevronLeft />
          </button>
          <button onClick={nextImage} className="image-nav next">
            <ChevronRight />
          </button>
        </div>
        <div className="details">
          <h3>{room.name}</h3>
          <div className="info">
            <Users />
            <span>2</span>
          </div>
          <div className="price">₹ {room.price} / night</div>
          <div className="actions">
            <button className="view-facilities">View facilities</button>
            <button className="book-now">Book Now</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="hotel-details">
      <div className="hero">
        <img src={hotel.image_url} alt={hotel.name} className="hero-image" />
        <div className="hero-overlay">
          <h1>{hotel.name}</h1>
          <div className="info">
            <div>
              <MapPin />
              {hotel.city}, India
            </div>
            <div>
              <Star />
              {hotel.rating}
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="room-cards">
          {hotel.rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>

        <div className="about">
          <h2>About {hotel.name}</h2>
          <p>{hotel.description}</p>
        </div>
      </div>
    </div>
  );
};

export default HotelDetails;
