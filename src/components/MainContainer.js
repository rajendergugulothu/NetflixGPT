import React from "react";
import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";

const MainContainer = () => {

    const movies = useSelector(store => store.movies?.nowPlayingMovies);

    if(!movies ||movies.length === 0) {
    return <p>Loading movies...</p>;}


    const mainMovie = movies[0]; //we only need one movie for display 
    const { original_title, overview, Id } = mainMovie;
    
  return (
    <div className="pt-[30%] bg-black md:pt-0">
      <VideoTitle title={original_title} overview={overview}/>
      <VideoBackground movieId={Id}/>
    </div>
  );
};

export default MainContainer;
