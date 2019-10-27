import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import { movieInfo } from "../../actions/movieInfo";

import { Route, Switch, BrowserRouter } from "react-router-dom";
import Nav from "../contents/nav";
import SearchResult from "./searchResult";
import MyPage from "./myPage";
import Logout from "./logout";
import DailyBoxOffice from "../contents/dailyBoxOffice";
import { clearMovieInfo } from "../../actions/movieInfo";

class Main extends Component {
  state = {
    keyword: "",
    renderKeyword: ""
  };

  componentDidMount() {}

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
    // 여기 수정 필요함
    document.getElementById("search").click();
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
          <div style={{ height: "100%", marginLeft: "2%", marginRight: "2%" }}>
            <div style={{ height: "8%" }} />
            <Switch>
              <Route
                exact
                path="/search"
                render={() => <SearchResult keyword={renderKeyword} />}
              />
              <Route exact path="/mypage" component={MyPage} />
              <Route exact path="/logout" component={Logout} />
            </Switch>
            <DailyBoxOffice></DailyBoxOffice>
          </div>
        </BrowserRouter>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    movieData: state.getScore.movieData,
    InfoLoaded: state.getMovieInfo.InfoLoaded,
    scoreLoaded: state.getScore.scoreLoaded
  };
};

export default connect(
  mapStateToProps,
  { logout, movieInfo, clearMovieInfo }
)(Main);
