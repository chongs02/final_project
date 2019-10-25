import React, { Component } from "react";
import {
  StyledMovieInfo,
  StyledMovieSearch,
  StyledMoviePoster,
  StyledMovieTitle
} from "./styleComponent";
import axios from "axios";
import { tokenConfig } from "../../actions/auth";

// 메인 페이지 영화 간단 정보
export class MovieSimpleInfo extends Component {
  render() {
    const { info } = this.props;
    return (
      <div>
        <StyledMoviePoster
          src={info.poster}
          alt={info.movieNm}
          title={info.movieNm}
        />
        <StyledMovieTitle>{info.movieNm}</StyledMovieTitle>
      </div>
    );
  }
}
// django csrftoken
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export const seenMovie = async (user, watchedMovie) => {
  console.log(user);
  console.log(watchedMovie);
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  const body = { watchedMovie: watchedMovie };

  await axios.post("/api/profile/", body, config);
};

// 서치 페이지 영화 요약 정보
export class MovieSearchInfo extends Component {
  render() {
    const { info, user } = this.props;
    const value = info.movieCd;
    return (
      <React.Fragment>
        <StyledMovieSearch onClick={this.props.onClick}>
          <StyledMoviePoster
            src={info.poster}
            alt={info.movieNm}
            title={info.movieNm}
          />
          <StyledMovieTitle>{info.movieNm}</StyledMovieTitle>
        </StyledMovieSearch>
        <div>
          <button onClick={() => seenMovie(user, value)}>Seen</button>
          <button>Good</button>
          <button>Bad</button>
        </div>
      </React.Fragment>
    );
  }
}

// 상세 정보 페이지 영화 상세 정보
export class MovieDetailsInfo extends Component {
  render() {
    const { info } = this.props;
    return (
      <StyledMovieInfo>
        <img src={info.poster} alt={info.movieNm} title={info.movieNm} />
        <p>{info.movieNm}</p>
        <p>{info.movieNmEn}</p>
        <p>{info.nations}</p>
        <p>{info.prdtStatNm}</p>
        <p>{info.genre}</p>
        <p>{info.directors}</p>
        <p>{info.showTm}</p>
        <p>{info.watchGradeNm.split(",")[0]}</p>
      </StyledMovieInfo>
    );
  }
}
