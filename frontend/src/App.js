import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import Homepage from "./pages/Homepage";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Profile from "./pages/Profile";
import TripPlanner from "./pages/TripPlanner";
import Itinerary from "./pages/Itinerary";
import Feedback from "./pages/Feedback";
import DestinationSearch from "./pages/DestinationSearch";
import Gallery from "./pages/Gallery";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SavedItinerary from "./components/SavedItinerary";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          {" "}
          {/* New wrapper */}
          <Navbar />
          <div className="main-content">
            {" "}
            {/* Ensures content expands */}
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/trip-planner" element={<TripPlanner />} />
              <Route path="/itinerary/:id" element={<Itinerary />} />
              <Route
                path="/destination-search"
                element={<DestinationSearch />}
              />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/saved-itinerary/:id" element={<SavedItinerary />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
