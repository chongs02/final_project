import React, { useState, useEffect, memo } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";

import SideBar from "../contents/sideBar";
import MyPageMatcher from "../contents/myPageMatcher";
// import MyDefaultPage from "../contents/myDefaultPage";
import UserMovie from "../contents/userMovie";

const MyPage = memo(props => {
  return (
    // <div style={{}}>
    //   {props.profile.length > 0 ? (
    //     <React.Fragment>
    //       <UserMovie profile={props.profile}></UserMovie>
    //       <Collaborative></Collaborative>
    //     </React.Fragment>
    //   ) : (
    //     noResult
    //   )}
    // </div>
    <React.Fragment>
      <BrowserRouter>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Switch>
            <Route
              exact
              path="/mypage"
              render={() => <UserMovie profile={props.profile} />}
            />
            <Route
              path="/:name"
              render={props => <MyPageMatcher {...props} />}
            />
          </Switch>
          <div style={{ width: "20%" }}>
            <SideBar />
          </div>
        </div>
      </BrowserRouter>
    </React.Fragment>
  );
});

const mapStateToProps = state => {
  return {
    profile: state.auth.profile
  };
};

export default connect(mapStateToProps)(MyPage);
