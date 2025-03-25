import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {

  const movies = useSelector(store => store.movies);

  return (
    movies.nowPlayingMovies&&(
    <div className=" bg-black">
      <div className="mt-0 md:-mt-52 p1-12 relative z-20">
      <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies}/>
      <MovieList title={"Top Rated"} movies={movies.topRated}/>
      <MovieList title={"Upcoming Movies"} movies={movies.UpcomingMovies}/>
      <MovieList title={"Popular"} movies={movies.popularMovies}/>
      <MovieList title={"Everyone's Watching"} movies={movies.nowPlayingMovies}/>
      </div>
    </div>
    )
  );
};

export default SecondaryContainer;


{/* 
      
      movielist- popular
        moviecard*n
      movieloist-now playing
      movielist-trending
      movielist-horror
      */}
