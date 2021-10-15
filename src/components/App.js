import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from "./Header";
import UserProfile from './UserProfile';
import RuntimeFilter from "./RuntimeFilter.js";
import GenreFilter from "./GenreFilter.js";
import MoviesContainer from "./MoviesContainer";
import Search from "./Search";
import Login from './Login';
import SignUp from './SignUp';
import MoviePage from './MoviePage';


function App() {
  const [moviesState, setMoviesState] = useState([])
  const [reviews, setReviews] = useState([])
  const [currentUser, setCurrentUser] = useState(null)
  const [search, setSearch] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("")
  const [selectedRuntime, setSelectedRuntime] = useState(null)


  //   function onAddReview(newReview) {
//     setReviews([...reviews, newReview])
// }

  function handleGenreChange(e) {
    setSelectedGenre(e.target.value)
  }

  function handleRuntimeChange(e) {
    setSelectedRuntime(e.target.value)
  }

  useEffect(() => {
    fetch('http://localhost:3001/movies')
    .then(response => response.json())
    .then(data => setMoviesState(data));
  }, [])

  useEffect(() => {
    fetch('http://localhost:3001/reviews')
    .then(response => response.json())
    .then(data => setReviews(data));
  }, [])


  const updatedMovies = moviesState.filter((movie) => {
    return movie.title.toLowerCase().includes(search.toLowerCase())
  })

  // if (selectedRuntime) {
  //   moviesState.filter((movie) => {
  //     return movie.runtime
  //   })


  return (
    <div className="App">
      <Router>
      <Header currentUser={currentUser} resetCurrentUser={setCurrentUser} />
        <Switch>
          <Route path='/signup'>
          <SignUp setCurrentUser={setCurrentUser} />
          </Route>
          <Route path='/login'>
          <Login setCurrentUser={setCurrentUser} />
          </Route>
          <Route exact path='/'>
            {currentUser ? (
              <>
             <Search search={search} setSearch={setSearch} currentUser={currentUser}  />
             <GenreFilter handleGenreChange={handleGenreChange} selectedGenre={selectedGenre}  />
             <RuntimeFilter handleRuntimeChange={handleRuntimeChange} />
            <MoviesContainer updatedMovies={updatedMovies} selectedGenre={selectedGenre}  />
            </>
            )
            :
            <h1>Please Login or Signup to View</h1>
            }
          </Route>
          <Route path='/profile'>
            {currentUser ? (
              <UserProfile currentUser={currentUser} setCurrentUser={setCurrentUser} reviews={reviews} />
            )
            : 
            <h1>Please Login or Signup to View</h1>
            }
          </Route>
          <Route path='/movies/:id'>
            {currentUser ? (
            <MoviePage currentUser={currentUser} reviews={reviews} setReviews={setReviews} />
            )
            :
            <h1>Please Login or Signup to View</h1>
          }
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;