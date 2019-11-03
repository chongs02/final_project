import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class SideBar extends Component {
  render() {
    return (
      <div
        style={{
          marginTop: "5px",
          marginRight: "0px",
          paddingBottom: "-10px",
          height: "100%",
          backgroundColor: "lightgray",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start"
        }}
      >
        <div>
          <NavLink
            exact
            to="/myPage/profile"
            style={{ textDecoration: "none" }}
          >
            <div>개인 정보</div>
          </NavLink>
        </div>
        <div>
          <NavLink
            exact
            to="/myPage/mystatics"
            style={{ textDecoration: "none" }}
          >
            <div>나의 영화</div>
          </NavLink>
        </div>
        <div>
          <NavLink
            exact
            to="/myPage/collaborative-seen"
            style={{ textDecoration: "none" }}
          >
            <div>봤어요 추천</div>
          </NavLink>
        </div>
        <div>
          <NavLink
            exact
            to="/myPage/collaborative-like"
            style={{ textDecoration: "none" }}
          >
            <div>좋아요 추천</div>
          </NavLink>
        </div>
        <div>
          <NavLink
            exact
            to="/myPage/collaborative-hate"
            style={{ textDecoration: "none" }}
          >
            <div>걸러야할 영화</div>
          </NavLink>
        </div>
      </div>
    );
  }
}
