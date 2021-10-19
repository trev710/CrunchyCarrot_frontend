import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

function Login({ setCurrentUser }) {
  const [formData, setFormData] = useState({username: "", password: ""});

  const  history = useHistory()


  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }


  function handleSubmit(e) {
    e.preventDefault()
    fetch("http://localhost:3001/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((r) => r.json())
    .then((user) => {
      setCurrentUser(user);
      history.push("/");
    }); 
  }

    return (
      <div >
      <form className="login" onSubmit={handleSubmit} autoComplete="off">

            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
            />
                <br></br>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
            />
                <br></br>
            <input className="login-btn" type="submit" value="Login" />
          </form>
        </div>
      );
}


export default Login; 