import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UserReviews from './UserReviews';
import UserFriends from './UserFriends'
import { useHistory } from 'react-router-dom';



function UserProfile({ currentUser, setCurrentUser, reviews, setReviews, onUpdateReview, onDeleteReview, onUpdateUserInfo, friendshipsState }) {
    const [canEditAccount, setCanEditAccount] = useState(false)
    const [canDeleteAccount, setCanDeleteAccount] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [avatar, setAvatar] = useState('')
    // const [accountUpdated, setAccountUpdated] = useState(false)
    // const [reviewsStateWithNew, setReviewsStateWithNew] = useState([])

    // debugger
    // useEffect(() => {
    //     fetch('http://localhost:3001/reviews')
    //     .then(response => response.json())
    //     .then(data => setReviewsStateWithNew(data));
    //   }, [])
    
    const  history = useHistory()

    function toggleEditProfile() {
        setCanEditAccount(!canEditAccount)
    }

    function toggleDeleteProfile() {
        setCanDeleteAccount(!canDeleteAccount)
    }


    // if (reviewsStateWithNew.length !== 0) {

    // const reviewsForCurrentUser = reviewsStateWithNew.map((review) => {
    //     return review.author.id === currentUser.id
    // })

    // set reviewsState with currentUser
    // const reviewsForCurrentUser = reviewsStateWithNew.map((review) => {
    //     const result = []
    //     if (review.user_id === currentUser.id) {
    //         result.push(review)
    //     } else {

    //     }
    //     return result 
    // })

    const reviewsByCurrentUser = reviews.filter((review) => {
        return review.user_id === currentUser.id
    })


    const allUserFriends = friendshipsState.map((relationship) => {
        return <UserFriends
        key={relationship.id}
        id={relationship.id}
        followeeName={relationship.followee_username}
        followeeId={relationship.followee_id}
        followeeAvatar={relationship.followee_avatar}
        />
    })


    const allReviews = reviewsByCurrentUser.map((review) => {
        return <UserReviews
        key={review.id} 
        id={review.id}
        author={review.author}
        authorImage={review.author_image}
        movieTitle={review.movie_title}
        movieImage={review.movie_image}
        personalRating={review.personal_rating}
        content={review.content}
        onUpdateReview={onUpdateReview}
        onDeleteReview={onDeleteReview}
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
        const formData = {
            username,
            avatar,
            password
        }
        
        fetch(`http://localhost:3001/users/${currentUser.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        onUpdateUserInfo(data)
        history.push("/profile");
      })
      setAvatar("")
      setUsername("")
      setPassword("")
      toggleEditProfile()
    }

    function handleDeleteAccount() {
        fetch(`http://localhost:3001/users/${currentUser.id}`, {
        method: "DELETE", 
        headers: {
        "Content-Type": "application/json",
      },
    })
        setCurrentUser(null)
        history.push("/");
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
                <input type="password" name="password" value={password} onChange={handlePasswordChange} />
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
                <button onClick={handleDeleteAccount}>I've Crunched Enough Carrots</button>
            </div>
            :
            null
            }
{friendshipsState.length === 0 ? <h2> You're Not Following Anyone Yet! </h2> : <h2>Following</h2>}
            {allUserFriends}
            <h1>Recent Reviews</h1>
            {allReviews}
        </div>
    );
}
export default UserProfile;