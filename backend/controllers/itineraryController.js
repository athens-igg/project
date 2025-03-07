const { getDestinationCoordinates, fetchPlaces } = require("../services/openTripMapService");
const Itinerary = require("../models/Itinerary");
const Trip = require("../models/tripModel");


/**
 * Generate an itinerary based on user preferences
 */
const generateItinerary = async (req, res) => {
    try {
        const { destination, interests, startDate, endDate } = req.body;
        const userId = req.user.id; // Ensure user is authenticated

        // Convert dates to objects and calculate days
        const start = new Date(startDate);
        const end = new Date(endDate);
        const numDays = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));

        console.log(`Trip Duration: ${numDays} days`);

        // Get destination coordinates
        const locationData = await getDestinationCoordinates(destination);
        if (!locationData.lat || !locationData.lon) {
            return res.status(400).json({ message: "Invalid destination or coordinates not found." });
        }
        const { lat, lon } = locationData;

        console.log("Fetching places for:", { lat, lon, interests });

        // Fetch places from OpenTripMap API
        let places = await fetchPlaces(lat, lon, interests);

        if (places.length < numDays * 5) {
            return res.status(404).json({ message: "Not enough places found for a balanced itinerary." });
        }

        console.log(`Total Places Found: ${places.length}`);

        // Distribute places across days (5 per day)
        const itinerary = {};
        for (let i = 0; i < numDays; i++) {
            itinerary[`Day ${i + 1}`] = places.splice(0, 5);
        }

        // **Save itinerary in MongoDB**
        const savedItinerary = new Itinerary({
            user: userId,
            destination,
            startDate,
            endDate,
            days: itinerary,
        });

        await savedItinerary.save();

        res.status(201).json(savedItinerary);
    } catch (error) {
        console.error("Itinerary generation error:", error.message);
        res.status(500).json({ message: "Error generating itinerary." });
    }
};


const getTripItinerary = async (req, res) => {
    try {
        const trip = await Trip.findById(req.params.id);
        if (!trip) {
            return res.status(404).json({ message: "Trip not found" });
        }

        if (!trip.itinerary) {
            return res.status(404).json({ message: "No itinerary found for this trip" });
        }

        res.json(trip.itinerary);
    } catch (error) {
        res.status(500).json({ message: "Error fetching itinerary." });
    }
};
/**
 * Sort places by distance from the first place
 */
function sortPlacesByDistance(places) {
    function getDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Radius of Earth in km
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a = 
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Distance in km
    }

    const base = places[0]; // Reference place
    return places.sort((a, b) => {
        return getDistance(
            base.geometry.coordinates[1], base.geometry.coordinates[0],
            a.geometry.coordinates[1], a.geometry.coordinates[0]
        ) - getDistance(
            base.geometry.coordinates[1], base.geometry.coordinates[0],
            b.geometry.coordinates[1], b.geometry.coordinates[0]
        );
    });
}

/**
 * Function to structure an itinerary into days
 */
const structureItinerary = (places, startDate, numDays) => {
    let itinerary = [];

    // Initialize empty itinerary for each day
    for (let day = 0; day < numDays; day++) {
        itinerary.push({
            day: day + 1,
            date: new Date(new Date(startDate).getTime() + day * 86400000).toISOString().split("T")[0],
            places: [],
        });
    }

    // Distribute places across days
    places.forEach((place, index) => {
        let dayIndex = index % numDays;
        itinerary[dayIndex].places.push({
            name: place.properties.name,
            category: place.properties.kinds.replace(/_/g, " "), // Readable format
            location: place.geometry,
        });
    });

    return itinerary;
};
// ✅ Fetch itineraries for the logged-in user
const getUserItineraries = async (req, res) => {
    try {
        const itineraries = await Trip.find({ user: req.user._id });
        res.json(itineraries);
    } catch (error) {
        console.error("Error fetching itineraries:", error.message);
        res.status(500).json({ message: "Failed to fetch itineraries." });
    }
};


/**
 * Generate AI-like itinerary summary
 */
function generateItinerarySummary(places, numDays) {
    let summary = `Your ${numDays}-day trip includes visits to:\n\n`;
    
    places.forEach((place, index) => {
        summary += `- **${place.properties.name}**: A great spot for ${place.properties.kinds.replace(/_/g, " ")}.\n`;
        
        if ((index + 1) % 4 === 0) {
            summary += `\n---\n\n`; // Separate days
        }
    });

    return summary;
}

module.exports = { generateItinerary, getUserItineraries,getTripItinerary };
