import React, { useState, useEffect } from "react";
import { StyledMovieList } from "../contents/styleComponent";

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

  useEffect(() => {
    return () => {
      setIsDetails(false);
    };
  }, [keyword]);

  const detail = (
    <div>
      {selected.map(info => {
        return (
          <MovieInfo key={info.movieCd} movieCd={info.movieCd} info={info} />
        );
      })}
    </div>
  );

  const search = (
    <div>
      <div>상위 검색 결과</div>
      <StyledMovieList>
        {data.map((info, i) => {
          return (
            <MovieSearchInfo
              key={info.movieCd}
              movieCd={info.movieCd}
              info={info}
              onClick={() => handleClick(i)}
            />
          );
        })}
      </StyledMovieList>
    </div>
  );

  return (
    <div style={{ height: "100%", top: "300px" }}>
      <div style={{ height: "10.5%" }} />
      <div>{isDetails ? detail : search}</div>
    </div>
  );
};

export default SearchResult;
