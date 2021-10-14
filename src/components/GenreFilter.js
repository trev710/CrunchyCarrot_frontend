import React from 'react';


function GenreFilter({  handleGenreChange, selectedGenre }) {
    return (
        <div className="filter">
        <select name="filter" id="filter" onChange={handleGenreChange}>
        <option value=''>Select Genre</option>
        <option value="Drama">Drama</option>
        <option value="Action">Action</option>
        <option value="Crime">Crime</option>
        <option value="Comedy">Comedy</option>
        <option value="Adventure">Adventure</option>
        <option value="Musical">Musical</option>
        <option value="Romance">Romance</option>
        <option value="Western">Western</option>
        <option value="Science Fiction">Science Fiction</option>
        <option value="Thriller">Thriller</option>
        <option value="Fantasy">Fantasy</option>
        <option value="Horror">Horror</option>
      </select>
        </div>
    );
}

export default GenreFilter;