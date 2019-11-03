import React, { memo } from "react";
import { connect } from "react-redux";

import UserMovie from "../contents/userMovie";
import Collaborative from "../contents/collaborative";
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

  return (
    <div style={{}}>
      {props.profile.length > 0 ? (
        <React.Fragment>
          <UserMovie profile={props.profile}></UserMovie>
          <Collaborative></Collaborative>
        </React.Fragment>
      ) : (
        noResult
      )}
    </div>
  );
});

const mapStateToProps = state => {
  return {
    profile: state.auth.profile
  };
};

export default connect(mapStateToProps)(MyPage);
