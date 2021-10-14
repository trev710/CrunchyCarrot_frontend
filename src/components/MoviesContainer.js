import React from 'react';
import MoviesTile from './MoviesTile';



function MoviesContainer({  movies, selectedGenre }) {

    const filteredByGenre = movies.filter((movie) => {
        return movie.genre.includes(selectedGenre)
    })


    const allMovies = filteredByGenre.map((movie) => {
        return <MoviesTile 
        key={movie.id}
        title={movie.title}
        runtime={movie.runtime}
        image={movie.image}
        genre={movie.genre}
        tagline={movie.tagline}
        rating={movie.rating}
        releaseYear={movie.release_year}
        overview={movie.overview}
        reviews={movie.reviews}
        //handleReview={handleReview}
        />
    })

    return (
        <div>
        <h1>Trending Right Now!</h1>
            {allMovies}
        </div>
    )
}


export default MoviesContainer; 