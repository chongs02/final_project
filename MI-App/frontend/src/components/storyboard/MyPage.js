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
  const [name, setName] = useState("");
  const [collaboPage, setCollaboPage] = useState("");
  const profile = useSelector(state => state.auth.profile);

  useEffect(() => {
    setIsHome(true);
    setName("home");
  }, [props.pageChange]);

  const handleCilck = clickType => {
    if (clickType.includes("collaborative")) {
      setCollaboPage(clickType);
      setIsHome(false);
    } else if (clickType === "mystatics" || clickType === "profile") {
      setIsHome(false);
    } else {
      setIsHome(true);
      setName(clickType);
    }
  };

  return (
    <React.Fragment>
      <BrowserRouter>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <div style={{ width: "80%" }}>
            {isHome ? (
              <UserMovie
                name={name}
                profile={profile}
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
          <div style={{ width: "17%" }}>
            <div style={{ width: "100%", height: "100%", position: "fixed" }}>
              <SideBar onClick={handleCilck} pageChange={props.pageChange} />
            </div>
          </div>
        </div>
      </BrowserRouter>
    </React.Fragment>
  );
});

export default MyPage;
