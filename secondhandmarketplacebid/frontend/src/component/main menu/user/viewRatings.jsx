import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import StarRating from './StarRating';
import RatingForm from './RatingFrom';

function ViewRatings(props) {
  const { itemId } = useParams();
  const [itemDetails, setItemDetails] = useState(null);
  const [rateData, setRateData] = useState([]);
  const [userRating, setUserRating] = useState(0);
  const [comment, setComment] = useState('');
  const [winner, setWinner] = useState(null);
  const [hasUserRated, setHasUserRated] = useState(undefined);
  const storedUserInfo = localStorage.getItem('userInfo');
  const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;
  const username = userInfo ? userInfo.username : null;
  const userPosition = localStorage.getItem('userPosition')
    ? localStorage.getItem('userPosition')
    : null;
  const navigate = useNavigate();

  //console.log(`Winner: ${winner}, Username: ${username}, Has rated: ${hasUserRated}`);

  // get rate with same itemname
  const fetchRateData = () => {
    axios
      .get(`http://localhost:3001/items/${itemId}/rate`)
      .then((response) => {
        setItemDetails(response.data.firstResult);
        setRateData(response.data.allResult);
        winnerRateOrNot();
      })
      .catch((error) =>
        console.error('There was an error fetching the item details:', error),
      );
  };
  // getRate By itemid and username , if exist then should not write rate again

  const winnerRateOrNot = async () => {
    console.log('Checking if user has rated...');
    try {
      if (!username) {
        console.error('Username is not available.');
        return;
      }

      const url = `http://localhost:3001/rate/${itemId}/${username}`;
      const { data } = await axios.get(url);
      const userHasRated = !!data && 'rating' in data;
      setHasUserRated(userHasRated);
    } catch (error) {
      console.error('Error fetching data:', error);
      setHasUserRated(false);
    }
  };

  useEffect(() => {
    fetchRateData();
    winnerRateOrNot();
  }, [itemId]);

  // get winner of this itemid
  useEffect(() => {
    axios
      .get(`http://localhost:3001/results/${itemId}`)
      .then((response) => {
        const winnerData = response.data[0].winner;
        console.log(winnerData, 'winner');
        setWinner(winnerData);
      })
      .catch((error) =>
        console.error('Error fetching winner information:', error),
      );
  }, []);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleRatingChange = (rating) => {
    setUserRating(rating);
  };

  if (!itemDetails) {
    return <div>Loading...</div>;
  }

  function handleClose() {
    navigate(-1);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const ratingData = {
      itemID: itemId,
      rated_by: winner,
      rating: userRating,
      comment: comment,
    };

    try {
      const response = await axios.post(
        'http://localhost:3001/rate',
        ratingData,
      );
      console.log(response.data.message);
      setHasUserRated(true);
      fetchRateData();
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };

  return (
    <div className="login-box" style={{ width: '30vw' }}>
      <div style={{ width: '100%' }}>
        <p>Item ID: {itemId}</p>
        <p>Item Name: {itemDetails.name}</p>
        <p>
          Average Rate:{' '}
          {itemDetails.average_rating !== null
            ? `${parseFloat(itemDetails.average_rating).toFixed(1)} stars`
            : 'No people have rated it yet.'}
        </p>
        {itemDetails.average_rating !== null ? (
          rateData.map((rating, index) => (
            <RatingForm
              key={index}
              rateData={rating}
              position={userPosition}
              username={username}
              refreshData={fetchRateData}
            />
          ))
        ) : (
          <p>No ratings available.</p>
        )}

        {winner !== null &&
          username !== null &&
          winner === username &&
          hasUserRated === false && (
            <div className="rating-form">
              <form onSubmit={handleSubmit}>
                <div>
                  <label>My rate: </label>
                  <StarRating rating={userRating} onRate={handleRatingChange} />
                </div>
                <div>
                  <label>
                    My comment:{' '}
                    <input
                      type="text"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </label>
                </div>
                <button type="submit">Submit</button>
                <button type="button" onClick={handleClose}>
                  Close
                </button>
              </form>
            </div>
          )}
        {(winner == null || winner != username || hasUserRated) && (
          <button onClick={handleClose}>Close</button>
        )}
      </div>
    </div>
  );
}

export default ViewRatings;
