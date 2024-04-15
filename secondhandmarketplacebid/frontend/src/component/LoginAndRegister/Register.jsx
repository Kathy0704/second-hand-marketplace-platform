import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import axios from 'axios';

function Register() {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const requestData = {
      username: username,
      firstName: firstName,
      lastName: lastName,
      password: password,
    };

    axios
      .post('http://localhost:3001/register', requestData)
      .then((response) => {
        console.log(response.data);
        alert('registration success! please log in');
        navigate('/');
      })
      .catch((error) => {
        console.error('Error registering:', error);
        alert('registration failed, username alrady exisits');
      });
  }
  function handleCancel() {
    navigate('/');
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <img
          src="/georgia-tech-buzz-logo-BFC4D7AB68-seeklogo.com.png"
          alt="Your Image"
          className="login-image"
        />

        <form className="register" onSubmit={handleSubmit}>
          <div className="input-group">
            <div className="input-row">
              <label htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                className="input-field"
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                required
              />
            </div>

            <div className="input-row">
              <label htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                className="input-field"
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                required
              />
            </div>

            <div className="input-row">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                className="input-field"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
              />
            </div>

            <div className="input-row">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                className="input-field"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>

            <div className="input-row">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                className="input-field"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                required
              />
            </div>
          </div>
          <div className="button-group">
            <button
              className="long-button"
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button className="long-button" type="submit">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
