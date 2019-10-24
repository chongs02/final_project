import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { movieInfo } from "../../actions/movieInfo";
import UserMovie from "../contents/userMovie";
import { loadUserProfile } from "../../actions/auth";

const MyPage = props => {
  console.log(props);
  const moviecomponent = async () => {
    await props.loadUserProfile();

    const profile = props.profile;
    console.log(profile);
    if (profile !== null) {
      profile.forEach(async element => {
        console.log(element);
        await props.movieInfo(element.watchedMovie);
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
  { movieInfo, loadUserProfile }
)(MyPage);
