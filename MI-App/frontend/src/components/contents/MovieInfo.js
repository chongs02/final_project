import React, { Component } from "react";
import { StyledMovieInfo, StyledMovieSearch } from "./styleComponent";

// 메인 페이지 영화 간단 정보
export class MovieSimpleInfo extends Component {
  render() {
    const { info } = this.props;
    return (
      <div>
        <img src={info.poster} alt={info.movieNm} title={info.movieCd} />
        <p>{info.movieNm}</p>
      </div>
    );
  }
}

// 서치 페이지 영화 요약 정보
export class MovieSearchInfo extends Component {
  render() {
    const { info } = this.props;
    return (
      <StyledMovieSearch onClick={this.props.onClick}>
        <img
          style={{
            display: "flex",
            margin: "0 auto"
          }}
          src={info.poster}
          alt={info.movieNm}
          title={info.movieCd}
        />
        <p
          style={{ textAlign: "center", margin: "10px", wordBreak: "keep-all" }}
        >
          {info.movieNm}
        </p>
      </StyledMovieSearch>
    );
  }
}

// 상세 정보 페이지 영화 상세 정보
export class MovieInfo extends React.Component {
  render() {
    const { info } = this.props;
    return (
      <StyledMovieInfo>
        <img src={info.poster} alt={info.movieNm} title={info.movieCd} />
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
