import React from "react";
import { connect } from "react-redux";
import {
  StyledMoviePoster,
  StyledMovieTitle,
  StyledMovieList
} from "./styleComponent";

const DailyMovie = props => {
  const moviePostercomponent = () => {
    return (
      <StyledMovieList>
        {props.recentMovieInfo.map((item, i) => {
          return (
            <div key={i}>
              <StyledMoviePoster
                src={item[0].poster}
                alt={item[0].movieNm}
                title={item[0].movieCd}
              />
              <StyledMovieTitle>{item[0].movieNm}</StyledMovieTitle>
            </div>
          );
        })}
      </StyledMovieList>
    );
  };

  return (
    <React.Fragment>
      <div>{props.recentInfoLoaded ? moviePostercomponent() : "ready"}</div>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    recentMovieInfo: state.getMovieInfo.recentMovieInfo,
    recentInfoLoaded: state.getMovieInfo.recentInfoLoaded
  };
};
export default connect(mapStateToProps)(DailyMovie);
