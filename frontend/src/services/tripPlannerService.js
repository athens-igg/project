import axios from "axios";

const API_KEY = "5ae2e3f221c38a28845f05b657803716b89a8415ff74cbe991ffb379";
const BASE_URL = "https://api.opentripmap.com/0.1/en/places";

/**
 * Get the latitude and longitude of a destination
 */
export const getDestinationCoordinates = async (destination) => {
    try {
        const response = await axios.get(`${BASE_URL}/geoname`, {
            params: { name: destination, apikey: API_KEY },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching destination coordinates:", error);
        throw new Error("Failed to get destination coordinates.");
    }
};

/**
 * Fetch places from OpenTripMap API based on user interests
 */
export const fetchPlaces = async (lat, lon, interests, radius = 10000) => {
    try {
        const response = await axios.get(`${BASE_URL}/radius`, {
            params: {
                radius,
                lon,
                lat,
                kinds: interests.map(i => i.toLowerCase()).join(","),
                apikey: API_KEY,
            },
        });

        return response.data.features; // Extract places from response
    } catch (error) {
        console.error("OpenTripMap API Error:", error.response?.data || error.message);
        throw new Error("Error fetching places from OpenTripMap.");
    }
};
