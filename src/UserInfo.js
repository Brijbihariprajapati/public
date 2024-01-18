// UserInfo.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserInfo.css'; // Import the corresponding CSS file

const UserInfo = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    // Fetch user data from the API
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setUsers(response.data);
        displayUserInfo(response.data);
      })
      .catch(error => console.error('Error fetching user data:', error));
  }, []);

  const displayUserInfo = (data = users) => {
    setFilteredUsers(data);

    // Display search history
    setSearchHistory((prevSearchHistory) => {
      const newSearchHistory = [...prevSearchHistory, searchTerm];
      return newSearchHistory;
    });
  };

  const searchUser = () => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filteredData = users.filter((user) =>
      user.name.toLowerCase().includes(lowerCaseSearchTerm)
    );
    displayUserInfo(filteredData);
  };

  const sortByName = () => {
    const sortedUsers = [...filteredUsers].sort((a, b) => a.name.localeCompare(b.name));
    displayUserInfo(sortedUsers);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="user-info-container">
      <h1>User Info</h1>
      {filteredUsers.map((user) => (
        <div key={user.id} className="user-info-item">
          <p className="user-info-text">Name: {user.name}</p>
          <p className="user-info-text">Username: {user.username}</p>
        </div>
      ))}
      <label htmlFor="search" className="search-label">
        Search by Name:{' '}
      </label>
      <input
        type="text"
        id="search"
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-input"
      />
      <button onClick={searchUser} className="search-button">
        Search
      </button>
      <button onClick={sortByName} className="sort-button">
        Sort by Name
      </button>
      <div>
        <h3>Search History</h3>
        {searchHistory.map((term, index) => (
          <div key={index} className="history-item">
            {term}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserInfo;
