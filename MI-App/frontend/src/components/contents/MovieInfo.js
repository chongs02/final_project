import React, { Component } from "react";

// 상세 정보 페이지 영화 상세 정보
class MovieInfo extends React.Component {
  render() {
    return <div>{this.props.title.movieNm}</div>;
  }
}

// 메인 페이지 영화 간단 정보
class MovieSimpleInfo extends Component {
  render() {
    return <div>{this.props.title.movieNm}</div>;
  }
}

// 서치 페이지 영화 요약 정보
class MovieSearchInfo extends Component {
  render() {
    return <div>{this.props.title.movieNm}</div>;
  }
}

export default MovieInfo;
