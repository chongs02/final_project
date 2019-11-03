import React, { memo } from "react";
import SideBar from "../contents/sideBar";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import MyPageMatcher from "../contents/myPageMatcher";
import MyDefaultPage from "../contents/myDefaultPage";

const MyPage = memo(() => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Switch>
            <Route exact path="/myPage" component={MyDefaultPage}></Route>
            <Route
              path="/myPage/:name"
              render={props => <MyPageMatcher {...props}></MyPageMatcher>}
            ></Route>
          </Switch>
          <div style={{ width: "20%" }}>
            <SideBar></SideBar>
          </div>
        </div>
      </BrowserRouter>
    </React.Fragment>
  );
});

export default MyPage;
