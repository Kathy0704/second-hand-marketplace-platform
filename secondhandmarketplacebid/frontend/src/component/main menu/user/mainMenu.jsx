import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './mainMenu.css';

function MainMenu(props) {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [position, setPosition] = useState(null);

  const fetchPosition = async () => {
    try {
      const username = JSON.parse(localStorage.getItem('userInfo')).username;
      const response = await axios.get(
        `http://localhost:3001/mainmenu/${username}`,
      );

      const userPosition = response.data.position;

      setPosition(userPosition);
      localStorage.setItem('userPosition', userPosition);
    } catch (error) {
      console.error('Failed to fetch user position:', error);
      setPosition(null);
    }
  };

  function handleLogout() {
    const { onLogout } = props;
    onLogout();
    navigate('/');
  }

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('userInfo')));
    fetchPosition();
  }, []);

  return (
    <div>
      <div className="login-box">
        <button className="close-button" onClick={handleLogout}>
          Log out
        </button>
        <img
          src="/georgia-tech-buzz-logo-BFC4D7AB68-seeklogo.com.png"
          alt="logo"
          className="login-image"
        />
        <div className="user-info">
          <h3>
            {user && (
              <p>
                Welcome, {user.first_name} ({user.last_name})
              </p>
            )}
          </h3>
          {position && <p>Position: {position}</p>}
        </div>

        <div className="column-container">
          <div className="column">
            <h2>Auction Option</h2>
            <ul>
              <li>
                <Link to="/search">Search For Item</Link>
              </li>
              <li>
                <Link to="/list">List Item</Link>
              </li>
              <li>
                <Link to="/results">View Auction Results</Link>
              </li>
            </ul>
          </div>
          <div>
            {position && (
              <div className="column">
                <h2>Report</h2>
                <ul>
                  <li>
                    <Link to="/category">Category Report</Link>
                  </li>
                  <li>
                    <Link to="/user">User Report</Link>
                  </li>
                  <li>
                    <Link to="/top-rated">Top Rated Items</Link>
                  </li>
                  <li>
                    <Link to="/statistics">Auction Statistics</Link>
                  </li>
                  <li>
                    <Link to="/cancelled">Cancelled Auction Details</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainMenu;
