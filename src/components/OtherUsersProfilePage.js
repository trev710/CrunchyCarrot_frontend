import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom";

function OtherUsersProfilePage({ onDeleteFriendship }) {
    const [userToDisplay, setUserToDisplay] = useState(null)
    const [isUserLoaded, setIsUserLoaded] = useState(false);

    const { id } = useParams();

    const  history = useHistory()

    function handleUnfollowOtherUser() {
        fetch(`http://localhost:3001/friendships/${userToDisplay.following_users[0].id}`, {
            method: "DELETE", 
            headers: {
            "Content-Type": "application/json",
          },
        })
        history.push("/profile");
        onDeleteFriendship(userToDisplay.following_users[0].id)
    }

    useEffect(() => {
        fetch(`http://localhost:3001/users/${id}`)
          .then((r) => r.json())
          .then((user) => {
            setUserToDisplay(user);
            setIsUserLoaded(true);
          });
      }, [id]);

      if (!isUserLoaded) return <h2>Loading...</h2>;

      const { username, avatar } = userToDisplay;


      const allOtherUserReviews = userToDisplay.reviews.map((review) => {
        return (
            <div style={{border: "1px solid black"}} key={review.id} className="friend-movie-reviews">
                <h3>Review For: {review.movie_title}</h3>
                <img style={{height: "100px"}} src={review.movie_image} alt="author-logo" ></img>
                <p>{review.content}</p>
                <p> User Rating: {review.personal_rating}</p>
            </div>
        )
    })

    return (
        <div>
            <h1>{username}</h1>
            <button className='following-btn' onClick={handleUnfollowOtherUser} style={{background: '#00b020', boxShadow: "inset 0 1px 0 hsl(0deg 0% 100% / 30%)"}}>Following</button>
            <img className="friend-profile-pic" style={{height: "75px"}} src={avatar} alt="profile-logo"></img>
            <h2>{username}'s Reviews</h2>
            {allOtherUserReviews}
        </div>
    )
}



export default OtherUsersProfilePage; 