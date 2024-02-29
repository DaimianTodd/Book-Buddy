import { useState } from 'react';

export default function Register() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch(
        "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/register", {
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
      });
      if (!response.ok) {
        throw new Error('Failed to register');
      }
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
      <form id='registerForm' onSubmit={handleSubmit}>
        <label>Firstname:</label>
        <input type="text" value={firstname} onChange={(event) => setFirstname(event.target.value)}  required />
        <br />
        <label>Lastname:</label>
        <input type="text"value={lastname} onChange={(event) => setLastname(event.target.value)} required/>
        <br />
        <label>Email:</label>
        <input type="email"value={email} onChange={(event) => setEmail(event.target.value)} required/>
        <br />
        <label>Password:</label>
        <input type="password" value={password}onChange={(event) => setPassword(event.target.value)} required/>
        <br />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}