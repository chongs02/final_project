import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import { MovieDetailsInfo, MovieSearchInfo } from "./movieInfo";

import {
  StyledMovieList,
  StyledContent,
  StyledContentTitle
} from "./styleComponent";

const DailyMovie = props => {
  const [isDetails, setIsDetails] = useState(false);
  const [selected, setSelected] = useState([]);

  const { recentInfoLoaded, recentMovieInfo } = props;

  const handleClick = i => {
    setIsDetails(true);
    setSelected([recentMovieInfo[i]]);
  };

  useEffect(() => {
    return () => {
      setIsDetails(false);
    };
  }, []);

  const details = () => {
    return (
      <StyledContent>
        {selected.map(info => {
          return (
            <MovieDetailsInfo
              user={props.username}
              key={info.movieCd}
              movieCd={info.movieCd}
              info={info}
            />
          );
        })}
      </StyledContent>
    );
  };

  const moviePostercomponent = () => {
    return (
      <StyledContent>
        <StyledContentTitle>최신 개봉 영화</StyledContentTitle>
        <StyledMovieList>
          {recentMovieInfo.map((info, i) => {
            return (
              <MovieSearchInfo
                page={"/main"}
                key={i}
                info={info}
                user={props.user.username}
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
      <StyledContentTitle>최신 개봉 영화</StyledContentTitle>
      <div
        style={{
          display: "flex",
          height: "188.6px",
          margin: "30px 0px",
          paddingLeft: "20px"
        }}
      >
        Loading...
      </div>
    </StyledContent>
  );

  return (
    <div>
      <div>
        {isDetails ? (
          <Route exact path="/main/:title" component={details} />
        ) : (
          <div></div>
        )}
      </div>
      <div>{recentInfoLoaded ? moviePostercomponent() : noResult}</div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    recentMovieInfo: state.getMovieInfo.recentMovieInfo,
    recentInfoLoaded: state.getMovieInfo.recentInfoLoaded,
    user: state.auth.user
  };
};

export default connect(mapStateToProps)(DailyMovie);
