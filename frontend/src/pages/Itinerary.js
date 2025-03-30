import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Itinerary.css"; // Import CSS file

export default function Itinerary() {
  const { id } = useParams(); // Get trip ID from URL
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItinerary = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/trips/${id}/itinerary`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
  
        console.log("Fetched Itinerary:", response.data); // Debugging
  
        setItinerary(response.data);
      } catch (error) {
        console.error("Error fetching itinerary:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchItinerary();
  }, [id]);
  

  if (loading) return <div className="loading">Loading itinerary...</div>;
  if (!itinerary) return <div className="error">No itinerary found.</div>;

  return (
    <div className="itinerary-container">
      <h1>Itinerary for {itinerary.destination}</h1>
      <h3>
        {new Date(itinerary.startDate).toLocaleDateString()} -{" "}
        {new Date(itinerary.endDate).toLocaleDateString()}
      </h3>

      {Object.entries(itinerary.days).map(([day, places]) => (
        <div key={day} className="day-container">
          <h2>{day}</h2>
          <div className="places-list">
            {places.map((place, index) => (
              <div key={index} className="place-card">
                <h3>{place.properties.name || "Unnamed Location"}</h3>
                <p><strong>Category:</strong> {formatCategory(place.properties.kinds)}</p>
                <p><strong>Distance:</strong> {Math.round(place.properties.dist)} meters</p>
                {place.geometry.coordinates && (
                  <a
                    href={`https://www.google.com/maps?q=${place.geometry.coordinates[1]},${place.geometry.coordinates[0]}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="map-link"
                  >
                    View on Map
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// Function to format the "kinds" field from OpenTripMap API
function formatCategory(kinds) {
  if (!kinds) return "Unknown";
  return kinds
    .split(",")
    .map((kind) => kind.replace(/_/g, " ")) // Convert underscores to spaces
    .join(", ");
}
