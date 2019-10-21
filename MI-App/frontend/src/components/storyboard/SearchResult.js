import React, { useState } from "react";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";

import {
  MovieInfo,
  MovieSearchInfo,
  MovieSimpleInfo
} from "../contents/movieInfo";
import MovieDetails from "./movieDetails";

const SearchResult = ({ keyword, data }) => {
  const [isDetails, setIsDetails] = useState(false);
  const [selected, setSelected] = useState([]);

  const handleClick = i => {
    setIsDetails(true);
    setSelected([data[i]]);
  };

  data = data.filter(info => {
    return info.movieNm.toLowerCase().indexOf(keyword) > -1;
  });

  const detail = (
    <div>
      {isDetails ? (
        selected.map(info => {
          console.log(info);
          return (
            <MovieInfo key={info.movieCd} movieCd={info.movieCd} info={info} />
          );
        })
      ) : (
        <div></div>
      )}
    </div>
  );

  const search = data.map((info, i) => {
    console.log(data);
    return (
      <MovieSearchInfo
        key={info.movieCd}
        movieCd={info.movieCd}
        info={info}
        onClick={() => handleClick(i)}
      />
    );
  });

  return <div>{isDetails ? detail : search}</div>;
};

export default SearchResult;
