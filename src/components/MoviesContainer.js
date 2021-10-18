import React from 'react';
import MoviesTile from './MoviesTile';



function MoviesContainer({  updatedMoviesForGenre, selectedGenre }) {


    const filteredByGenre = updatedMoviesForGenre.filter((movie) => {
        return movie.genre.includes(selectedGenre)
    })

    const allMoviesForGenre = filteredByGenre.map((movie) => {
        return <MoviesTile 
        key={movie.id}
        id={movie.id}
        title={movie.title}
        runtime={movie.runtime}
        image={movie.image}
        genre={movie.genre}
        tagline={movie.tagline}
        rating={movie.rating}
        releaseYear={movie.release_year}
        overview={movie.overview}
        reviews={movie.reviews}
        />
    })

    return (
        <div>
            <h1>Popular Right Now!</h1>
            {allMoviesForGenre}
        </div>
    )

}


export default MoviesContainer; 