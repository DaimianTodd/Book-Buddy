/* TODO - add your code to create a functional React component that renders details for a single book. Fetch the book data from the provided API. You may consider conditionally rendering a 'Checkout' button for logged in users. *//* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

const URL = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books";

export default function SingleBook(){ 
    const {bookId}= useParams();
    const [book, setBook] = useState(null);
    

    useEffect(()=>{
        const fetchBook = async () =>{
            try{
                const response = await fetch (`${URL}/${bookId}`)
                if (!response.ok){
                    throw new Err('Failed to retrieve book')
                }
                const result = await response.json();
                setBook(result.book);
            }catch(err){
                console.error(err);
            }
        };
        fetchBook()
    }, [bookId])

       
    return(
        <>
        <div>
            <h2>Book Details</h2>
            {book && (
                <ul>
                    
                    <li>Title: {book.title}</li>
                    <li>Author: {book.author}</li>
                    <li>Description: {book.description}</li>
                    <li><img src={book.coverimage} alt={book.name}></img></li>
                </ul>
            )} 
            
            
            
            </div>
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