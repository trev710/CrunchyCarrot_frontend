import React from 'react';


function UserReviews({ author, authorImage, movieTitle, movieImage, content }) {

    return (
        <div className="user-reviews">
            <h2>{movieTitle}</h2>
            <img style={{height: "50px"}} src={movieImage} alt={movieTitle}></img>
            <h4>{content}</h4>
            <img style={{height: "25px"}} src={authorImage} alt="author-logo" ></img>

            <p>Review By: {author}</p>
        </div>
    )
}



export default UserReviews;