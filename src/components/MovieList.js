import React from 'react'
import MovieCard from './MovieCard';

const MovieList = ({title, movies}) => {


  return (

    <div className="px-6">
      <h1 className=" text-lg md:text-3xl py-4 text-white">{title}</h1>
    <div  className="flex overflow-x-scroll"
        style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
       }}> 
        <div className="flex">
            {(movies || []).map(movies=> <MovieCard key={movies.id} posterPath={movies.poster_path} />)}

        </div> 
    </div>
    </div>
  );
};

export default MovieList;
