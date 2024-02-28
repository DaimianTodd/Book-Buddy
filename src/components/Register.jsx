/* TODO - add your code to create a functional React component that renders a registration form */

/* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */
import {useState, useEffect} from 'react'


export default function Register(){
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
  

        async function handleSubmit(event){
            event.preventDefault()
            try {
                const response = await fetch(
                    "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/register",{
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            firstname: firstname,
                            lastname: lastname,
                            email: email,
                            password: password
                        })
                    })
                    const result = await response.json();
                    console.log(result);
                    setFirstname("");
                    setLastname("");
                    setEmail("");
                    setPassword("");


                
                } catch (error) {
                    console.error(error);
                }
        }
        
        return (
           <>
            <form onSubmit={handleSubmit}>
                <label>Firstname:</label>
                <input value={firstname} onChange={(event)=>setFirstname(event.target.value)}></input>
                <br></br>
                <label>Lastname:</label>
                <input value={lastname} onChange={(event)=>setLastname(event.target.value)}></input>
                <br></br>
                <label>Email:</label>
                <input value={email} onChange={(event)=>setEmail(event.target.value)}></input>
                <br></br>
                <label>Password:</label>
                <input value={password} onChange={(event)=>setPassword(event.target.value)}></input>
                <br></br>
                <button>Submit</button>
            </form>
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