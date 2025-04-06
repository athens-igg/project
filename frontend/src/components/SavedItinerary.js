import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Card, Button } from "react-bootstrap";

const SavedItinerary = () => {
  const { id } = useParams();
  const [itinerary, setItinerary] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItinerary = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await axios.get(
          `http://localhost:5000/api/itineraries/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setItinerary(res.data);
      } catch (err) {
        console.error("❌ Error loading itinerary:", err);
        setError("Itinerary not found or you don’t have access.");
      }
    };

    fetchItinerary();
  }, [id, navigate]);

  if (error) return <div className="text-center p-4 text-red-600">{error}</div>;
  if (!itinerary) return <div className="text-center p-4">Loading...</div>;

  return (
    <Container className="py-5">
      <Card className="p-4 shadow-sm">
        <h2 className="mb-3">{itinerary.destination}</h2>
        <p>
          <strong>Trip Name:</strong> {itinerary.trip}
        </p>
        <p>
          <strong>From:</strong>{" "}
          {new Date(itinerary.startDate).toLocaleDateString()}
        </p>
        <p>
          <strong>To:</strong>{" "}
          {new Date(itinerary.endDate).toLocaleDateString()}
        </p>
        <p>
          <strong>Total Days:</strong> {itinerary.days?.length}
        </p>

        <Button variant="secondary" onClick={() => navigate(-1)}>
          Back
        </Button>
      </Card>
    </Container>
  );
};

export default SavedItinerary;
/*

// SavedItinerary.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const SavedItinerary = () => {
  const { id } = useParams();
  const [itinerary, setItinerary] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItinerary = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `http://localhost:5000/api/itineraries/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setItinerary(response.data);
      } catch (err) {
        setError("Failed to load itinerary.");
        console.error(err);
      }
    };

    fetchItinerary();
  }, [id]);

  if (error) return <div>{error}</div>;
  if (!itinerary) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">{itinerary.trip}</h2>
      <p className="text-gray-600 mb-2">Destination: {itinerary.destination}</p>
      <p className="text-gray-600 mb-6">
        {itinerary.startDate} to {itinerary.endDate}
      </p>

      <h3 className="text-xl font-semibold mb-3">Day-wise Breakdown:</h3>
      {itinerary.days && itinerary.days.length > 0 ? (
        itinerary.days.map((day, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-4 mb-4 border border-gray-200"
          >
            <h4 className="font-bold">Day {index + 1}</h4>
            <ul className="list-disc list-inside">
              {day.activities?.map((activity, i) => (
                <li key={i}>{activity}</li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>No day-wise activities found.</p>
      )}
    </div>
  );
};

export default SavedItinerary;
*/
