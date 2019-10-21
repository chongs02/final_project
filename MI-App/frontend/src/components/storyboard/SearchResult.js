import React, { useState } from "react";
import MovieInfo from "../contents/MovieInfo";

const SearchResult = ({ keyword, data }) => {
  // handleClick = key => {
  //   console.log(key.id, "is selected");
  //   return key;
  // };

  data = data.filter(title => {
    return title.movieNm.toLowerCase().indexOf(keyword) > -1;
  });

  return data.map((title, i) => {
    // const id = title.id;
    return (
      <MovieInfo
        title={title}
        key={title.id}
        // onClick={() => this.handleClick(id)}
      ></MovieInfo>
    );
  });
};

export default SearchResult;
