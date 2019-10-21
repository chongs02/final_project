import React, { Component } from "react";
import { Link, Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import MovieInfo from "./MovieInfo";

class Main extends Component {
  state = {
    keyword: ""
  };

  handleChange = e => {
    this.setState({
      keyword: e.target.value
    });
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const { keyword } = this.state;

    const mapToComponent = data => {
      data = data.filter(title => {
        return title.movieNm.indexOf(keyword) > -1;
      });
      return data.map((title, i) => {
        return <MovieInfo title={title.movieNm} key={i}></MovieInfo>;
      });
    };

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
          placeholder="검색하시오"
          value={this.state.keword}
          onChange={this.handleChange}
        ></input>
        <button>검색</button>
        <div>{isAuthenticated ? AuthLink : GuestLink}</div>
        {this.props.isLoaded ? (
          mapToComponent(this.props.movieInfo)
        ) : (
          <div>Loading</div>
        )}
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    movieData: state.getScore.movieData,
    movieInfo: state.getMovieInfo.movieInfo,
    isLoaded: state.getScore.isLoaded
  };
};

export default connect(
  mapStateToProps,
  { logout }
)(Main);
