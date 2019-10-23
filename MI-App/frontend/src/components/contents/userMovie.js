import React from "react";
import { connect } from "react-redux";

const UserMovie = props => {
  console.log(props);

  return <div>나와앗!!!!</div>;
};

const mapStateToProps = state => {
  return {
    movieInfo: state.getMovieInfo.movieInfo
  };
};

export default connect(mapStateToProps)(UserMovie);
