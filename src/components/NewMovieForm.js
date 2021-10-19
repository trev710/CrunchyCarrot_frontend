import React, { useState } from 'react';
import { useHistory } from "react-router-dom";


function NewMovieForm({ onAddMovieToList }) {
    const [newMovieTitle, setNewMovieTitle] = useState("")
    const [newMovieRuntime, setNewMovieRuntime] = useState("")
    const [newMovieImage, setNewMovieImage] = useState("")
    const [newMovieGenre, setNewMovieGenre] = useState("")
    const [newMovieReleaseYear, setNewMovieReleaseYear] = useState("")
    const [newMovieTagline, setNewMovieTagline] = useState("")
    const [newMovieOverview, setNewMovieOverview] = useState("")
    // rating should be defaulted to one

    const  history = useHistory()


    function handleSubmit(e) {
        e.preventDefault()
        const newMovieToPost = {
            title: newMovieTitle,
            genre: newMovieGenre,
            runtime: newMovieRuntime,
            tagline: newMovieTagline,
            overview: newMovieOverview,
            release_year: newMovieReleaseYear,
            image: newMovieImage,
            rating: 1
        }

        fetch('http://localhost:3001/movies', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newMovieToPost)
        })
        .then((r) => r.json())
        .then(data => {
            onAddMovieToList(data)
            history.push(`/movies/${data.id}`);
        })

        e.target.reset()
    }


    return (    
        <div className='new-movie-form'>
            <h3>Add your favorite movies to Crunchy Carrots here!</h3>
            <form className='new-movie-form-input' onSubmit={handleSubmit}>

{/* <label htmlFor="title">Title</label> */}
<input className='new-movie-form-input' type="text" id="title" value={newMovieTitle} placeholder="Title" onChange={(e) => setNewMovieTitle(e.target.value)} />
<br></br>
{/* <label htmlFor="genre">Genre</label> */}
            <select id="genre" value={newMovieGenre} onChange={(e) => setNewMovieGenre(e.target.value)}>
                <option value=''>Select Genre</option>
                <option value="drama">Drama</option>
                <option value="action">Action</option>
                <option value="comedy">Comedy</option>
                <option value="crime">Crime</option>
                <option value="adventure">Adventure</option>
                <option value="musical">Musical</option>
                <option value="romance">Romance</option>
                <option value="western">Western</option>
                <option value="documentary">Documentary</option>
                <option value="Animation">Anime</option>
                <option value="sciene-fiction">Sci-fi</option>
                <option value="thriller">Thriller</option>
                <option value="fantasy">Fantasy</option>
                <option value="horror">Horror</option>
            </select>

            <br></br>
            {/* <label htmlFor="avatar">Poster Image URL</label> */}
            <input type="text" id="image" value={newMovieImage} placeholder="Poster Image" onChange={(e) => setNewMovieImage(e.target.value)}/>
            <br></br>
            {/* <label htmlFor="avatar">Runtime</label> */}
            <input type="text" id="runtime" value={newMovieRuntime} placeholder="Runtime (in minutes)" onChange={(e) => setNewMovieRuntime(e.target.value)}/>
            <br></br>
            {/* <label htmlFor="avatar">Release Year</label> */}
            <input type="text" id="text" value={newMovieReleaseYear} placeholder="Release Year" onChange={(e) => setNewMovieReleaseYear(e.target.value)}/>
            <br></br>
            {/* <label htmlFor="avatar">Tagline</label> */}
            <input type="text" id="tagline" value={newMovieTagline} placeholder="Tagline" onChange={(e) => setNewMovieTagline(e.target.value)}/>
            <br></br>
            {/* <label htmlFor="avatar">Overview</label> */}
            <input type="text" id="overview" value={newMovieOverview} placeholder="Overview" onChange={(e) => setNewMovieOverview(e.target.value)}/>
            <br></br>
            <input className="submit-new-movie-btn" type="submit" value="Submit New Movie" />
        </form>
    </div>
    )
}


export default NewMovieForm; 