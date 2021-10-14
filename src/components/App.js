// import logo from './logo.svg';
// import './App.css';
import React, { useState, useEffect } from 'react';


function App() {
  const [moviesState, setMoviesState] = useState([])

  useEffect(() => {
    fetch('http://localhost:3001/movies')
    .then(response => response.json())
    .then(data => setMoviesState(data));
  }, [])

  console.log(moviesState)

  return (
    <div className="App">
      <header className="App-header">
      <h2>Howdy from the frontend</h2>
        <p>Edit <code>CrunchyCarrot_frontend/src/App.js</code> and save to reload.</p>
        
      </header>
    </div>
  );
}

export default App;
