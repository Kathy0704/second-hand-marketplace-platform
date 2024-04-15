import React, { useState } from 'react';
import AuctionForm from './AuctionForm';
import { useNavigate } from 'react-router-dom';

function ListItem(props) {
  const navigate = useNavigate();
  function handleClose() {
    navigate('/mainMenu');
  }

  return (
    <>
      <div>
        <div className="login-box" style={{ height: '50vh' }}>
          <img
            src="/georgia-tech-buzz-logo-BFC4D7AB68-seeklogo.com.png"
            alt="logo"
            className="login-image"
          />
          <button className="close-button" onClick={handleClose}>
            X
          </button>
          <AuctionForm props={props} />
        </div>
      </div>
    </>
  );
}
export default ListItem;
