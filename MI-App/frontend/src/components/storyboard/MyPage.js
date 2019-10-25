import React, { useEffect, memo } from "react";
import { connect } from "react-redux";
import UserMovie from "../contents/userMovie";
import { loadUserProfile } from "../../actions/auth";

const MyPage = memo(props => {
  useEffect(() => {
    props.loadUserProfile();
  }, []);

  return (
    <div>
      <UserMovie profile={props.profile}></UserMovie>
    </div>
  );
});

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
