import React, { memo } from "react";
import { connect } from "react-redux";

import UserMovie from "../contents/userMovie";

import { StyledContent, StyledContentTitle } from "../contents/styleComponent";

const MyPage = memo(props => {
  const noResult = (
    <StyledContent>
      <StyledContentTitle>내가 본 영화</StyledContentTitle>
      <div
        style={{
          display: "flex",
          height: "188.6px",
          margin: "30px 0px",
          paddingLeft: "20px"
        }}
      >
        본 영화가 없습니다
      </div>
    </StyledContent>
  );

  console.log(props.profile);

  return (
    <div>
      {props.profile && props.profile !== [] ? (
        <UserMovie profile={props.profile}></UserMovie>
      ) : (
        noResult
      )}
    </div>
  );
});

const mapStateToProps = state => {
  return {
    profile: state.auth.profile
    // profileLoading: state.auth.profileLoading,
    // movieInfo: state.getMovieInfo.movieInfo,
    // InfoLoaded: state.getMovieInfo.InfoLoaded
  };
};

export default connect(mapStateToProps)(MyPage);
