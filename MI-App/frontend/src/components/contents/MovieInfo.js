import React, { Component, Fragment } from "react";
import {
  StyledMovieInfo,
  StyledMovieSearch,
  StyledMoviePoster,
  StyledMovieTitle,
  StyledMovieButton,
  StyledMovieIcon
} from "./styleComponent";
import axios from "axios";
import { tokenConfig } from "../../actions/auth";

import { Icon } from "react-icons-kit";
import { check } from "react-icons-kit/fa/check";
import { heart } from "react-icons-kit/fa/heart";
import { heartO } from "react-icons-kit/fa/heartO";
import { u1F611 } from "react-icons-kit/noto_emoji_regular/u1F611";
import { u1F608 } from "react-icons-kit/noto_emoji_regular/u1F608";

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

export const seenMovie = async watchedMovie => {
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

    return (
      <Fragment>
        <div>
          <StyledMovieSearch onClick={this.props.onClick}>
            <StyledMoviePoster
              src={info.poster}
              alt={info.movieNm}
              title={info.movieNm}
            />
            <StyledMovieTitle>{info.movieNm}</StyledMovieTitle>
          </StyledMovieSearch>
          <MovieStatusButtons data={this.props} />
        </div>
      </Fragment>
    );
  }
}

// 상세 정보 페이지 영화 상세 정보
export class MovieDetailsInfo extends Component {
  render() {
    const { info } = this.props;
    return (
      <StyledMovieInfo>
        <div>
          <img src={info.poster} alt={info.movieNm} title={info.movieNm} />
          <div>
            <p>{info.movieNm}</p>
            <p>{info.movieNmEn}</p>
            <p>{info.nations}</p>
            <p>{info.prdtStatNm}</p>
            <p>{info.genre}</p>
            <p>{info.directors}</p>
            <p>{info.showTm}</p>
            <p>{info.watchGradeNm.split(",")[0]}</p>
          </div>
        </div>
      </StyledMovieInfo>
    );
  }
}

export class MovieStatusButtons extends Component {
  state = {
    isSeen: false,
    isLike: false,
    isHate: false
  };

  handleClick = typeOfButton => {
    if (typeOfButton === "isSeen") {
      this.setState({
        isSeen: !this.state.isSeen
      });
    } else if (typeOfButton === "isLike") {
      this.setState({
        isLike: !this.state.isLike,
        isHate: false
      });
    } else {
      this.setState({
        isLike: false,
        isHate: !this.state.isHate
      });
    }
  };

  render() {
    const { info, user } = this.props.data;
    const value = info.movieCd;

    const { isSeen, isLike, isHate } = this.state;

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <StyledMovieButton
          title={"이미 봤어요"}
          onClick={() => {
            this.handleClick("isSeen");
            seenMovie(value);
          }}
        >
          <StyledMovieIcon
            color={isSeen ? "black" : "rgba(113, 128, 147, 0.2)"}
          >
            <Icon size={"20"} icon={check} />
          </StyledMovieIcon>
        </StyledMovieButton>
        <StyledMovieButton
          title={"좋아요"}
          onClick={() => {
            this.handleClick("isLike");
          }}
        >
          <StyledMovieIcon
            color={isLike ? "#eb3b5a" : "rgba(113, 128, 147, 0.2)"}
          >
            <Icon size={"20"} icon={isLike ? heart : heartO} />
          </StyledMovieIcon>
        </StyledMovieButton>
        <StyledMovieButton
          title={"별로에요"}
          onClick={() => {
            this.handleClick("isHate");
          }}
        >
          <StyledMovieIcon
            color={
              isHate ? "rgba(6, 82, 221, 0.8)" : "rgba(113, 128, 147, 0.2)"
            }
          >
            <Icon size={"27"} icon={u1F608} />
          </StyledMovieIcon>
        </StyledMovieButton>
      </div>
    );
  }
}
