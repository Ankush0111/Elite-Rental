import React, { useEffect, useState } from "react";
import "./Profile.css";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/profile", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch user data.");
        }

        const data = await response.json();
        setUserData(data);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="profile-container">
      <h1>Welcome, {userData.username}</h1>
      <div className="profile-card">
        <div className="profile-detail">
          <strong>Email:</strong> {userData.email}
        </div>
        <h2>All Booking Details</h2>
        <table className="booking-table">
        <thead>
          <tr>
            <th>Car Type</th>
            <th>Booking Start Date</th>
            <th>Return Date</th>
            <th>Pickup Location</th>
            <th>Drop Location</th>
          </tr>
        </thead>
        <tbody>
          {userData.bookings.map((booking, index) => (
            <tr key={index}>
              <td>{booking.carType}</td>
              <td>{new Date(booking.rentStartDate).toLocaleDateString()}</td>
              <td>{new Date(booking.rentEndDate).toLocaleDateString()}</td>
              <td>{booking.pickupLocation}</td>
              <td>{booking.returnLocation}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default Profile;
