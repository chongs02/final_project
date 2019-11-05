import React, { useState, useEffect, Fragment } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";

import { connect } from "react-redux";
import { movieInfo } from "../../actions/movieInfo";
import { loadUserProfile } from "../../actions/auth";

import Nav from "../contents/nav";
import SearchResult from "./searchResult";
import MyPage from "./myPage";
import Logout from "./logout";
import DailyBoxOffice from "../contents/dailyBoxOffice";

import logo2 from "../../statics/logos/logo03.png";
import { StyledBottomNav } from "../contents/styleComponent";
const Main = props => {
  const [keyword, setKeyword] = useState("");
  const [renderKeyword, setRenderKeyword] = useState("");
  const [isMyPage, setIsMyPage] = useState(false);
  const [isRender, setIsRender] = useState(false);

  console.log(isRender);

  useEffect(() => {
    props.loadUserProfile();
  }, [isMyPage]);

  const handleChange = e => {
    setKeyword(e.target.value);
  };

  const handleClick = clickType => {
    console.log(clickType);
    if (clickType === "myPage") {
      setIsMyPage(true);
    } else if (clickType === "search") {
      const filteredKeyword = keyword.replace(/ +/g, " ").trim();
      props.movieInfo(keyword);
      setRenderKeyword(filteredKeyword);
      setIsMyPage(false);
    } else if (clickType === "render") {
      setIsRender(!isRender);
    } else {
      setIsMyPage(false);
    }
  };

  const handleKeyPress = e => {
    if (e.charCode === 13) {
      document.getElementById("search").click();
    }
  };

  return (
    <Fragment>
      <BrowserRouter>
        <div style={{ display: "inline-block", height: "92%", width: "100%" }}>
          <Nav
            value={keyword}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            onClick={clickType => handleClick(clickType)}
          ></Nav>
          <div
            style={{
              height: "100%",
              marginLeft: "2%",
              color: "#1e272e",
              width: "100%"
            }}
          >
            <div style={{ height: "8%" }} />
            <Switch>
              <Route
                path="/search"
                render={() => <SearchResult keyword={renderKeyword} />}
              />
              <Route
                path="/mypage"
                render={() => <MyPage onClick={() => handleClick("render")} />}
              />
              <Route exact path="/logout" component={Logout} />
            </Switch>
            <DailyBoxOffice isUnMount={isMyPage} />
            <div style={{ height: "10%" }} />
          </div>
          <StyledBottomNav>
            <div>
              <img
                src={logo2}
                alt={"logo2"}
                width={30}
                style={{
                  verticalAlign: "middle",
                  backgroundColor: "none",
                  paddingLeft: "20px"
                }}
              />
              <span style={{ marginLeft: "7px", marginRight: "20px" }}>
                Movie Inside
              </span>
            </div>
            <div style={{ paddingRight: "30px" }}>
              Copyright © 2019 HAND Inc.
            </div>
          </StyledBottomNav>
        </div>
      </BrowserRouter>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    profile: state.auth.profile
    // movieData: state.getScore.movieData,
    // InfoLoaded: state.getMovieInfo.InfoLoaded,
    // scoreLoaded: state.getScore.scoreLoaded
  };
};

export default connect(
  mapStateToProps,
  { movieInfo, loadUserProfile }
)(Main);
