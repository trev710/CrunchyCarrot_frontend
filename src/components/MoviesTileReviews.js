import React from 'react';


function MoviesTileReviews({ id, title, genre, runtime, tagline, rating, releaseYear, overview, image, reviews }) {
    function handleSubmit() {
        console.log('hi')
    }

    const allReviews = reviews.map((review) => {
        return (
            <div className="movie-reviews">
                <h3>Review By: {review.author}</h3>
                <p>{review.content}</p>
                <img style={{height: "25px"}} src={review.authorImage} alt="author-logo" ></img>
            </div>
        )
    })

    return (
        <div>
            <h1>{title}</h1>
            <img style={{height: "400px"}} src={image} alt={id}></img>
            <h3>{genre}</h3>
            <h3>{releaseYear}</h3>
            <h3>Runtime: {runtime} minutes</h3>
            <h4>{tagline}</h4>
            {allReviews}
            <form onSubmit={handleSubmit}>
                <textarea name="review"  placeholder="Add a review..." ></textarea>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}


export default MoviesTile; 