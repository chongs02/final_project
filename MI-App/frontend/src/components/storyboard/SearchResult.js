import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";

import { MovieDetailsInfo, MovieSearchInfo } from "../contents/movieInfo";

import {
  StyledMovieList,
  StyledContent,
  StyledContentTitle
} from "../contents/styleComponent";

const SearchResult = props => {
  const [isDetails, setIsDetails] = useState(false);
  const [selected, setSelected] = useState([]);
  const movieInfo = useSelector(state => state.getMovieInfo.movieInfo);
  const collaboToDetail = useSelector(
    state => state.getMovieInfo.collaboToDetail
  );

  const { keyword } = props;

  const handleClick = i => {
    setIsDetails(true);
    setSelected([movieInfo[i]]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (collaboToDetail) {
      setSelected(collaboToDetail);
      setIsDetails(true);
    }
    return () => {
      setIsDetails(false);
      setSelected([]);
    };
  }, [keyword, collaboToDetail]);

  const details = props => {
    return (
      <StyledContent>
        {selected.map(info => {
          return (
            <MovieDetailsInfo
              key={info.movieCd}
              movieCd={info.movieCd}
              info={info}
              from={props.location.pathname}
            />
          );
        })}
      </StyledContent>
    );
  };

  const search = () => {
    return (
      <StyledContent>
        <StyledContentTitle>상위 검색 결과</StyledContentTitle>
        <StyledMovieList>
          {movieInfo.map((info, i) => {
            return (
              <MovieSearchInfo
                page={"/search"}
                key={i}
                info={info}
                onClick={() => handleClick(i)}
              />
            );
          })}
        </StyledMovieList>
      </StyledContent>
    );
  };

  const noResult = (
    <StyledContent>
      <StyledContentTitle>상위 검색 결과</StyledContentTitle>
      <div
        style={{
          display: "flex",
          height: "188.6px",
          margin: "30px 0px",
          paddingLeft: "20px"
        }}
      >
        검색 결과가 없습니다
      </div>
    </StyledContent>
  );

  return (
    <div style={{ flex: 1 }}>
      {isDetails ? (
        <Route exact path="/search/:title" component={details} />
      ) : (
        <div />
      )}
      {keyword && keyword !== " " ? (
        <div>{movieInfo.length > 0 ? search() : noResult}</div>
      ) : (
        noResult
      )}
    </div>
  );
};

export default SearchResult;
