import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  function handleRegisterClick() {
    navigate('/register');
  }

  const onLoginSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem('userInfo', JSON.stringify(userData));
  };

  function handleSubmit(event) {
    event.preventDefault();

    axios
      .post('http://localhost:3001/login', { username, password })
      .then((response) => {
        onLoginSuccess(response.data.user);
        navigate('/mainMenu');
      })
      .catch((error) => {
        if (error.response) {
          console.error('Server returned status code:', error.response.status);
          alert(error.response.data.message);
        } else if (error.request) {
          console.error('No response received:', error.request);
        } else {
          console.error('An error occurred:', error.message);
        }
      });
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <img
          src="/georgia-tech-buzz-logo-BFC4D7AB68-seeklogo.com.png"
          alt="Your Image"
          className="login-image"
        />

        <form className="login" onSubmit={handleSubmit}>
          <div className="input-group">
            <div className="input-row">
              <label htmlFor="username">UserName</label>
              <input
                id="username"
                className="username"
                onChange={(event) => setUsername(event.target.value)}
                type="text"
                placeholder="Username"
                value={username}
                required
              />
            </div>
            <div className="input-row">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Password"
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>
          </div>
          <div className="button-group">
            <button className="long-button" onClick={handleRegisterClick}>
              Register
            </button>
            <button className="long-button" type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
