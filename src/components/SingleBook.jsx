import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'

export default function SinglePlayer(){
    const {bookID} = useParams();
    const [book, setBook] = useState(null);


    useEffect(() =>{
        const fetchBooks = async () =>{
            try{
                const response = await fetch (`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${bookID}`);
                if (!response.ok){
                    throw new Error('Failed to fetch player')
                }
                const result = await response.json();
                
                setBook(result.book);
            }catch(error){  
                console.error(error);
            }
        };
        
        fetchBooks()
    }, [bookID])
            
            
            return (
                <>
            <div id='singleBookDetails'>
                <h2>Book Details</h2>
                {book && (
                    <ul className='singleBookList'>
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
    
    
    
    