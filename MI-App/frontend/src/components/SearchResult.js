import React, { useState } from "react";
import MovieInfo from "./MovieInfo";

const SearchResult = ({ keyword, data }) => {
  // const handleClick = key => {
  //   console.log(key.id);
  //   return key.id;
  // };

  data = data.filter(title => {
    return title.movieNm.indexOf(keyword) > -1;
  });

  return data.map((title, i) => {
    return (
      <MovieInfo
        title={title}
        key={title.id}
        // onClick={() => this.handleClick(title)}
      ></MovieInfo>
    );
  });
};

export default SearchResult;
