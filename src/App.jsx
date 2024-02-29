import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Books from './components/Books';
import Register from './components/Register';
import Login from './components/Login';
import Account from './components/Account';
import SingleBook from './components/SingleBook';
import Navbar from './components/Navbar';

function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [newReservedBook, setNewReservedBook] = useState(null);

  const fetchUserData = async (token) => {
    try {
      if (token) {
        const response = await fetch("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me", {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user information');
        }
        const result = await response.json();
        setUser(result);
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  

  useEffect(() => {
    let savedToken = localStorage.getItem("token");
    if (savedToken !== "null") {
      setToken(savedToken);
      fetchUserData(savedToken);
    }
  }, [token]); 
  

  const logOut = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <>
      <Navbar token={token} logOut={logOut} />
      <Routes>
        <Route path="/books/:bookID" element={<SingleBook />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<Account token={token} newReservedBook={newReservedBook} user={user} />} />
        <Route path="/" element={<Books token={token} setNewReservedBook={setNewReservedBook} />} />
      </Routes>
    </>
  );
}

export default App;