import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useAuth } from "../auth/AuthContext";
import "./Gallery.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Gallery = () => {
    const { user, logout } = useAuth(); //   Get logged-in user
    const [photos, setPhotos] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");
    const [newLocation, setNewLocation] = useState("");
    const [newDate, setNewDate] = useState("");
    const fileInputRef = useRef(null);

    //   Fetch gallery photos
    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const { data } = await axios.get("http://localhost:5000/api/gallery");
                setPhotos(data);
            } catch (error) {
                console.error("Error fetching gallery:", error);
            }
        };
        fetchGallery();
    }, []);

    //   Handle File Upload Preview
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    //   Upload Photo
    const handleAddPhoto = async (e) => {
        e.preventDefault();
        if (!selectedFile || !newLocation || !newDate) {
            alert("Please fill all fields before uploading.");
            return;
        }

        const formData = new FormData();
        formData.append("image", selectedFile);
        formData.append("location", newLocation);
        formData.append("date", newDate);

        try {
            const { data } = await axios.post("http://localhost:5000/api/gallery/upload", formData, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });

            setPhotos([data, ...photos]); //   Add new photo to state
            setIsFormOpen(false);
            setSelectedFile(null);
            setPreviewUrl("");
            setNewLocation("");
            setNewDate("");
        } catch (error) {
            console.error("Upload failed:", error);
        }
    };

    //   Delete Photo
    const handleDelete = async (photoId) => {
        if (!window.confirm("Are you sure you want to delete this photo?")) return;

        try {
            await axios.delete(`http://localhost:5000/api/gallery/${photoId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            setPhotos(photos.filter((photo) => photo._id !== photoId));
        } catch (error) {
            console.error("Delete failed:", error);
        }
    };

    return (
        <>
            {/*   Navbar */}
            <Navbar style={{ backgroundColor: "#D3D3D3" }} expand="lg" className="shadow-sm">
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        <img src="/logo.png" alt="TravelWorld Logo" width="40" height="40" className="d-inline-block align-top me-2" />
                        <span className="travelworld-text">TravelWorld</span>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                            <Nav.Link as={Link} to="/trip-planner">Trip Planner</Nav.Link>
                            <Nav.Link as={Link} to="/gallery">Gallery</Nav.Link>
                            <Nav.Link as={Link} to="/feedback">Feedback</Nav.Link>
                            {user ? (
                                <>
                                    <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                                    <Button variant="outline-danger" onClick={logout} className="ms-2">Logout</Button>
                                </>
                            ) : (
                                <>
                                    <Button as={Link} to="/login" variant="outline-primary" className="ms-2">Login</Button>
                                    <Button as={Link} to="/register" variant="primary" className="ms-2">Register</Button>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/*   Gallery */}
            <div className="gallery-container">
                <h1>✈ Travel Memories</h1>
                <h2 className="animated-subheading">
                    Your journey is unique—share it with the world! 🌍✨ Upload your favorite travel moments and let others experience the magic of your adventures.
                </h2>

                {user && (
                    <button className="add-photo-button" onClick={() => setIsFormOpen(true)}>+</button>
                )}

                {/*   Upload Form */}
                {isFormOpen && (
                    <>
                        <div className="form-overlay" onClick={() => setIsFormOpen(false)} />
                        <div className="add-photo-form">
                            <form onSubmit={handleAddPhoto}>
                                <div className="form-group">
                                    <div className="file-upload-area" onClick={() => fileInputRef.current?.click()}>
                                        {previewUrl ? (
                                            <img src={previewUrl} alt="Preview" className="file-preview" />
                                        ) : (
                                            <div className="upload-placeholder">
                                                <span>Click to upload photo</span>
                                                <span className="upload-icon">📸</span>
                                            </div>
                                        )}
                                        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} style={{ display: "none" }} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Location Name</label>
                                    <input type="text" placeholder="e.g., Sunset in Paris" value={newLocation} onChange={(e) => setNewLocation(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label>Date</label>
                                    <input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} />
                                </div>
                                <div className="form-buttons">
                                    <button type="submit" className="submit-button" disabled={!previewUrl}>Save Memory</button>
                                    <button type="button" className="cancel-button" onClick={() => setIsFormOpen(false)}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </>
                )}

                {/*   Display Gallery */}
                <div className="gallery-grid">
                    {photos.length > 0 ? (
                        photos.map((photo) => (
                            <div key={photo._id} className="gallery-card">
                                <img src={`http://localhost:5000${photo.imageURL}`} alt="Travel" />
                                <p>📍 {photo.location} | 📅 {new Date(photo.date).toLocaleDateString()}</p>
                                <p>Uploaded by: {photo.user?.name || "Unknown"}</p>
                                {user && user._id === photo.user?._id && (
                                    <button className="delete-button" onClick={() => handleDelete(photo._id)}>🗑</button>
                                )}
                            </div>
                        ))
                    ) : (
                        <p>No photos yet. Start uploading!</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default Gallery;
