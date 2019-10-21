import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import { movieInfo } from "../../actions/movieInfo";
import SearchResult from "./searchResult";

import Nav from "../contents/nav";

class Main extends Component {
  state = {
    keyword: "",
    isSearch: false
  };

  componentDidMount() {
    this.props.movieInfo();
  }

  renderSearchResult = () => {
    return (
      <SearchResult
        keyword={this.state.keyword}
        data={this.props.statemovieInfo}
      />
    );
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    // const AuthLink = (
    //   <div>
    //     {/* <span>{user ? `welcome ${user.username}` : ""}</span>
    //     <button onClick={this.props.logout}>Logout</button>
    //     <Link to="/mypage">Mypage</Link> */}
    //   </div>
    // );

    // const GuestLink = (
    //   <div>
    //     <Link to="/login">Log In</Link>
    //     <Link to="/register">Register</Link>
    //   </div>
    // );

    return (
      <React.Fragment>
        <Nav></Nav>
        {this.state.isSearch ? this.renderSearchResult() : <div />}
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
