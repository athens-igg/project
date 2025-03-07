import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Profile from "./pages/Profile";
import TripPlanner from "./pages/TripPlanner";
import Itinerary from "./pages/Itinerary";
import Feedback from "./pages/Feedback";
import DestinationSearch from "./pages/DestinationSearch";
import Gallery from "./pages/Gallery";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/trip-planner" element={<TripPlanner />} />
        <Route path="/itinerary/:id" element={<Itinerary />} />
        <Route path="/destination-search" element={<DestinationSearch />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </Router>
  );
}

export default App;
