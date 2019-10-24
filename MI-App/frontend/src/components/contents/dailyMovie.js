import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  StyledMoviePoster,
  StyledMovieTitle,
  StyledMovieList,
  StyledMovieSearch
} from "./styleComponent";
import { MovieInfo } from "./movieInfo";

const DailyMovie = props => {
  console.log(props);
  const [isDetails, setIsDetails] = useState(false);
  const [selected, setSelected] = useState([]);

  const handleClick = i => {
    setIsDetails(true);
    setSelected([props.recentMovieInfo[i]]);
  };

  useEffect(() => {
    return () => {
      setIsDetails(false);
    };
  }, []);

  const detail = (
    <div>
      {selected.map(info => {
        return (
          <MovieInfo key={info.movieCd} movieCd={info.movieCd} info={info} />
        );
      })}
    </div>
  );

  const moviePostercomponent = () => {
    return (
      <StyledMovieList>
        {props.recentMovieInfo.map((item, i) => {
          // console.log(props);
          return (
            <StyledMovieSearch key={i} onClick={() => handleClick(i)}>
              <StyledMoviePoster
                src={item.poster}
                alt={item.movieNm}
                title={item.movieCd}
              />
              <StyledMovieTitle>{item.movieNm}</StyledMovieTitle>
            </StyledMovieSearch>
          );
        })}
      </StyledMovieList>
    );
  };

  return (
    <React.Fragment>
      <div style={{ flex: 1 }}>
        <div>{isDetails ? detail : <div></div>}</div>

        <div>{props.recentInfoLoaded ? moviePostercomponent() : "ready"}</div>
      </div>
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
