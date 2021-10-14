import React from 'react';
import UserReviews from './UserReviews';



function UserProfile({ currentUser }) {
    const allReviews = currentUser.reviews.map((review) => {
        return <UserReviews 
        key={review.id}
        author={review.author}
        authorImage={review.author_image}
        movieTitle={review.movie_title}
        movieImage={review.movie_image}
        content={review.content}
        />
    })


    return (
        <div>
            <h1>Welcome {currentUser.username}!</h1>
            <img className="profile-pic" style={{height: "75px"}} src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Screen_Shot_for_avatar_image_hosting.png" alt="profile-logo"></img>
            <button>Edit Account</button>
            <button>Delete Account</button>
            <h1>Recent Reviews</h1>
            {allReviews}
        </div>
    );
}
export default UserProfile;