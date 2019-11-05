import React, { useState, memo, useEffect } from "react";
import { connect } from "react-redux";

import UserMovie from "../contents/userMovie";

import SideBar from "../contents/sideBar";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import MyPageMatcher from "../contents/myPageMatcher";

import { StyledContent, StyledContentTitle } from "../contents/styleComponent";

const MyPage = memo(props => {
  const [isDefaultPage, setIsDefaultPage] = useState(true);
  const [changePage, setChangePage] = useState(false);

  console.log(props, "mypage");

  const handleClick = clickType => {
    // if (clickType === "default") {
    //   setIsDefaultPage(true);
    // } else {
    //   setIsDefaultPage(false);
    // }
    setChangePage(!changePage);
  };

  useEffect(() => {});

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
    <React.Fragment>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {/* {isDefaultPage ? ( */}
        <div style={{ width: "80%" }}>
          {props.profile.length > 0 ? (
            <React.Fragment>
              <UserMovie
                profile={props.profile}
                changePage={changePage}
              ></UserMovie>
            </React.Fragment>
          ) : (
            noResult
          )}
        </div>
        {/* ) : (
          <BrowserRouter>
            <div style={{}}>
              <div style={{ width: "80%" }}>
                <Switch>
                  <Route
                    exact
                    path="/myPage/:title"
                    render={props => <MyPageMatcher {...props} />}
                  />
                </Switch>
              </div>
            </div>
          </BrowserRouter>
        )} */}
        <div style={{ width: "20%" }}>
          <SideBar onClick={(handleClick, props.onClick)} />
        </div>
      </div>
    </React.Fragment>
  );
});

const mapStateToProps = state => {
  return {
    profile: state.auth.profile
  };
};

export default connect(mapStateToProps)(MyPage);
