import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BidHistory from './bidHistory';
import './itemResult.css';

function ItemResult() {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [bidHistory, setBidHistory] = useState([]);
  const [auctionEndTime, setAuctionEndTime] = useState(null);
  const [curuser, setCurUser] = useState(() => {
    const localUserData = localStorage.getItem('userInfo');

    const userData = localUserData ? JSON.parse(localUserData) : null;

    return userData ? userData.username : null;
  }); // who want to buy this item

  useEffect(() => {
    const fetchItemAndBids = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/items/itemresult/${itemId}`,
        );

        console.log(response.data);

        setItem(response.data.firstResult);
        setBidHistory(response.data.allResult);

        const finalBid = response.data.firstResult;
        if (finalBid.amount == 'CANCELED') {
          setAuctionEndTime(finalBid.datetime);
        } else {
          if (
            finalBid.get_it_now != null &&
            finalBid.amount != null &&
            Number(finalBid.amount.slice(1)) >= Number(finalBid.get_it_now)
          ) {
            setAuctionEndTime(finalBid.datetime);
          } else {
            setAuctionEndTime(finalBid.auction_end_time);
          }
        }
      } catch (error) {
        console.error('Error fetching item and bids:', error);
      }
    };

    fetchItemAndBids();
  }, [itemId]);

  function handleClose() {
    navigate('/mainMenu');
  }

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <div className="login-box" style={{ width: '30vw' }}>
      <div className="item-details">
        <p>
          Item ID: {item.itemid}{' '}
          <Link
            to={{
              pathname: `/items/${item.itemid}/rate`,
              state: { winner: item.winner },
            }}
          >
            View Ratings
          </Link>
        </p>
        <p>Item Name: {item.name}</p>
        <p>Description:{item.description}</p>
        <p>Category: {item.category_name}</p>
        <p>Condition: {item.condition}</p>
        <p>
          <label>
            Returns Accepted:
            <input type="checkbox" checked={item.returnable} readOnly />
          </label>
        </p>
        <p>Auction Ended: {new Date(auctionEndTime).toLocaleString()} </p>
        <BidHistory auctionEnded={true} bidData={bidHistory} />

        <div className="buttons-container">
          <button onClick={handleClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default ItemResult;
