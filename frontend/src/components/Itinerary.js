/*import React from "react";

const Itinerary = ({ itinerary, onSave }) => {
  if (!itinerary || !itinerary.days) return <p>No itinerary available</p>;

  return (
    <div>
      <h2>Trip Itinerary</h2>
      {itinerary.days.map((day, index) => (
        <div key={index}>
          <h3>Day {index + 1}</h3>
          <ul>
            {day.places.map((place, i) => (
              <li key={i}>
                <h4>{place.name}</h4>
                <p>{place.description}</p>
                {place.image && (
                  <img src={place.image} alt={place.name} width="200" />
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
      <button onClick={onSave}>Save Itinerary</button>
    </div>
  );
};

export default Itinerary;*/
// Compare this snippet from backend/controllers/itineraryController.js:
//         if (!locationData.lat || !locationData.lon) {
//             return res.status(400).json({ message: "Invalid destination or coordinates not found." });
