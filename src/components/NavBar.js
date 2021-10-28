import React from 'react';
import { NavLink } from 'react-router-dom';
import { useHistory } from "react-router-dom";

function NavBar({ currentUser, resetCurrentUser }) {

    const history = useHistory();
    
    function handleLogout() {
        resetCurrentUser(null)
        history.push("/");
      }

    return (
        <div classname="nav-bar">

<img className="app-mascot" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.clipartkey.com%2Fmpngs%2Fm%2F28-283187_dinosaur-clipart-fat-carrot-cartoon.png&f=1&nofb=1" alt="CC logo"></img>
<h4 className="app-description">A Social Media Platform To Talk About Your Favorite Films!</h4>
<h1 className="app-name"> Crunchy Carrots</h1>


          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
        {currentUser ? (
        <>
             <NavLink to="/movies/new" className="nav-link">
            |  Add a Movie  |
          </NavLink>
          <NavLink to="/profile" className="nav-link">
            Profile
          </NavLink>
          <button className="logout" onClick={handleLogout}>Log Out</button>
        </>
        ) : (
        <>
          <NavLink to="/signup" className="nav-link">
          |  Signup  |
          </NavLink>
          <NavLink to="/login" className="nav-link">
          Login
          </NavLink>
        </>
           )
         }

        </div>
      );
}

export default NavBar; 