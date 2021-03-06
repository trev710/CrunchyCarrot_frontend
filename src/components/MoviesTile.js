import React from 'react';
import { Link } from 'react-router-dom';


function MoviesTile({ id, title, genre, runtime, tagline, release_year, image }) {
    

    return (
        <div classname="movie-tile">
            <h1 className="tile-title">{title}</h1>
            <img style={{height: "200px"}} src={image} alt={id}></img>
            <h4 className="tile-genre">{genre}</h4>
            {/* <h4>{release_year}</h4> */}
            <h4 className="tile-runtime">Runtime: {runtime} minutes</h4>
            <h5 className="tile-tagline">{tagline}</h5>
            <Link to={`/movies/${id}`}>
                Reviews For This Movie
            </Link>
        </div>
    )
}


export default MoviesTile; 