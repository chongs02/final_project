import React, { Component, useState, memo } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

import EmotionGraph from "./graph";

import {
  StyledMovieInfo,
  StyledContentHover,
  StyledMovieSearch,
  StyledMoviePoster,
  StyledMovieDetailPoster,
  StyledMovieTitle,
  StyledMovieButton,
  StyledMovieIcon,
  StyledContentTitle,
  StyledH5
} from "./styleComponent";
// import { tokenConfig } from "../../actions/auth";

import { Icon } from "react-icons-kit";
import { check } from "react-icons-kit/fa/check";
import { heart } from "react-icons-kit/fa/heart";
import { heartO } from "react-icons-kit/fa/heartO";
// import { u1F611 } from "react-icons-kit/noto_emoji_regular/u1F611";
import { u1F608 } from "react-icons-kit/noto_emoji_regular/u1F608";

// django csrftoken
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export const getConfig = () => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  return config;
};

const seenMovie = async watchedMovie => {
  const config = getConfig();
  const body = { watchedMovie: watchedMovie };

  await axios.post("/api/profile/", body, config);
};

const likeMovie = async like => {
  const config = getConfig();
  const body = { like: like };

  await axios.post("/api/profile/", body, config);
};

const hateMovie = async hate => {
  const config = getConfig();
  const body = { hate: hate };

  await axios.post("/api/profile/", body, config);
};

// 검색 페이지 영화 요약 정보
export class MovieSearchInfo extends Component {
  render() {
    const { info } = this.props;
    const { page } = this.props;
    const url = page + "/datails";

    return (
      <StyledContentHover>
        <StyledMovieSearch onClick={this.props.onClick}>
          <Link to={url} style={{ color: "inherit", textDecoration: "none" }}>
            <StyledMoviePoster
              src={info.poster}
              alt={info.movieNm}
              title={info.movieNm}
            />
            <StyledMovieTitle>{info.movieNm}</StyledMovieTitle>
          </Link>
        </StyledMovieSearch>

        <MovieStatusButtons data={this.props} size={20} />
      </StyledContentHover>
    );
  }
}

// 상세 정보 페이지 영화 상세 정보

