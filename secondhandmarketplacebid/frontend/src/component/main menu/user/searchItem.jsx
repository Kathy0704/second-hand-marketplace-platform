import React, { useState } from 'react';
import SearchForm from './searchItemForm';
import { useNavigate } from 'react-router-dom';

function SearchItem() {
  const navigate = useNavigate();
  function handleClose() {
    navigate('/mainMenu');
  }

  return (
    <>
      <div>
        <div className="login-box" style={{ height: '30vh' }}>
          <button class="close-button" onClick={handleClose}>
            X
          </button>
          <img
            src="/georgia-tech-buzz-logo-BFC4D7AB68-seeklogo.com.png"
            alt="logo"
            className="login-image"
          />
          <SearchForm />
        </div>
      </div>
    </>
  );
}
export default SearchItem;
