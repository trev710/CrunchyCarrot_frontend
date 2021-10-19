import React from 'react';
import { Link } from 'react-router-dom';



function UserFriends({ followeeName, followeeAvatar, followeeId }) {
    return (
        <div style={{border: "1px solid black"}} className="user-friends">

            <h4>{followeeName}</h4>
            <Link to={`/users/${followeeId}`}>
                <img style={{height: "50px"}} src={followeeAvatar} alt={followeeName}></img>
            </Link>
        </div>
    )
}



export default UserFriends; 