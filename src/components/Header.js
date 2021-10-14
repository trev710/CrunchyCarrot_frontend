import React from 'react';
import NavBar from './NavBar'


function Header({ currentUser, resetCurrentUser }) {
    return (
        <div className="header">
            <NavBar currentUser={currentUser} resetCurrentUser={resetCurrentUser} />
        </div>
    )
}


export default Header; 