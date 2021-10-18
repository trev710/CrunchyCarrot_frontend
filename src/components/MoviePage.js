import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";


function MoviePage({ currentUser, onAddReview, reviews }) {
    const [newContent, setNewContent] = useState("")
    const [movieToDisplay, setMovieToDisplay] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false);

    const { id } = useParams();

    const  history = useHistory()

    useEffect(() => {
        fetch(`http://localhost:3001/movies/${id}`)
          .then((r) => r.json())
          .then((movie) => {
            setMovieToDisplay(movie);
            setIsLoaded(true);
          });
      }, [id]);

      if (!isLoaded) return <h2>Loading Please Wait</h2>;

    const { title, image, genre, runtime, tagline, releaseYear } = movieToDisplay;


    function handleSubmitReview(e) {
        e.preventDefault();

        const newReview = {
            user_id: currentUser.id,
            movie_id: id,
            personal_rating: 1,
            content: newContent,
            author: currentUser.username,
            authorImage: currentUser.avatar,
            movieTitle: title,
            movieImage: image
        }

        fetch('http://localhost:3001/reviews', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newReview)
        })
        .then((r) => r.json())
        .then(data => {
            onAddReview(data)
            history.push("/profile");
        })
        e.target.reset()
    }

    function handleFollowOtherUser(data) {
        console.log(data)
        // console.log('hi')
    }

    const allReviews = movieToDisplay.reviews.map((review) => {
        return (
<div style={{border: "1px solid black"}} key={review.id} className="movie-reviews">
                <h3>Review By: {review.author}</h3>
                <p>{review.content}</p>
                <img style={{height: "25px"}} src={review.author_image} alt="author-logo" ></img>
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
            {/* {allReviews} */}
            <form onSubmit={handleSubmitReview}>
            <textarea name="review" value={newContent} onChange={(e) => setNewContent(e.target.value)}  placeholder="Add a review..." ></textarea>
                <input type="submit" value="Submit" />
            </form>
            <h4>Other Reviews For: {title}</h4>
            {allReviews}
        </div>
    )
}


export default MoviePage; 