import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UserReviews from './UserReviews';



function UserProfile({ currentUser, resetCurrentUser, reviews }) {
    const [canEditAccount, setCanEditAccount] = useState(false)
    const [canDeleteAccount, setCanDeleteAccount] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [avatar, setAvatar] = useState('')

    function toggleEditProfile() {
        setCanEditAccount(!canEditAccount)
    }

    function toggleDeleteProfile() {
        setCanDeleteAccount(!canDeleteAccount)
    }


    const allReviews = currentUser.reviews.map((review) => {
        return <UserReviews
        key={review.id} 
        id={review.id}
        author={review.author}
        authorImage={review.author_image}
        movieTitle={review.movie_title}
        movieImage={review.movie_image}
        content={review.content}
        />
    })

    function handleNameChange(event) {
        setUsername(event.target.value);
     
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    
    }

    function handleAvatarChange(event) {
        setAvatar(event.target.value);
    }

      function handleUpdateAccount(e) {
        e.preventDefault()
    //   resetCurrentUser(null)
    //   history.push("/login");
        const formData = {
            // username
            username,
            avatar,
            password
        }
        
        fetch(`http://localhost:3001/users/${currentUser.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({"username": formData.username, "avatar": formData.avatar, "password": formData.password}),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
    }

    function handleDeleteAccount(e) {
        e.preventDefault()
        console.log('hi from the delete')
    }

    return (
        <div>
            <h1>Welcome {currentUser.username}!</h1>
            <img className="profile-pic" style={{height: "75px"}} src={currentUser.avatar}></img>
            <button onClick={toggleEditProfile}>{canEditAccount ? "Nevermind" : "Edit Account"}</button>
            {canEditAccount ?
            <div>
            <form onSubmit={handleUpdateAccount}>
                <label>
                Change Username:
                    <input type="text" name="username" value={username} onChange={handleNameChange} />
                </label>
                <label>
                Change Password:
                    <input type="text" name="password" value={password} onChange={handlePasswordChange} />
                </label>
                <label>
                Change Avatar:
                    <input type="text" name="avatar" value={avatar} onChange={handleAvatarChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
            </div>
            :
            null
            }
            <button onClick={toggleDeleteProfile}>{canDeleteAccount ? "I would Never!" : "Delete Account"}</button>
            {canDeleteAccount ?
            <div>
                <h2>Deleting Your Account Will Delete EVERYTHING</h2>
                <button onSubmit={e => handleDeleteAccount(e)}>I've Crunched Enough Carrots</button>
            </div>
            :
            null
            }

            <h1>Recent Reviews</h1>
            {allReviews}
        </div>
    );
}
export default UserProfile;