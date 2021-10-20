import React from 'react';
import MoviesTile from './MoviesTile';

function MoviesContainer({  updatedMoviesForGenre, selectedGenre, selectedRuntime, updatedMoviesForTime, search }) {

        if (!selectedRuntime || selectedRuntime === 'beef') {

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
                <h1>Popular This Week</h1>
                {allMoviesForGenre}
            </div>
        )
    
    } else if (selectedRuntime) {

        const filteredByRuntime = updatedMoviesForTime.filter((movie) => {
            if (selectedRuntime === 'short') {
                return movie.runtime < 90 && movie.title.toLowerCase().includes(search.toLowerCase())
              } else if (selectedRuntime === 'medium') {
                return movie.runtime > 90 && movie.runtime < 100 && movie.title.toLowerCase().includes(search.toLowerCase())
              } else if (selectedRuntime === 'mediumish') {
                return movie.runtime > 100 && movie.runtime < 120 && movie.title.toLowerCase().includes(search.toLowerCase())
              } else if (selectedRuntime === 'long') {
                return movie.runtime > 120 && movie.title.toLowerCase().includes(search.toLowerCase())
              } else {
                return movie
              }
        })
    
        const allMoviesForRuntime = filteredByRuntime.map((movie) => {
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
                <h4 className="movies-container-header">Popular This Week</h4>
                {allMoviesForRuntime}
            </div>
        )
    }

}


export default MoviesContainer;