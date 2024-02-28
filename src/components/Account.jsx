import {useState, useEffect} from 'react'


export default function Account({token, newReservedBook}){
    const [reservedBooks, setReservedBooks] = useState(null)
    
    useEffect(()=>{
        async function fetchReservedBooks() {
            try {
                // run if statmement
                const response = await fetch(
                    "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations",{
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }}
                    );
                    const result = await response.json();
                    console.log(result)
                    setReservedBooks(result.reservation)
                } catch (error) {
                    console.error(error);
                }
            }
            fetchReservedBooks()
        },[token, newReservedBook])

        
        return (
           <>
          {reservedBooks && reservedBooks.length > 0 ? (
      reservedBooks.map(book => (
        <div key={book.id}>
          <p>{book.title}</p>
        </div>
      ))
    ) : (
      <p>No reserved books</p>
    )}
           </>
        )
    }



// write a component
/*
use a state variable to store the books
use a useEffect to fetch the books
use map to map over the books
    -just the titles

*/