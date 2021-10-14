import React from 'react';



function MoviesTile({ id, title, genre, runtime, tagline, rating, releaseYear, overview, image, reviews }) {
    
    function handleReview() {
        console.log(id)
    }

    return (
        <div>
            <h1>{title}</h1>
            <img style={{height: "200px"}} src={image} alt={id}></img>
            <h4>{genre}</h4>
            <h4>{releaseYear}</h4>
            <h4>Runtime: {runtime} minutes</h4>
            <h5>{tagline}</h5>
            <button onClick={handleReview}>Review Movie</button>
        </div>
    )
}


export default MoviesTile; 