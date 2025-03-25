import React from "react";
import GptSearchBar from "./GptSearchBar";
import GptMovieSuggestions from "./GptMovieSuggestions";
import { BACK_IMG } from "../utils/constants";

const GptSearch = () => {
  return ( 
    <>
      <div className="fixed -z-10">
        <img src={BACK_IMG} alt="logo"/>
        </div>
       
    <div className=" ">
      <GptSearchBar/>
      <GptMovieSuggestions/>
    </div>
    </>
  );
};

export default GptSearch;
