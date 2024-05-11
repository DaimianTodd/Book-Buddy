import React, { useState, useEffect } from 'react';

export default function Account({ token, user }) {
  const [reservedBooks, setReservedBooks] = useState(null);

  async function fetchReservedBooks() {
    try {
      const response = await fetch(
        "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations", {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to retrieve reserved books');
      }
      const result = await response.json();
      setReservedBooks(result.reservation);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (token) {
      fetchReservedBooks();
    }
  }, [token]);

  async function returnBook(bookId) {
    try {
      const response = await fetch(
        `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations/${bookId}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to return book');
      }
      fetchReservedBooks();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className='userInformation'>
        {user && (
          <>
            <h1>User Login Information:</h1>
            <h3>First Name:</h3> <p>{user.firstname}</p>
            <h3>Last Name:</h3> <p>{user.lastname}</p>
            <h3>Email:</h3> <p>{user.email}</p>
          </>
        )}
      </div>

      <div className='reservedBooks'>
        <h2>Reserved Books:</h2>
        {reservedBooks && reservedBooks.length > 0 ? (
          reservedBooks.map(book => (
            <div key={book.id}>
              <p>{book.title}</p>
              <button onClick={() => returnBook(book.id)}>Return Book</button>
            </div>
          ))
        ) : (
          <div>
            <p>No books reserved</p>
          </div>
        )}
      </div>
    </>
  );
}