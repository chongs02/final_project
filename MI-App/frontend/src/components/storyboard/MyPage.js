import React, { memo } from "react";
import SideBar from "../contents/sideBar";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import MyPageMatcher from "../contents/myPageMatcher";
import MyDefaultPage from "../contents/myDefaultPage";

const MyPage = memo(props => {
  console.log(props);
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
          <div style={{ width: "80%" }}>
            <Switch>
              <Route exact path="/myPage" component={MyDefaultPage}></Route>
              <Route
                exact
                path="/myPage/:name"
                render={props => <MyPageMatcher {...props}></MyPageMatcher>}
              ></Route>
            </Switch>
          </div>
          <div style={{ width: "20%" }}>
            <SideBar></SideBar>
          </div>
        </div>
      </BrowserRouter>
    </React.Fragment>
  );
});

export default MyPage;
