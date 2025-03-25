import React, { useRef } from "react";
import lang from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import client from "../utils/openai";
import { API_OPTIONS } from "../utils/constants";
import { addGptMoviesResults } from "../utils/gptSlice";




const GptSearchBar = () => {
    const dispatch = useDispatch();

    const langKey = useSelector(store => store.config.lang);
    const searchText = useRef(null);

   ///search movie in tmdb 
   const searchMovieTMDB = async (movie) =>{
    const data = await fetch (
        "https://api.themoviedb.org/3/search/movie?query="+
        movie +
        "&include_adult=false&language=en-US&page=1", API_OPTIONS
    );

    const json = await data.json()

    return json.results;
   
    };



    const handleGptSeachClick =async ()=>{
        console.log(searchText.current.value);
        //make an api call to GPT api and get movie results

        const gptQuery = "Act as a Movie Recommendation system and suggest some movies for the query: " 
        + searchText.current.value 
        + ". only give me names of 5 movies, comma seperated like the example result given ahead.Example Result: Sholey, Don, Court, Golmal, Gadar";

        const gptResults = await client.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
              
              { role: 'user', content: gptQuery},
            ],
          });
          console.log(gptResults.choices);

          if(!gptResults.choices){
            return null;
          }
          console.log(gptResults.choices?.[0]?.message?.content);
          //Munna Bhai M.B.B.S, 3 Idiots, Hera Pheri, Chhichhore, Andaz Apna Apna

          const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");

          //Munna Bhai M.B.B.S, 3 Idiots, Hera Pheri, Chhichhore, Andaz Apna Apna

          //for each movie i will search tmdb api
         const promiseArray = gptMovies.map(movie => searchMovieTMDB(movie));
         //returns 5 promises
         
         const tmdbResults = await Promise.all(promiseArray);
         //resolve all the promises and get the results
         console.log(tmdbResults);

         dispatch(addGptMoviesResults({movieNames: gptMovies, movieResults: tmdbResults}));
          

    };

  return (
    <div className=" pt-[35%] md:pt-[10%] flex justify-center">
      <form className="w-full md:w-1/2 bg-black grid grid-cols-12" onSubmit={(e)=>e.preventDefault()}>
        <input
        ref={searchText} 
        type="text" 
        className="p-4 m-4 col-span-9" 
        placeholder={lang[langKey].gptSearchPlaceholder} />
        <button className=" col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg"
        onClick={handleGptSeachClick}>
         {lang[langKey].search}
        </button>
      </form>
    </div>
  ); 
};


export default GptSearchBar;
