import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import { movieInfo } from "../../actions/movieInfo";
import { loadUserProfile } from "../../actions/auth";

import { Route, Switch, BrowserRouter } from "react-router-dom";
import Nav from "../contents/nav";
import SearchResult from "./searchResult";
import MyPage from "./myPage";
import Logout from "./logout";
import DailyMovie from "../contents/dailyMovie";

class Main extends Component {
  state = {
    keyword: "",
    renderKeyword: ""
  };

  componentDidMount() {
    this.props.loadUserProfile();
  }

  handleChange = e => {
    this.setState({
      keyword: e.target.value
    });
  };

  handleClick = () => {
    this.setState({
      renderKeyword: this.state.keyword
    });
    this.props.movieInfo(this.state.keyword);
    document.querySelector("button").click();
  };

  handleKeyPress = e => {
    if (e.charCode === 13) {
      this.handleClick();
    }
  };

  render() {
    const { keyword, renderKeyword } = this.state;

    return (
      <Fragment>
        <BrowserRouter>
          <Nav
            value={keyword}
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
            onClick={this.handleClick}
          ></Nav>

          <Switch>
            <Route
              exact
              path="/search"
              render={() => (
                <SearchResult
                  keyword={renderKeyword}
                  data={this.props.statemovieInfo}
                />
              )}
            />
            <Route exact path="/mypage" component={MyPage} />
            <Route exact path="/logout" component={Logout} />
          </Switch>

          <DailyMovie></DailyMovie>
        </BrowserRouter>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    movieData: state.getScore.movieData,
    statemovieInfo: state.getMovieInfo.movieInfo,
    InfoLoaded: state.getMovieInfo.InfoLoaded,
    scoreLoaded: state.getScore.scoreLoaded
  };
};

export default connect(
  mapStateToProps,
  { logout, movieInfo, loadUserProfile }
)(Main);
