import React, { useState } from 'react';
import '../styling/Loginform.css';

const LoginForm = () => {
    // State to hold all form field values
    const [formData, setFormData] = useState({
      fname: '',
      lname: '',
      email: '',
      phone: '',
      username: '',
      location: '',
    });
  
    // Function to reverse geocode lat/lng to a city name using OpenStreetMap
    const getCityFromCoordinates = async (lat: number, lon: number) => {
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
        const data = await response.json();
        return data.address.city || data.address.town || data.address.village || 'Unknown location';
      } catch (error) {
        return 'Location fetch failed';
      }
    };
  
    // Handle input changes for standard fields
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    // Ask for geolocation permission and set city in the location field
    const handleLocationFocus = () => {
      if (!navigator.geolocation) {
        alert('Geolocation is not supported by your browser.');
        return;
      }
  
      // Get current position from browser
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const city = await getCityFromCoordinates(latitude, longitude);
          setFormData((prevData) => ({ ...prevData, location: city }));
        },
        () => {
          alert('Permission denied or location unavailable.');
        }
      );
    };
  
    // Handle form submit
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log('Form Data:', formData);
    };
  
    return (
      <div className="login-form-container p-4 rounded shadow">
        <h2 className="text-center mb-4">Login / Register</h2>
        <form onSubmit={handleSubmit}>
          {/* First & Last Name */}
          <div className="row mb-3">
            <div className="col">
              <input type="text" className="form-control" name="fname" placeholder="First Name" onChange={handleChange} required />
            </div>
            <div className="col">
              <input type="text" className="form-control" name="lname" placeholder="Last Name" onChange={handleChange} required />
            </div>
          </div>
  
          {/* Email */}
          <div className="mb-3">
            <input type="email" className="form-control" name="email" placeholder="Email" onChange={handleChange} required />
          </div>
  
          {/* Phone */}
          <div className="mb-3">
            <input type="tel" className="form-control" name="phone" placeholder="Phone Number" onChange={handleChange} required />
          </div>
  
          {/* Username */}
          <div className="mb-3">
            <input type="text" className="form-control" name="username" placeholder="Username" onChange={handleChange} required />
          </div>
  
          {/* Location (auto fetch via focus) */}
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              name="location"
              placeholder="Click to detect location"
              value={formData.location}
              onFocus={handleLocationFocus} // fetches location when user clicks
              readOnly
              required
            />
          </div>
  
          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-100">Submit</button>
        </form>
      </div>
    );
  };
  


export default LoginForm;
