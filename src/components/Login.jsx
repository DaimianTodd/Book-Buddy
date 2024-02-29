import { useState} from 'react';
import { useNavigate } from 'react-router-dom';


export default function Login({setToken}){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    
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
                    const result =  await response.json();
                    setToken(result.token)
                    localStorage.setItem("token", result.token)

                    if(result.token){
                        navigate("/")
                    }
                
                } catch (error) {
                    console.error(error);
                }
        }
        
        return (
           <>
            <form id='loginForm' onSubmit={handleSubmit}>
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