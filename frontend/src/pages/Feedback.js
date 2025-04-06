import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './FeedbackPage.css'; 
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext"; 
import "bootstrap/dist/css/bootstrap.min.css";

const FeedbackPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [submittedReviews, setSubmittedReviews] = useState([]);

  const handleLogout = () => {
    logout();       // Clear user session
    navigate("/");  // Redirect to homepage
  };

  // Fetch existing feedback from backend
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/feedback");
        setSubmittedReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, []);

  const handleRatingChange = (value) => setRating(value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating || !review.trim()) {
      alert("Please provide a rating and a review.");
      return;
    }
  
    try {
      //   Retrieve the token from localStorage
      const token = localStorage.getItem("token");
  
      if (!token) {
        alert("You must be logged in to submit feedback.");
        return;
      }
  
      const newReview = {
        rating,
        comment: review,
      };
  
      const { data } = await axios.post("http://localhost:5000/api/feedback", newReview, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }, //   Correctly send token
      });
  
      setSubmittedReviews([...submittedReviews, data]);
      setRating(0);
      setReview('');
    } catch (error) {
      console.error("Error submitting feedback:", error.response?.data?.message || error.message);
      alert(error.response?.data?.message || "Failed to submit feedback");
    }
  };
  
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this feedback?")) return;

    try {
        await axios.delete(`http://localhost:5000/api/feedback/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        setSubmittedReviews(submittedReviews.filter((review) => review._id !== id));
    } catch (error) {
        console.error("Error deleting feedback", error);
    }
};

  return (
    <>
      {/* Navbar */}
      <Navbar style={{ backgroundColor: "#e9ecef" }} expand="lg" className="shadow-sm py-2">
      
        <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
        <img
          src="/logo.png"
          alt="TravelWorld Logo"
          width="50"
          height="50"
          className="d-inline-block align-top me-2"
        />
        <span className="fs-2 fw-bold">TravelWorld</span>
      </Navbar.Brand>
      
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto align-items-center">
              <Nav.Link as={Link} to="/" className="fs-5">Home</Nav.Link>
              <Nav.Link as={Link} to="/trip-planner" className="fs-5">Trip Planner</Nav.Link>
              <Nav.Link as={Link} to="/gallery" className="fs-5">Gallery</Nav.Link>
              <Nav.Link as={Link} to="/feedback" className="fs-5">Feedback</Nav.Link>
              {user ? (
                <>
                  <Nav.Link as={Link} to="/profile" className="fs-5">Profile</Nav.Link>
                  <Button
                    variant="outline-danger"
                    onClick={handleLogout}
                    className="ms-2 fs-6 fw-semibold"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    as={Link}
                    to="/login"
                    variant="outline-primary"
                    className="ms-2 fs-6 fw-semibold"
                  >
                    Login
                  </Button>
                  <Button
                    as={Link}
                    to="/register"
                    variant="primary"
                    className="ms-2 fs-6 fw-semibold"
                  >
                    Register
                  </Button>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="feedback-page">
        <h1>Share Your Experience</h1>
        <p className="subtitle">We value your feedback! Please rate your experience and leave a review.</p>

        {/* Rating Section */}
        <div className="rating-section">
          <h3>Your Rating:</h3>
          <div className="star-rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} className={`star ${star <= rating ? 'filled' : ''}`} onClick={() => handleRatingChange(star)}>
                ★
              </span>
            ))}
          </div>
        </div>

        {/* Review Form (Only for logged-in users) */}
        {user ? (
          <form onSubmit={handleSubmit} className="review-form">
            <h3>Your Review:</h3>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Write your review here..."
              rows="5"
            ></textarea>
            <button type="submit">Submit Review</button>
          </form>
        ) : (
          <p className="text-center">Please <Link to="/login">log in</Link> to submit a review.</p>
        )}

        {/* Submitted Reviews */}
        <div className="submitted-reviews">
                    <h2>Recent Reviews</h2>
                    {submittedReviews.length > 0 ? (
                        submittedReviews.map((item, index) => (
                            <div key={index} className="review-box">
                                <div className="review-header">
                                    <span className="review-name"><strong>{item.name}</strong></span>
                                    <span className="review-rating">
                                        {Array(item.rating).fill('★').join('')}
                                    </span>
                                </div>
                                <p className="review-text">{item.comment}</p>
                                <p className="review-date">{new Date(item.createdAt).toLocaleDateString()}</p>
                              {/*   Show delete button only for the logged-in user's feedback */}
        {user && user._id === item.user && (
            <button onClick={() => handleDelete(item._id)} className="btn btn-danger btn-sm">
                Delete
            </button>
        )}
                            </div>
                        ))
                    ) : (
                        <p>No reviews yet. Be the first to share your experience!</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default FeedbackPage;