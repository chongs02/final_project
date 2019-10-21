import React, { useState } from "react";

import {
  MovieInfo,
  MovieSearchInfo,
  MovieSimpleInfo
} from "../contents/movieInfo";

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

  const detail = selected.map(info => {
    return <MovieInfo key={info.movieCd} movieCd={info.movieCd} info={info} />;
  });

  const search = data.map((info, i) => {
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
