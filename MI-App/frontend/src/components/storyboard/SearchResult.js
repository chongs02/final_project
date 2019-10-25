import React, { useState, useEffect } from "react";
import { StyledMovieList } from "../contents/styleComponent";
import { connect } from "react-redux";
import { MovieDetailsInfo, MovieSearchInfo } from "../contents/movieInfo";

const SearchResult = props => {
  console.log(props);
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
    <div>
      {selected.map(info => {
        return (
          <MovieDetailsInfo
            key={info.movieCd}
            movieCd={info.movieCd}
            info={info}
          />
        );
      })}
    </div>
  );

  const search = (
    <div>
      <div style={{ color: "#c44569" }}>상위 검색 결과</div>
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
    </div>
  );

  return (
    <div style={{ flex: 1 }}>
      <div>{isDetails ? detail : search}</div>
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
