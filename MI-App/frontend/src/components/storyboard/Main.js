import React, { Component } from "react";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import { movieInfo } from "../../actions/movieInfo";
import SearchResult from "./searchResult";

import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import MyPage from "./myPage";
import MovieDetails from "./movieDetails";
import Logout from "./logout";
import Nav from "../contents/nav";

class Main extends Component {
  state = {
    keyword: "",
    currentView: null
  };

  componentDidMount() {
    this.props.movieInfo();
  }

  handleChange = e => {
    this.setState({
      keyword: e.target.value
    });
  };

  handleClick = () => {
    this.renderSearchResult();
  };

  handleKeyPress = e => {
    if (e.charCode === 13) {
      this.handleClick();
    }
  };

  renderSearchResult = () => {
    let component = (
      <SearchResult
        keyword={this.state.keyword}
        data={this.props.statemovieInfo}
        isSearch={this.state.isSearch}
      />
    );
    this.setState({
      currentView: component
    });
  };

  render() {
    const { keyword, currentView } = this.state;
    // console.log(currentView);
    return (
      <React.Fragment>
        <BrowserRouter>
          <Nav
            value={keyword}
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
            onClick={this.handleClick}
          ></Nav>
          {currentView}

          <Switch>
            <Route exact path="/mypage" component={MyPage} />
            <Route exact path="/movieDetails" component={MovieDetails} />
            <Route exact path="/logout" component={Logout} />
          </Switch>
        </BrowserRouter>
      </React.Fragment>
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
  { logout, movieInfo }
)(Main);
