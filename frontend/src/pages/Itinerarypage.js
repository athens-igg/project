/*import { useState } from "react";
import Itinerary from "../components/Itinerary";

const ItineraryPage = () => {
  const [itinerary, setItinerary] = useState(null);

  const fetchItinerary = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/itinerary"); // Your API endpoint
      const data = await response.json();
      setItinerary(data);
    } catch (error) {
      console.error("Error fetching itinerary:", error);
    }
  };

  const saveItinerary = async () => {
    const res = await fetch("http://localhost:5000/api/save-itinerary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itinerary }),
    });
    const result = await res.json();
    alert(result.message);
  };

  return (
    <div>
      <button onClick={fetchItinerary}>Get Itinerary</button>
      {itinerary && <Itinerary itinerary={itinerary} onSave={saveItinerary} />}
    </div>
  );
};

export default ItineraryPage;
*/
