import React, { useState, useEffect, memo } from "react";
import { useSelector } from "react-redux";
import { Route, Switch, BrowserRouter } from "react-router-dom";

import UserMovie from "../contents/userMovie";
import Profile from "../contents/profile";
import MyStatics from "../contents/mystatics";
import Collaborative from "../contents/collaborative";
import SideBar from "../contents/sideBar";

const MyPage = memo(props => {
  const [isHome, setIsHome] = useState(true);
  const [collaboPage, setCollaboPage] = useState("");
  const profile = useSelector(state => state.auth.profile);

  useEffect(() => {
    setIsHome(true);
  }, [props.pageChange]);

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
    <React.Fragment>
      <BrowserRouter>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            height: "100%"
          }}
        >
          <div style={{ width: "82%" }}>
            {isHome ? (
              <UserMovie
                profile={profile}
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
          <div style={{ width: "16%" }}>
            <div style={{ width: "100%", height: "100%", position: "fixed" }}>
              <SideBar onClick={handleCilck} />
            </div>
          </div>
        </div>
      </BrowserRouter>
    </React.Fragment>
  );
});

export default MyPage;
