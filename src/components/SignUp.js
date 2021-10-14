import React from "react";

function SignUp() {
//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//   });

//   function handleChange(e) {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   }

//   function handleSubmit(e) {
//     e.preventDefault();
//     // TODO: sign up as a new user
//   }

//   const { username, password } = formData;

  return (
    <form  autoComplete="off" className="login">
      <h1>Signup</h1>

      <label>Username</label>
      <input
        type="text"
        name="username"
        // value={username}
        // onChange={handleChange}
      />

      <label>Password</label>
      <input
        type="password"
        name="password"
        autoComplete="current-password"
        // value={password}
        // onChange={handleChange}
      />

      <input className="signup-btn" type="submit" value="Signup" />
    </form>
  );
}

export default SignUp; 