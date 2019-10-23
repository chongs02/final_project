import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { movieInfo } from "../../actions/movieInfo";
import UserMovie from "../contents/userMovie";

const MyPage = props => {
  const moviecomponent = () => {
    const profile = props.profile;
    if (profile !== null) {
      profile.forEach(element => {
        props.movieInfo(element.watchedMovie);
      });
    }
  };

  // moviecomponent();

  useEffect(() => {
    moviecomponent();
  }, []);

  return (
    <div>
      <UserMovie></UserMovie>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    profile: state.auth.profile,
    profileLoading: state.auth.profileLoading,
    movieInfoState: state.getMovieInfo.movieInfo
  };
};

export default connect(
  mapStateToProps,
  { movieInfo }
)(MyPage);
