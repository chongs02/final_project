import React, { memo } from "react";
import { connect } from "react-redux";

import UserMovie from "../contents/userMovie";
import { StyledContent, StyledContentTitle } from "../contents/styleComponent";
import SideBar from "../contents/sideBar";
import { Route, Switch, BrowserRouter } from "react-router-dom";

import Profile from "../contents/profile";
import MyStatics from "../contents/mystatics";
import Collaborative from "../contents/collaborative";

const MyPage = memo(props => {
  console.log(props);
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
      <BrowserRouter>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ flex: 5 }}>
            {props.profile.length > 0 ? (
              <React.Fragment>
                <UserMovie profile={props.profile}></UserMovie>
              </React.Fragment>
            ) : (
              noResult
            )}
          </div>

          <div style={{ flex: 1 }}>
            <SideBar></SideBar>
            <Switch>
              <Route path="/profile" component={Profile}></Route>
              <Route path="/mystatics" component={MyStatics}></Route>
              <Route
                exact
                path="/collaborative/:kind"
                component={Collaborative}
              ></Route>
            </Switch>
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
