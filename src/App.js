import React, { useState,useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setmovies] = useState([]);
  const [isLoading,setIsloading]=useState(false);
  const[error,seterror]=useState(null);

  const moviesHandler=useCallback(async () => {

    setIsloading(true);
    seterror(null);
    try{
      const response=await fetch("https://swapi.dev/api/films");
      if(!response.ok){
        throw new Error("Something went wrong!");
      }
      const data=await response.json();
      const transformedMovies = data.results.map((movieData) => {
              return {
                id: movieData.episode_id,
                title: movieData.title,
                openingText: movieData.opening_crawl,
                releaseDate: movieData.release_date,
             };
            });
            setmovies(transformedMovies);
            
          }
    
      catch(error){
        seterror(error.message);
      }
      setIsloading(false);

  },[]);
    
   useEffect(()=>{
    moviesHandler();
   },[moviesHandler]) 
    
           
  // const moviesHandler = () => {
  //   fetch("https://swapi.dev/api/films")
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       const transformedMovies = data.results.map((movieData) => {
  //         return {
  //           id: movieData.episode_id,
  //           title: movieData.title,
  //           openingText: movieData.opening_crawl,
  //           releaseDate: movieData.release_date,
  //         };
  //       });
  //           setmovies(transformedMovies);
  //     });
  // };
  let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={moviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
        {/* {!isloading && movies.length > 0 && <MoviesList movies={movies} />}
        {isloading && <p>Loading...</p>}
        {!isloading && movies.length===0 && !error && <p>Found no movies.</p> }
        {!isloading && error && <p><b>{error}</b></p>} */}
      </section>
    </React.Fragment>
  );
}

export default App;
