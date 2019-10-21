import React, { Component } from "react";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import { movieInfo } from "../../actions/movieInfo";
import SearchResult from "./searchResult";

import Nav from "../contents/nav";

class Main extends Component {
  state = {
    keyword: "",
    isSearch: false,
    isChanged: false
  };

  componentDidMount() {
    this.props.movieInfo();
  }

  handleChange = e => {
    this.setState({
      keyword: e.target.value,
      isChanged: false
    });
  };

  handleClick = () => {
    this.setState({
      isSearch: true,
      isChanged: true
    });
  };

  handleKeyPress = e => {
    if (e.charCode === 13) {
      this.handleClick();
    }
  };

  renderSearchResult = () => {
    return (
      <SearchResult
        keyword={this.state.keyword}
        data={this.props.statemovieInfo}
      />
    );
  };

  render() {
    const { keyword, isSearch, isChanged } = this.state;
    console.log(isSearch, isChanged);
    return (
      <React.Fragment>
        <Nav
          value={keyword}
          isSearch={isSearch}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
          onClick={this.handleClick}
        ></Nav>
        {isSearch || isChanged ? this.renderSearchResult() : <div />}
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
