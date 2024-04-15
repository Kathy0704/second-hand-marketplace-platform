import React from 'react';
import { useState, useEffect } from 'react';
import './bidHistory.css';

function BidHistory({ auctionEnded, bidData }) {
  const [rowColor, setRowColor] = useState('white');

  useEffect(() => {
    if (auctionEnded) {
      const finalBid = bidData[0];
      if (finalBid.amount === 'CANCELED') {
        setRowColor('red');
      } else {
        if (
          finalBid.amount != null &&
          Number(finalBid.amount.slice(1)) >= Number(finalBid.min_sale)
        ) {
          setRowColor('green');
        } else {
          setRowColor('yellow');
        }
      }
    }
  });

  if (
    !Array.isArray(bidData) ||
    bidData[0].amount == null ||
    bidData[0].amount == '$'
  ) {
    return <p>No bid history available.</p>;
  }

  if (!auctionEnded) {
    return (
      <div>
        <p>Latest Bids:</p>
        <table>
          <thead>
            <tr>
              <th>Bid Amount</th>
              <th>Time of Bid</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            {bidData.map((bid, index) => (
              <tr key={index}>
                <td>${parseFloat(bid.amount).toFixed(2)}</td>
                <td>{new Date(bid.datetime).toLocaleString()}</td>
                <td>{bid.username}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (auctionEnded) {
    if (rowColor === 'white') {
      return <div>loading</div>;
    }

    return (
      <div>
        <p>Bid History:</p>
        <table>
          <thead>
            <tr>
              <th>Bid Amount</th>
              <th>Time of Bid</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            {bidData.map((bid, index) => (
              <tr id={index} className={`row${index} ${rowColor}`}>
                <td>{bid.amount}</td>
                <td>{new Date(bid.datetime).toLocaleString()}</td>
                <td>{bid.bidder}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default BidHistory;
