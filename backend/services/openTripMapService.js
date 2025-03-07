const axios = require("axios");

const API_KEY = "5ae2e3f221c38a28845f05b657803716b89a8415ff74cbe991ffb379";
const BASE_URL = "https://api.opentripmap.com/0.1/en/places";

/**
 * Get the latitude and longitude of a destination
 */
const getDestinationCoordinates = async (destination) => {
    try {
        const response = await axios.get(`${BASE_URL}/geoname`, {
            params: { name: destination, apikey: API_KEY },
        });
        return response.data;
    } catch (error) {
        throw new Error("Error fetching destination coordinates.");
    }
};

/**
 * Fetch places from OpenTripMap API based on user interests
 */
const fetchPlaces = async (lat, lon, interests, radius = 10000) => {
    try {
        const apiUrl = `${BASE_URL}/radius`;
        const params = {
            radius,
            lon,
            lat,
            kinds: interests.join(","), // Convert array to comma-separated string
            apikey: API_KEY,
        };

        console.log("Fetching places from:", apiUrl);
        console.log("With parameters:", params);

        const response = await axios.get(apiUrl, { params });

        return response.data.features; // Extract places from response
    } catch (error) {
        console.error("OpenTripMap API Error:", error.response?.data || error.message);
        throw new Error("Error fetching places from OpenTripMap.");
    }
};


module.exports = { getDestinationCoordinates, fetchPlaces };
