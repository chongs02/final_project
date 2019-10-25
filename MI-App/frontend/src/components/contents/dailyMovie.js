import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { StyledMovieList } from "./styleComponent";
import { MovieDetailsInfo, MovieSearchInfo } from "./movieInfo";

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

  const detail = (
    <div>
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
    </div>
  );

  const moviePostercomponent = () => {
    return (
      <div>
        <div style={{ color: "#c44569" }}>최신 개봉 영화</div>
        <StyledMovieList>
          {recentMovieInfo.map((info, i) => {
            return (
              <MovieSearchInfo
                key={i}
                info={info}
                user={props.user.username}
                onClick={() => handleClick(i)}
              />
            );
          })}
        </StyledMovieList>
      </div>
    );
  };

  return (
    <React.Fragment>
      <div style={{ flex: 1 }}>
        <div>{isDetails ? detail : <div></div>}</div>
        <div>{recentInfoLoaded ? moviePostercomponent() : "ready"}</div>
      </div>
    </React.Fragment>
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
