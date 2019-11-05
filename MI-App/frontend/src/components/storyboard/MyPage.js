import React, { useState, useEffect, memo } from "react";
import { connect } from "react-redux";
import { Route, Switch, BrowserRouter } from "react-router-dom";

import UserMovie from "../contents/userMovie";
import Profile from "../contents/profile";
import MyStatics from "../contents/mystatics";
import Collaborative from "../contents/collaborative";
import SideBar from "../contents/sideBar";

const MyPage = memo(props => {
  const [isHome, setIsHome] = useState(true);
  const [collaboPage, setCollaboPage] = useState("");

  useEffect(() => {
    setIsHome(true);
  }, [props.pageChange]);

  console.log(isHome);

  const handleCilck = clickType => {
    if (clickType === "home") {
      setIsHome(true);
    } else {
      setIsHome(false);
    }
    if (clickType.includes("collaborative")) {
      setCollaboPage(clickType);
    }
  };

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
          <div>
            {isHome ? (
              <UserMovie
                profile={props.profile}
                isHome={isHome}
                pageChange={props.pageChange}
              />
            ) : (
              <Switch>
                <Route exact path="/myPage/profile" component={Profile} />
                <Route exact path="/myPage/mystatics" component={MyStatics} />
                <Route
                  path={`/myPage/${collaboPage}`}
                  render={() => <Collaborative name={`${collaboPage}`} />}
                />
              </Switch>
            )}
          </div>
          <div style={{ width: "20%" }}>
            <SideBar onClick={handleCilck} />
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
