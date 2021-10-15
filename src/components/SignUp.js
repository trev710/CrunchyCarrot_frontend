import React, { useState } from "react";
import { useHistory } from 'react-router-dom';

function SignUp({ setCurrentUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const history = useHistory();


  function handleSubmit(e){
    e.preventDefault();

    const signupFormData = {
      username,
      password,
      avatar
    }

    // console.log(signupFormData)

    fetch('http://localhost:3001/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({"username": signupFormData.username, "password": signupFormData.password, "avatar": signupFormData.avatar}),
    })
    .then((r)=>r.json())
    .then((user) => {
        setCurrentUser(user);
        console.log(user)
        history.push('/');    

    })
}  
return (
  <div>
  <h1>Signup</h1>
  <form  autoComplete="off" className="login" onSubmit={handleSubmit}>

      <label>Username</label>
      <input
        type="text"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <label>Password</label>
      <input
        type="password"
        name="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <label>Avatar Image</label>
      <input
        type="text"
        name="avatar"
        value={avatar}
        onChange={(e) => setAvatar(e.target.value)}
      />

      <input className="signup-btn" type="submit" value="Signup" />
    </form>
    </div>
  );
}

export default SignUp; 