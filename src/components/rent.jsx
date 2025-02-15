import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./rent.css"; // Ensure styles are defined in your CSS file

const CarRent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    carType: "sedan",
    rentStartDate: "",
    rentEndDate: "",
    pickupLocation: "",
    returnLocation: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/rent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Car rental request submitted successfully!");
        navigate('/');
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="car-rent-container">
      <h2>Car Rental Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Mobile No:
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Car Type:
          <select
            name="carType"
            value={formData.carType}
            onChange={handleChange}
          >
            <option value="sedan">Sedan</option>
            <option value="suv">SUV</option>
          </select>
        </label>
        <label>
          Rent Start Date:
          <input
            type="date"
            name="rentStartDate"
            value={formData.rentStartDate}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Rent End Date:
          <input
            type="date"
            name="rentEndDate"
            value={formData.rentEndDate}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Pickup Location:
          <input
            type="text"
            name="pickupLocation"
            value={formData.pickupLocation}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          return Location:
          <input
            type="text"
            name="returnLocation"
            value={formData.returnLocation}
            onChange={handleChange}
            required
          />
        </label>
        <div className="buttons">
          <button type="button" className="back-btn" onClick={() => navigate(-1)}>
            Back
          </button>
          <button type="submit" className="submit-btn">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default CarRent;
