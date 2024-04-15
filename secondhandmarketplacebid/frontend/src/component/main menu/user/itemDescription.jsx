import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import BidHistory from './bidHistory';
import './itemResult.css';
import { useNavigate } from 'react-router-dom';

function ItemDescription(props) {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [bidValue, setBidValue] = useState('');
  const [bidHistory, setBidHistory] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editDescription, setEditDescription] = useState('');
  const [position, setPosition] = useState('');
  const [listUser, setListUser] = useState(''); // who list this item
  const [curuser, setCurUser] = useState(() => {
    const localUserData = localStorage.getItem('userInfo');

    const userData = localUserData ? JSON.parse(localUserData) : null;

    return userData ? userData.username : null;
  }); // who want to buy this item
  const [showForm, setShowForm] = useState(false);

  const handleBidChange = (event) => {
    setBidValue(event.target.value); // Updates bidValue state with the new input value
  };

  const [formData, setFormData] = useState({
    cancel_by: '',
    itemID: '',
    reason: '',
  });

  useEffect(() => {
    localStorage.setItem('currentItemId', itemId); //保存item id

    const fetchUserList = async (itemId) => {
      try {
        const response = await axios.get(
          `http://localhost:3001/users/${itemId}`,
        );
        console.log('list', response.data);

        setListUser(response.data.username);
      } catch (error) {
        console.error('Failed to fetch user list:', error);
      }
    };

    fetchUserList(itemId); // 获取item的info
  }, [itemId]);

  useEffect(() => {
    const fetchPosition = async () => {
      const username = curuser;
      try {
        const response = await axios.get(
          `http://localhost:3001/mainmenu/${username}`,
        );

        setPosition(response.data.position);
      } catch (error) {
        console.error('获取用户位置失败:', error);
        setPosition(null);
      }
    };

    fetchPosition();
  }, [props.user]);

  useEffect(() => {
    const fetchItemAndBids = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/items/${itemId}`,
        );
        console.log(response.data);
        setItem(response.data.firstResult);
        setBidHistory(response.data.allResult);
        setEditDescription(response.data.firstResult.description);
      } catch (error) {
        console.error('Error fetching item and bids:', error);
      }
    };

    fetchItemAndBids();
  }, [itemId]);

  async function handleGetItNow() {
    if (curuser == item.listed_by) {
      alert('you cannot bid on item listed by yourself');
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:3001/items/bid/${itemId}`,
        {
          username: curuser,
          amount: item.get_it_now,
        },
      );

      alert('Congratulations! You got this item.');
      navigate('/mainMenu');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to process your request. Please try again.');
    }
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCancelSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/cancel', {
        cancel_by: curuser,
        itemID: itemId,
        reason: formData.reason,
      });

      if (response.status === 200) {
        alert('Item canceled successfully.');
        navigate('/mainmenu');
        setShowForm(false);
        setFormData({ cancel_by: '', itemID: '', reason: '' });
      }
    } catch (error) {
      console.error('Error canceling item:', error);
      alert('Failed to cancel the item. Please try again.');
    }
  };

  const handleShowForm = () => {
    setShowForm(true);
  };
  const handleCloseForm = () => {
    setShowForm(false);
  };

  async function handleBidonthisItem() {
    const bidAmount = Number(bidValue);

    if (curuser == item.listed_by) {
      alert('you cannot bid on item listed by yourself');
      return;
    }

    if (item.get_it_now != null && bidAmount >= Number(item.get_it_now)) {
      alert(
        "You cannot bid more than the 'Get It Now' price. Please click the 'Get It Now' button.",
      );
      return;
    }

    if (item.amount == null && bidAmount < 1) {
      alert('bid must at least $1');
      return;
    }

    if (item.amount != null && bidAmount < parseFloat(item.amount) + 1) {
      alert('bid must at least $1 above current bid');
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:3001/items/bid/${itemId}`,
        {
          username: curuser,
          amount: bidValue,
        },
      );

      alert('Your bid is submitted successfully');
      window.location.reload();
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to process your request. Please try again.');
    }
  }

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    if (editDescription.length == 0) {
      alert('description cant be empty');
      return;
    }

    axios
      .put(`http://localhost:3001/items/${itemId}`, {
        description: editDescription,
      })
      .then((response) => {
        setEditDescription(response.data.description);
        setItem((prevItem) => ({
          ...prevItem,
          description: response.data.description,
        }));
        setIsEditing(false);
      })
      .catch((error) => {
        console.error('Error updating description:', error);
      });
  };
  const handleClose = () => {
    
    navigate('/searchresult');
  
    
  };

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <div className="login-box" style={{ width: '30vw' }}>
      <div className="item-details">
        <p>
          Item ID: {item.itemid}{' '}
          <Link to={`/items/${item.itemid}/rate`}>View Ratings</Link>
        </p>
        <p>
          Description:{item.description}{' '}
          {listUser === curuser &&
            (!isEditing ? (
              <>
                <span
                  onClick={handleEditClick}
                  style={{
                    cursor: 'pointer',
                    color: 'blue',
                    textDecoration: 'underline',
                  }}
                >
                  Edit Description
                </span>
              </>
            ) : (
              <>
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                />
                <button onClick={handleSaveClick}>Save</button>
              </>
            ))}
        </p>
        <p>Category: {item.category_name}</p>
        <p>Condition: {item.condition}</p>
        <p>
          <label>
            Returns Accepted:
            <input type="checkbox" checked={item.returnable} readOnly />
          </label>
        </p>
        <p>
          Get It Now Price:{' '}
          {item.get_it_now ? `$${item.get_it_now}` : 'Not available'}
          {item.get_it_now && (
            <button onClick={handleGetItNow} style={{ marginLeft: '20px' }}>
              Get It Now!
            </button>
          )}
        </p>
        <p>Auction Ends: {new Date(item.auction_end_time).toLocaleString()} </p>
        <BidHistory auctionEnded={false} bidData={bidHistory} />
        <p></p>
        <p>
          <label>
            Your bid:
            <input
              type="text"
              value={bidValue}
              onChange={handleBidChange}
              style={{ marginLeft: '10px' }}
            />
          </label>{' '}
          <span>
            minimun bid $
            {item.amount == null
              ? '1'
              : `${(parseFloat(item.amount) + 1).toFixed(2)}`}
          </span>
        </p>

        <div className="buttons-container">
          <button onClick={handleClose}>Close</button>

          {/* 仅当 position 不为 null 且 showForm 为 false 时显示这个按钮 */}
          {position !== null && !showForm && (
            <button onClick={handleShowForm}>Cancel This Item</button>
          )}

          <button onClick={handleBidonthisItem}>Bid on This Item</button>
        </div>
        {showForm && (
          <div>
            <form onSubmit={handleCancelSubmit}>
              <label>
                Reason:
                <textarea
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                />
              </label>
              <button type="submit">Submit</button>
              <button onClick={handleCloseForm}>Close</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default ItemDescription;
