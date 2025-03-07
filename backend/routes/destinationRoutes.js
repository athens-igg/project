const express = require('express');
const axios = require('axios');
const router = express.Router();

// Function to get latitude & longitude of a place using OpenTripMap's Geoname API
async function getCoordinates(query, apiKey) {
  const geoUrl = `https://api.opentripmap.com/0.1/en/places/geoname?name=${query}&apikey=${apiKey}`;
  console.log("🌍 Fetching coordinates from:", geoUrl);

  try {
    const response = await axios.get(geoUrl);
    if (!response.data || !response.data.lat || !response.data.lon) {
      throw new Error("Invalid response for coordinates");
    }
    return { lat: response.data.lat, lon: response.data.lon };
  } catch (error) {
    console.error("❌ Error fetching coordinates:", error.response?.data || error.message);
    throw new Error("Failed to get location coordinates");
  }
}

// @desc    Search for destinations
// @route   GET /api/destinations/search
// @access  Public
router.get('/search', async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ message: 'Query parameter is required' });
  }

  try {
    const apiKey = process.env.OPENTRIPMAP_API_KEY;
    if (!apiKey) {
      console.error("❌ API key is missing!");
      return res.status(500).json({ message: "Server configuration error: API key is missing" });
    }

    // Step 1: Get lat & lon for the place
    const { lat, lon } = await getCoordinates(query, apiKey);
    console.log(`📍 Found location: ${query} (Lat: ${lat}, Lon: ${lon})`);

    // Step 2: Fetch places using lat & lon
    const apiUrl = `https://api.opentripmap.com/0.1/en/places/radius?radius=5000&lon=${lon}&lat=${lat}&limit=10&apikey=${apiKey}`;
    console.log("🔍 Fetching places from:", apiUrl);

    const response = await axios.get(apiUrl);

    if (!response.data || !response.data.features) {
      return res.status(500).json({ message: "Invalid response from OpenTripMap API" });
    }

    // Extract relevant details
    const destinations = response.data.features.map((feature) => ({
      name: feature.properties.name || "Unknown",
      latitude: feature.geometry.coordinates[1],
      longitude: feature.geometry.coordinates[0],
      category: feature.properties.kinds ? feature.properties.kinds.split(',')[0] : "N/A",
      rating: feature.properties.rate || "N/A",
      xid: feature.properties.xid // Useful for detailed place info later
    }));

    res.json(destinations);
  } catch (error) {
    console.error("❌ Error fetching data:", error.response?.data || error.message);
    res.status(500).json({
      message: "Failed to fetch data from OpenTripMap API",
      error: error.response?.data || error.message
    });
  }
});

module.exports = router;
