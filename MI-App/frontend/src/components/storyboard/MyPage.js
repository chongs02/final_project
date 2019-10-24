import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { movieInfo } from "../../actions/movieInfo";
import UserMovie from "../contents/userMovie";
import { loadUserProfile } from "../../actions/auth";

const MyPage = props => {
  console.log(props);
  useEffect(() => {
    props.loadUserProfile();
  }, []);

  return <UserMovie data={props.movieInfo}></UserMovie>;
};

const mapStateToProps = state => {
  return {
    profile: state.auth.profile,
    profileLoading: state.auth.profileLoading,
    movieInfo: state.getMovieInfo.movieInfo,
    InfoLoaded: state.getMovieInfo.InfoLoaded
  };
};

export default connect(
  mapStateToProps,
  { loadUserProfile }
)(MyPage);
