import React, { useEffect, memo } from "react";
import { connect } from "react-redux";
import UserMovie from "../contents/userMovie";
import { loadUserProfile } from "../../actions/auth";

import { StyledContent, StyledContentTitle } from "../contents/styleComponent";

const MyPage = memo(props => {
  // console.log(props);

  useEffect(() => {
    props.loadUserProfile();
  }, []);

  return (
    <div>
      {props.profile ? (
        <StyledContent>
          <StyledContentTitle>내가 본 영화</StyledContentTitle>
          <UserMovie profile={props.profile}></UserMovie>
        </StyledContent>
      ) : (
        <div></div>
      )}
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
