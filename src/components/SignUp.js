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

        history.push('/');    

    })
}  
return (
  <div>
  <form  autoComplete="off" className="signup" onSubmit={handleSubmit}>

      <input
        type="text"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="UserName"
      />

<br></br>
      <input
        type="text"
        name="avatar"
        value={avatar}
        onChange={(e) => setAvatar(e.target.value)}
        placeholder="Avatar"
      />
 <br></br>
      <input
        type="password"
        name="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />

<br></br>

      <input className="signup-btn" type="submit" value="Signup" />
    </form>
    </div>
  );
}

export default SignUp; 