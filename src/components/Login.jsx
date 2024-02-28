/* TODO - add your code to create a functional React component that renders a login form *//* TODO - add your code to create a functional React component that renders a registration form */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Login({setToken}){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    
        async function handleSubmit(event){
            event.preventDefault()
            try {
                let response = await fetch(
                    "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/login",{
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            email: email,
                            password: password
                        })
                    })
                    console.log(response)
                    const result =  await response.json();
                    console.log(result);
                    setToken(result.token)
                    localStorage.setItem("token", result.token)

                    if (result.token){
                        navigate("/")
                    }else{
                       prompt("Login Unsuccessful, please try again!")
                    };




                } catch (error) {
                    console.error(error);
                }
        }
        
        return (
           <>
            <form onSubmit={handleSubmit}>
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