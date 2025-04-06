import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminDashboard.css";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userInfo"));
    const storedToken = localStorage.getItem("token");

    console.log("Checking admin access:");
    console.log("User:", storedUser);
    console.log("Token:", storedToken);

    if (!storedToken || !storedUser || !storedUser.isAdmin) {
      console.log("Redirecting to /unauthorized");
      navigate("/unauthorized");
    } else {
      console.log("Access granted");
      setUserInfo(storedUser);
      setToken(storedToken);
      setLoading(false);
    }
  }, [navigate]);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    if (!loading) {
      fetchUsers();
      fetchGallery();
      fetchFeedbacks();
    }
    // eslint-disable-next-line
  }, [loading]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/users", config);
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users", err);
    }
  };

  const fetchGallery = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/gallery", config);
      setGallery(res.data);
    } catch (err) {
      console.error("Error fetching gallery", err);
    }
  };

  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/feedbacks", config);
      setFeedbacks(res.data);
    } catch (err) {
      console.error("Error fetching feedbacks", err);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/users/${id}`, config);
      fetchUsers();
    } catch (err) {
      console.error("Error deleting user", err);
    }
  };

  const deleteGallery = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/gallery/${id}`, config);
      fetchGallery();
    } catch (err) {
      console.error("Error deleting gallery item", err);
    }
  };

  const deleteFeedback = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/feedbacks/${id}`, config);
      fetchFeedbacks();
    } catch (err) {
      console.error("Error deleting feedback", err);
    }
  };

  if (loading) return <div>Loading Admin Dashboard...</div>;

  return (
    <div className="admin-dashboard">
      <h1>👩‍💻 Admin Dashboard</h1>
      {userInfo && (
        <p className="welcome-msg">Welcome, {userInfo.name || userInfo.email}! 👋</p>
      )}

      {/* Users Section */}
      <section>
        <h2>Users</h2>
        <table>
          <thead>
            <tr>
              <th>Email</th>
              <th>Name</th>
              <th>Role</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>{u.email}</td>
                <td>{u.name}</td>
                <td>{u.role}</td>
                <td>
                  <button onClick={() => deleteUser(u._id)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Gallery Section */}
<section>
  <h2>Gallery</h2>
  <div className="gallery">
    {gallery.map((item) => (
      <div key={item._id} className="gallery-item">
        <img src={item.imageUrl} alt="gallery" />
        <p><strong>Uploaded by:</strong> {item.user?.name || 'Unknown User'}</p>
        <button onClick={() => deleteGallery(item._id)}>🗑️</button>
      </div>
    ))}
  </div>
</section>


      {/* Feedback Section */}
      <section>
  <h2>Feedbacks</h2>
  <table>
    <thead>
      <tr>
        <th>User</th>
        <th>Rating</th>
        <th>Comment</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      {feedbacks.map((f) => (
        <tr key={f._id}>
          <td>{f.name}</td>
          <td>{f.rating}</td>
          <td>{f.comment}</td>
          <td>
            <button onClick={() => deleteFeedback(f._id)}>🗑️</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</section>
    </div>
  );
};

export default AdminDashboard;
