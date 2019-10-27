import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { MovieDetailsInfo, MovieSearchInfo } from "../contents/movieInfo";

import {
  StyledMovieList,
  StyledContent,
  StyledContentTitle
} from "../contents/styleComponent";

const SearchResult = props => {
  const [isDetails, setIsDetails] = useState(false);
  const [selected, setSelected] = useState([]);

  const { keyword, movieInfo } = props;

  const handleClick = i => {
    setIsDetails(true);
    setSelected([props.movieInfo[i]]);
  };

  useEffect(() => {
    return () => {
      setIsDetails(false);
    };
  }, [keyword]);

  const detail = (
    <StyledContent>
      {selected.map(info => {
        return (
          <MovieDetailsInfo
            key={info.movieCd}
            movieCd={info.movieCd}
            info={info}
          />
        );
      })}
    </StyledContent>
  );

  const search = (
    <StyledContent>
      <StyledContentTitle>상위 검색 결과</StyledContentTitle>
      <StyledMovieList>
        {movieInfo.map((info, i) => {
          return (
            <MovieSearchInfo
              key={info.movieCd}
              movieCd={info.movieCd}
              info={info}
              user={props.user.username}
              onClick={() => handleClick(i)}
            />
          );
        })}
      </StyledMovieList>
    </StyledContent>
  );

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
      {keyword ? (
        <div>
          {movieInfo.length > 0 ? (
            <div>{isDetails ? detail : search}</div>
          ) : (
            noResult
          )}
        </div>
      ) : (
        noResult
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    movieInfo: state.getMovieInfo.movieInfo,
    user: state.auth.user
  };
};

export default connect(
  mapStateToProps,
  {}
)(SearchResult);
