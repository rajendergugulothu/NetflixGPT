import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTopRated } from "../utils/moviesSlice";
import { useEffect } from "react";



const useTopRated = ()=> {

   //fetching the data from tmdb api and pushing it into store
    const dispatch = useDispatch();
    
    
    const getTopRated = async ()=>{
      const data = await fetch("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1", API_OPTIONS);
      const json = await data.json();
      
      dispatch(addTopRated(json.results));
    };
  
    useEffect(()=>{
     getTopRated();
  
    },[]);
}


export default useTopRated;