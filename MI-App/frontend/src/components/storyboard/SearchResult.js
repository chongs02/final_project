import React, { useState, useEffect } from "react";
import { Route, useHistory, useLocation, useParams } from "react-router-dom";
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

  // const history = useHistory();
  // const params = useParams();
  // const loc = useLocation();

  // console.log(history);
  // console.log(loc);

  const handleClick = i => {
    setIsDetails(true);
    setSelected([movieInfo[i]]);
  };

  useEffect(() => {
    return () => {
      setIsDetails(false);
    };
  }, [keyword]);

  const details = () => {
    return (
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

const mapStateToProps = state => {
  return {
    movieInfo: state.getMovieInfo.movieInfo,
    user: state.auth.user
  };
};

export default connect(mapStateToProps)(SearchResult);
