import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UserReviews from './UserReviews';



function UserProfile({ currentUser, resetCurrentUser }) {
    const [canEdit, setCanEdit] = useState(false)
    const [canDelete, setCanDelete] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    function toggleEditProfile() {
        setCanEdit(!canEdit)
    }

    function toggleDeleteProfile() {
        setCanDelete(!canDelete)
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

      function handleUpdateAccount(e) {
        e.preventDefault()
    //   resetCurrentUser(null)
    //   history.push("/login");
        const formData = {
            username
        }

        fetch(`http://localhost:3001/users/1`, {
      method: "PATCH", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({formData}),
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
            <img className="profile-pic" style={{height: "75px"}} src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.6HvWW6db7Fw_EYv5F5AmzQHaEK%26pid%3DApi&f=1" alt="profile-logo"></img>
            <button onClick={toggleEditProfile}>{canEdit ? "Nevermind" : "Edit Account"}</button>
            {canEdit ?
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
                <input type="submit" value="Submit" />
            </form>
            </div>
            :
            null
            }
            <button onClick={toggleDeleteProfile}>{canDelete ? "I would Never!" : "Delete Account"}</button>
            {canDelete ?
            <div>
                <h2>Are you SURE you want to delete your account</h2>
                <button onSubmit={e => handleDeleteAccount(e)}>Yes, I'd like to be banished to the shadow realm</button>
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