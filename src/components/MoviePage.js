import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";


function MoviePage({ currentUser, onAddReview, reviews, onAddNewFollow, setReviews }) {
    const [newContent, setNewContent] = useState("")
    const [newRating, setNewRating] = useState(null)
    const [movieToDisplay, setMovieToDisplay] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false);
    const [movieReviews, setMovieReviews] = useState(null)
    // const [test, setTest] = useState(false)
    
    const { id } = useParams();

    const  history = useHistory()

    function handleRatingChange(e) {
        setNewRating(e.target.value)
    }

    function handleLike(reviewObj){
        const updateObj = {
            likes: reviewObj.likes + 1
            
        };

          fetch(`http://localhost:3001/reviews/${reviewObj.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updateObj),
          })
            .then((r) => r.json())
            .then(data => {
            
                console.log(data)
               
            });
            alert("What a Crunchy Review!")
    }

    useEffect(() => {
        fetch(`http://localhost:3001/movies/${id}`)
          .then((r) => r.json())
          .then((movie) => {
            setMovieToDisplay(movie);
            setMovieReviews(movie.reviews)
            setIsLoaded(true);
          });
      }, [id]);

      if (!isLoaded) return <h2>Loading Please Wait</h2>;

      const { title, image, genre, runtime, tagline, release_year, overview } = movieToDisplay;


    function handleSubmitReview(e) {
        e.preventDefault();

        const newReview = {
            user_id: currentUser.id,
            movie_id: id,
            personal_rating: parseInt(newRating),
            content: newContent,
            author: currentUser.username,
            authorImage: currentUser.avatar,
            movieTitle: title,
            movieImage: image,
            likes: 0
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

    function handleFollowOtherUser(userToFollow) {

        // const templateParams = {
        //     followerName: currentUser.username,
        //     followeeName: userToFollow.username
        // }

        const newFollowerRelationship = {
            follower_id: currentUser.id,
            followee_id: userToFollow.id,
            followee_username: userToFollow.username,
            followee_avatar: userToFollow.avatar
        }
        fetch('http://localhost:3001/friendships', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newFollowerRelationship)
        })
        .then((r) => r.json())
        .then(data => {
            //console.log(data)
            onAddNewFollow(data)
            history.push("/profile");
        })
    }

    const allReviews = movieReviews.map((review) => {
        return (
            <div style={{border: "2px solid black"}} key={review.id} className="movie-reviews">
                <h3>Review By: {review.author}</h3>
                <p>{review.content}</p>
                <img style={{height: "25px"}} src={review.author_image} alt="author-logo" ></img>
                <button onClick={(e) => handleFollowOtherUser(review.author_object)}>Follow User</button>
                <button onClick={(e) => handleLike(review)} className="like-button">❤️ Like Review</button>
                <p className="num-likes">{review.likes} Likes</p>
            </div>
        )
    })

    return (
        <div className="movie-show-page">
            
            <img className="movie-show-image" src={image} alt={id}></img>
            <h1 className="movie-show-title" >{title}</h1>
            <h4 className="movie-show-year">{release_year}</h4>
            <h3 className="show-movie-genre">{genre}</h3>
            <h3 className="movie-show-runtime">Time Length: {runtime} Minutes</h3>
            <h4 className="movie-show-tagline">{tagline}</h4>
            <p className="movie-para">{overview}</p>
            <form onSubmit={handleSubmitReview}>
                <textarea name="review" value={newContent} onChange={(e) => setNewContent(e.target.value)}  placeholder="Add a review..." ></textarea>
                <select onChange={handleRatingChange}>
                    <option value=''>Rate This Movie</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <input type="submit" value="Submit" />
            </form>
            <h4 className="other-reviews">Other Reviews For {title}</h4>
              {allReviews}  
        </div>
    )
}


export default MoviePage; 