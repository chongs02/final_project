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
  const [renderMyPage, setRenderMyPage] = useState(false);

  useEffect(() => {
    props.loadUserProfile();
  }, [renderMyPage]);

  const handleChange = e => {
    setKeyword(e.target.value);
  };

  const handleClick = clickType => {
    if (clickType === "search") {
      const filteredKeyword = keyword.replace(/ +/g, " ").trim();
      setRenderKeyword(filteredKeyword);
      props.movieInfo(keyword);
    } else {
      setRenderMyPage(!renderMyPage);
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
              color: "#1e272e"
            }}
          >
            <div style={{ height: "8%" }} />
            <Switch>
              <Route
                path="/search"
                render={() => <SearchResult keyword={renderKeyword} />}
              />
              <Route path="/mypage" component={MyPage} />
              <Route exact path="/logout" component={Logout} />
            </Switch>
            <DailyBoxOffice />
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
