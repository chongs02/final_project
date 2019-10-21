import React, { Component } from "react";

// 상세 정보 페이지 영화 상세 정보
export class MovieInfo extends React.Component {
  render() {
    return (
      <div>
        <p>{this.props.info.movieNm}</p>
        <p>{this.props.info.movieNmEn}</p>
        <p>{this.props.info.nations}</p>
        <p>{this.props.info.prdtStatNm}</p>
        <p>{this.props.info.genre}</p>
        <p>{this.props.info.directors}</p>
        <p>{this.props.info.showTm}</p>
        <p>{this.props.info.watchGradeNm.split(",")[0]}</p>
      </div>
    );
  }
}

// 메인 페이지 영화 간단 정보
export class MovieSimpleInfo extends Component {
  render() {
    return <div>{this.props.info.movieNm}</div>;
  }
}

// 서치 페이지 영화 요약 정보
export class MovieSearchInfo extends Component {
  render() {
    return <div onClick={this.props.onClick}>{this.props.info.movieNm}</div>;
  }
}
