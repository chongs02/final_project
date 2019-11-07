import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "react-spinner-material";

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
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    setIsDetails(false);
  }, [props.isUnMount]);

  const details = props => {
    console.log(props);
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
          paddingLeft: "20px",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Spinner
          size={40}
          spinnerColor={"#7758f5"}
          spinnerWidth={2}
          visible={true}
        />
      </div>
    </StyledContent>
  );

  return (
    <div>
      {props.isUnMount ? (
        <div />
      ) : (
        <div>
          {isDetails ? (
            <Route exact path="/main/:title" component={details} />
          ) : (
            <div></div>
          )}
          <div>{recentInfoLoaded ? moviePostercomponent() : noResult}</div>
        </div>
      )}
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
