import React, { Component } from "react";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import { movieInfo } from "../../actions/movieInfo";
import SearchResult from "./searchResult";
import update from "react-addons-update";

import Nav from "../contents/nav";

let search = false;

class Main extends Component {
  state = {
    keyword: "",
    isSearch: false,
    history: [],
    count: 0
    // currentView: null
  };

  componentDidMount() {
    this.props.movieInfo();
  }

  handleEdit(name, phone) {
    this.setState({
      contactData: update(this.state.contactData, {
        [this.state.selectedKey]: {
          name: { $set: name },
          phone: { $set: phone }
        }
      })
    });
  }

  handleChange = e => {
    search = false;

    const { history, count } = this.state;

    this.setState({
      isSearch: false,
      keyword: e.target.value,
      history: history:

      // history: update(history, {
      //   [count]: current
      // })
    });
  };

  handleClick = () => {
    search = true;

    const { history } = this.state;
    const current = this.renderSearchResult();

    this.setState({
      isSearch: true,
      history: history.concat(current),
      count: this.state.count + 1

      // currentView: this.renderSearchResult()
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
        isSearch={search}
      />
    );
  };

  render() {
    const { keyword, isSearch, history, count } = this.state;
    const current = history[count - 1];

    let currentView;
    if (count < 2) {
      currentView = current;
    } else {
      currentView = history[count - 2];
    }

    // let currentView = this.renderSearchResult();

    console.log(isSearch, ": main");
    console.log(history, "history");
    console.log(current, "current");
    console.log(count, "count");
    console.log(currentView, "currentView");

    return (
      <React.Fragment>
        <Nav
          value={keyword}
          isSearch={isSearch}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
          onClick={this.handleClick}
        ></Nav>
        {search ? current : currentView}
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