export class MovieDetailsInfo extends Component {
  render() {
    const { info } = this.props;
    const openDt = info.openDt.toString().substring(0, 4);
    const actors = info.actors
      .replace(/['"]+/g, "")
      .replace(/[\[\]']+/g, "", "");

    return (
      <div>
        <StyledContentTitle>영화 상세 정보</StyledContentTitle>
        <StyledMovieInfo>
          <div style={{ width: "100%", margin: "5%" }}>
            <div
              style={{
                display: "flex",
                height: "50%",
                paddingBottom: "20px",
                borderBottom: "1px solid rgba(37, 40, 47, 0.1)"
              }}
            >
              <div
                style={{
                  width: "150px",
                  height: "100%",
                  marginRight: "5%"
                }}
              >
                <StyledMovieDetailPoster
                  src={info.poster}
                  alt={info.movieNm}
                  title={info.movieNm}
                />
              </div>
              <div
                style={{
                  height: "100%",
                  marginRight: "30px"
                }}
              >
                <div
                  style={{
                    display: "flex",
                    textAlign: "bottom",
                    width: "100%"
                  }}
                >
                  <h1
                    style={{
                      margin: "0px",
                      fontFamily: "nanumB",
                      alignSelf: "flex-end"
                    }}
                  >
                    {info.movieNm}
                  </h1>
                </div>
                <p
                  style={{ color: "#57606f", margin: "0px", marginTop: "5px" }}
                >
                  {openDt}&nbsp;・&nbsp;{info.nations}
                </p>
                {/* <p>{info.prdtStatNm}</p> */}
                <p
                  style={{ color: "#57606f", margin: "0px", marginTop: "2px" }}
                >
                  {info.genre}
                </p>
                <div
                  style={{
                    width: "120px",
                    marginTop: "20px"
                  }}
                >
                  <MovieStatusButtons data={this.props} size={30} />
                </div>
                <h1
                  style={{
                    height: "100%",
                    display: "flex",
                    marginBottom: "0px",
                    alignSelf: "flex-end"
                  }}
                >
                  ⭐{info.userRating}
                </h1>
              </div>
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  paddingBottom: "20px",
                  borderBottom: "1px solid rgba(37, 40, 47, 0.1)"
                }}
              >
                <div style={{ width: "50%" }}>
                  <h3
                    style={{
                      fontFamily: "nanumB",
                      margin: "0px",
                      marginTop: "20px",
                      marginBottom: "10px"
                    }}
                  >
                    기본 정보
                  </h3>
                  <div style={{}}>
                    <div style={{ margin: "0px", marginBottom: "10px" }}>
                      <h4
                        style={{
                          color: "#57606f",
                          margin: "0"
                        }}
                      >
                        {info.movieNmEn}
                      </h4>
                      <StyledH5>
                        {openDt}&nbsp;・&nbsp;{info.nations}&nbsp;・&nbsp;
                        {info.repGenre}
                      </StyledH5>
                      <StyledH5>
                        {info.showTm ? `${info.showTm}분` : ""}
                      </StyledH5>
                      <StyledH5>{info.watchGradeNm.split(",")[0]}</StyledH5>
                    </div>
                    <StyledH5>
                      1999년 이 영화는 어쩌구 저쩌구 이러쿵 저러쿵 샤바리샤바
                    </StyledH5>
                  </div>
                </div>
                <div
                  style={{
                    marginTop: "20px",
                    width: "50%"
                  }}
                >
                  <EmotionGraph movieCd={info.movieCd}></EmotionGraph>
                </div>
              </div>
              <div>
                <h3
                  style={{
                    fontFamily: "nanumB",
                    margin: "0px",
                    marginTop: "20px",
                    marginBottom: "10px"
                  }}
                >
                  감독/배우
                </h3>
                <StyledH5>감독 - {info.directors}</StyledH5>
                <StyledH5>배우 - {actors}</StyledH5>
              </div>
            </div>
          </div>
        </StyledMovieInfo>
      </div>
    );
  }
}

let MovieStatusButtons = memo(props => {
  const profile = props.profile;
  const { info } = props.data;
  const value = info.movieCd;

  let initialSeen;
  let initialLike;
  let initialHate;

  if (profile && profile !== []) {
    for (let i = 0; i < profile.length; i++) {
      if (value === profile[i].watchedMovie) {
        initialSeen = true;
      }
      if (value === profile[i].like) {
        initialLike = true;
      }
      if (value === profile[i].hate) {
        initialHate = true;
      }
    }
  }

  const [isSeen, setIsSeen] = useState(initialSeen);
  const [isLike, setIsLike] = useState(initialLike);
  const [isHate, setIsHate] = useState(initialHate);

  const handleClick = typeOfButton => {
    if (typeOfButton === "isSeen") {
      setIsSeen(!isSeen);
    } else if (typeOfButton === "isLike") {
      setIsLike(!isLike);
      setIsHate(false);
    } else {
      setIsLike(false);
      setIsHate(!isHate);
    }
  };

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
          handleClick("isSeen");
          seenMovie(value);
        }}
      >
        <StyledMovieIcon color={isSeen ? "black" : "rgba(113, 128, 147, 0.2)"}>
          <Icon size={props.size} icon={check} />
        </StyledMovieIcon>
      </StyledMovieButton>
      <StyledMovieButton
        title={"좋아요"}
        onClick={() => {
          handleClick("isLike");
          likeMovie(value);
        }}
      >
        <StyledMovieIcon
          color={isLike ? "#eb3b5a" : "rgba(113, 128, 147, 0.2)"}
        >
          <Icon size={props.size} icon={isLike ? heart : heartO} />
        </StyledMovieIcon>
      </StyledMovieButton>
      <StyledMovieButton
        title={"별로에요"}
        onClick={() => {
          handleClick("isHate");
          hateMovie(value);
        }}
      >
        <StyledMovieIcon
          color={isHate ? "rgba(6, 82, 221, 0.8)" : "rgba(113, 128, 147, 0.2)"}
        >
          <Icon size={props.size + 7} icon={u1F608} />
        </StyledMovieIcon>
      </StyledMovieButton>
    </div>
  );
});

const mapStateToProps = state => {
  return {
    profile: state.auth.profile
    // profileLoading: state.auth.profileLoading,
  };
};

MovieStatusButtons = connect(mapStateToProps)(MovieStatusButtons);
