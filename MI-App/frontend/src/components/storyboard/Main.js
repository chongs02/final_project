import React, { useState, useEffect, Fragment } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";

import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import { movieInfo } from "../../actions/movieInfo";
import { loadUserProfile } from "../../actions/auth";

import Nav from "../contents/nav";
import SearchResult from "./searchResult";
import MyPage from "./myPage";
import Logout from "./logout";
import DailyBoxOffice from "../contents/dailyBoxOffice";
import { clearMovieInfo } from "../../actions/movieInfo";

const Main = props => {
  const [keyword, setKeyword] = useState("");
  const [renderKeyword, setRenderKeyword] = useState("");

  useEffect(() => {
    props.loadUserProfile();
  }, []);

  const handleChange = e => {
    setKeyword(e.target.value);
  };

  const handleClick = () => {
    const filteredKeyword = keyword.replace(/ +/g, " ").trim();
    setRenderKeyword(filteredKeyword);
    props.movieInfo(keyword);
  };

  const handleKeyPress = e => {
    if (e.charCode === 13) {
      document.getElementById("search").click();
    }
  };

  return (
    <Fragment>
      <BrowserRouter>
        <Nav
          value={keyword}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          onClick={handleClick}
        ></Nav>
        <div
          style={{
            height: "100%",
            marginLeft: "2%",
            marginRight: "2%",
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
        </div>
      </BrowserRouter>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    profile: state.auth.profile,
    movieData: state.getScore.movieData,
    InfoLoaded: state.getMovieInfo.InfoLoaded,
    scoreLoaded: state.getScore.scoreLoaded
  };
};

export default connect(
  mapStateToProps,
  { logout, movieInfo, clearMovieInfo, loadUserProfile }
)(Main);
