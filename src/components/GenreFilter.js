import React from 'react';


function GenreFilter({  handleGenreChange }) {
    return (
<div className="genre-filter">
<select name="genre-filter" id="genre-filter" onChange={handleGenreChange}>
        <option value=''>Select Genre</option>
        <option value="Drama">Drama</option>
        <option value="Action">Action</option>
        <option value="Crime">Crime</option>
        <option value="Comedy">Comedy</option>
        <option value="Adventure">Adventure</option>
        <option value="Musical">Musical</option>
        <option value="Romance">Romance</option>
        <option value="Western">Western</option>
        <option value="Animation">Animation</option>
        <option value="Documentary">Documentary</option>
        <option value="Science Fiction">Sci-Fi</option>
        <option value="Thriller">Thriller</option>
        <option value="Fantasy">Fantasy</option>
        <option value="Horror">Horror</option>
      </select>
        </div>
    );
}

export default GenreFilter;