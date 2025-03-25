
import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRated from "../hooks/useTopRated";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import GptSearch from "./GptSearch";
import { useSelector } from "react-redux";

const Browse = () => {
  const showGptSearch = useSelector(store => store.gpt.showGptSearch);

useNowPlayingMovies();
usePopularMovies();
useTopRated();
useUpcomingMovies();
//fetching and updating the store

  return (
    <div>
      <Header/>
      {
        showGptSearch?( <GptSearch/> ) : (
          <>
          <MainContainer/>
          <SecondaryContainer/>
          </>
        )}
      
      
      {/* 
      
      main container
      -video background
      -video title

      secondary container
      --movie lists*n
      --cards *n
      
      
      
      */}
    </div>
  );
};

export default Browse;


