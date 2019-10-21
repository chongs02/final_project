import React from "react";
import MovieInfo from "../contents/movieInfo";

const SearchResult = ({ keyword, data }) => {
  data = data.filter(title => {
    return title.movieNm.toLowerCase().indexOf(keyword) > -1;
  });

  return data.map((title, i) => {
    return <MovieInfo title={title} key={title.id}></MovieInfo>;
  });
};

export default SearchResult;
