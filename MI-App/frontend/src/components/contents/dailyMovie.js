import React from "react";
import { connect } from "react-redux";
import {
  StyledMovieSearch,
  StyledMoviePoster,
  StyledMovieTitle,
  StyledMovieList
} from "./styleComponent";

const DailyMovie = props => {
  const moviePostercomponent = () => {
    const movieInfo = props.movieInfo;
    return (
      <React.Fragment>
        {movieInfo.map(item => {
          return (
            <div>
              <StyledMoviePoster
                src={item[0].poster}
                alt={item[0].movieNm}
                title={item[0].movieCd}
              />
              <StyledMovieTitle>{item[0].movieNm}</StyledMovieTitle>
            </div>
          );
        })}
      </React.Fragment>
    );
  };

  return <div>{props.InfoLoaded ? moviePostercomponent() : "ready"}</div>;
};
//
const mapStateToProps = state => {
  return {
    movieInfo: state.getMovieInfo.movieInfo,
    InfoLoaded: state.getMovieInfo.InfoLoaded
  };
};
export default connect(mapStateToProps)(DailyMovie);
