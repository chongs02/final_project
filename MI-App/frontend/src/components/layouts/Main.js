import React, { Component } from "react";
import { Link, Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import MovieInfo from "../MovieInfo";
import { movieInfo } from "../../actions/movieInfo";
import SearchResult from "../SearchResult";

class Main extends Component {
  state = {
    keyword: "",
    isSearch: false
  };

  componentDidMount() {
    this.props.movieInfo();
  }

  handleChange = e => {
    this.setState({
      keyword: e.target.value,
      isSearch: false
    });
  };

  renderSearchResult = () => {
    return (
      <SearchResult
        keyword={this.state.keyword}
        data={this.props.statemovieInfo}
      />
    );
  };

  handleSearchClick = () => {
    this.setState({
      isSearch: true
    });
  };

  handleKeyPress = e => {
    if (e.charCode === 13) {
      this.handleSearchClick();
    }
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const AuthLink = (
      <div>
        <span>{user ? `welcome ${user.username}` : ""}</span>
        <button onClick={this.props.logout}>Logout</button>
        <Link to="/mypage">Mypage</Link>
      </div>
    );

    const GuestLink = (
      <div>
        <Link to="/login">Log In</Link>
        <Link to="/register">Register</Link>
      </div>
    );

    return (
      <nav className="nav">
        <input
          className="search"
          type="text"
          placeholder="영화를 검색하세요"
          value={this.state.keword}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
        ></input>
        <button onClick={this.handleSearchClick}>검색</button>
        <div>{isAuthenticated ? AuthLink : GuestLink}</div>
        {this.state.isSearch ? this.renderSearchResult() : <div />}
      </nav>
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
