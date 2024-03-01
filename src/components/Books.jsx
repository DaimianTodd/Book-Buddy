import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Books({ token, setNewReservedBook }) {
    const [books, setBooks] = useState(null);
    const [searchBook, setSearchBook] = useState('')

    useEffect(() => {
        async function fetchBooks() {
            try {
                const response = await fetch(
                    "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books"
                );
                if (!response.ok) {
                    throw new Error('Failed to fetch books');
                }
                const result = await response.json();
                setBooks(result.books);
            } catch (error) {
                console.error(error);
            } 
        }
        fetchBooks();
    }, []);


    
    async function checkOut(id) {
        try {
            const response = await fetch(
                `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${id}`, {
                    method: "PATCH",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        available: false
                    })
                }
                );
                if (!response.ok) {
                    throw new Error('Failed to reserve book');
                }
                const result = await response.json();
                if (typeof setNewReservedBook === 'function') {
                    setNewReservedBook(result);
                }
            } catch (error) {
                console.error(error);
            }
        }
        
        
        const handleSearchInputChange = (event) => {
            setSearchBook(event.target.value)
        }
        
        const filterBooks = books?.filter(book => {
            return book.title.toLowerCase().includes(searchBook.toLocaleLowerCase());
        });
        
        
        
        return (
            <>
            <div id='bookSearchParent'>
                <input 
                    id='bookSearchBar'
                    type='text'
                    placeholder='Search title'
                    value={searchBook}
                    onChange={handleSearchInputChange}
                    />
            </div>
            
            <div id='allBooks'>
            {filterBooks && filterBooks.map(book => (
                <div id='libraryBooks' key={book.id}>
                    <p className='bookTitle'>{book.title}</p>
                    <Link to={`/books/${book.id}`}><button>View Details</button></Link> 
                    <button id='reserveBookBtn' onClick={() => checkOut(book.id)}>Reserve Book</button>
                </div>
            ))}
            </div>
        </>
    );
}