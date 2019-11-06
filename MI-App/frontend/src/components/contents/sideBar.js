import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import { StyledSideBarButton } from "./styleComponent";

import { Icon } from "react-icons-kit";
import { user } from "react-icons-kit/fa/user";
import { film } from "react-icons-kit/icomoon/film";
import { barChartO } from "react-icons-kit/fa/barChartO";
import { checkSquareO } from "react-icons-kit/fa/checkSquareO";
import { heart } from "react-icons-kit/fa/heart";
import { u1F608 } from "react-icons-kit/noto_emoji_regular/u1F608";

export default class SideBar extends Component {
  render() {
    return (
      <div
        style={{
          marginTop: "5px",
          marginRight: "0px",
          height: "100%",
          // backgroundColor: "rgba(30, 39, 46, 0.85)",    // 짙은 회색
          // backgroundColor: "rgba(85, 26, 139, 0.85)",   // 짙은 보라
          // backgroundColor: "rgba(245, 59, 87, 0.75)",   // 핫 핑크
          backgroundColor: "rgba(55, 66, 250, 0.75)", // 보라 파랑
          // backgroundColor: "rgba(116, 185, 255, 1)",    // 옅은 파랑
          display: "block"
        }}
      >
        <div style={{ padding: "15px" }} />
        <div
          style={{
            width: "100%",
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)"
          }}
        >
          <span
            style={{
              display: "flex",
              fontSize: "20px",
              fontFamily: "nanumB",
              color: "#ffffff",
              paddingLeft: "25px"
            }}
          >
            기본 정보
          </span>
          <div style={{ padding: "10px" }} />
          <div>
            <NavLink
              exact
              to="/myPage/profile"
              style={{ textDecoration: "none" }}
            >
              <StyledSideBarButton
                onClick={() => this.props.onClick("profile")}
              >
                <Icon
                  size={"25px"}
                  icon={user}
                  style={{ marginRight: "15px" }}
                />
                개인 정보
              </StyledSideBarButton>
            </NavLink>
          </div>
          <div>
            <NavLink exact to="/myPage" style={{ textDecoration: "none" }}>
              <StyledSideBarButton onClick={() => this.props.onClick("home")}>
                <Icon
                  size={"25px"}
                  icon={film}
                  style={{ marginRight: "15px" }}
                />
                내가 본 영화
              </StyledSideBarButton>
            </NavLink>
          </div>
          <div style={{ padding: "15px" }} />
        </div>
        <div style={{ padding: "15px" }} />
        <div
          style={{
            width: "100%",
            borderBottom: "1px solid rgba(37, 40, 47, 0.07)"
          }}
        >
          <span
            style={{
              display: "flex",
              fontSize: "20px",
              fontFamily: "nanumB",
              color: "#ffffff",
              paddingLeft: "25px"
            }}
          >
            추천 정보
          </span>
          <div style={{ padding: "10px" }} />
          <div>
            <NavLink
              exact
              to="/myPage/mystatics"
              style={{ textDecoration: "none" }}
            >
              <StyledSideBarButton
                onClick={() => this.props.onClick("mystatics")}
              >
                <Icon
                  size={"25px"}
                  icon={barChartO}
                  style={{ marginRight: "15px" }}
                />
                나의 영화 정보
              </StyledSideBarButton>
            </NavLink>
          </div>
          <div>
            <NavLink
              exact
              to="/myPage/collaborative-seen"
              style={{ textDecoration: "none" }}
            >
              <StyledSideBarButton
                onClick={() => this.props.onClick("collaborative-seen")}
              >
                <Icon
                  size={"25px"}
                  icon={checkSquareO}
                  style={{ marginRight: "15px" }}
                />
                볼 만한 영화
              </StyledSideBarButton>
            </NavLink>
          </div>
          <div>
            <NavLink
              exact
              to="/myPage/collaborative-like"
              style={{ textDecoration: "none" }}
            >
              <StyledSideBarButton
                onClick={() => this.props.onClick("collaborative-like")}
              >
                <Icon
                  size={"25px"}
                  icon={heart}
                  style={{ marginRight: "15px" }}
                />
                좋아할 만한 영화
              </StyledSideBarButton>
            </NavLink>
          </div>
          <div>
            <NavLink
              exact
              to="/myPage/collaborative-hate"
              style={{ textDecoration: "none" }}
            >
              <StyledSideBarButton
                style={{ paddingLeft: "35px" }}
                onClick={() => this.props.onClick("collaborative-hate")}
              >
                <Icon
                  size={"32px"}
                  icon={u1F608}
                  style={{ marginRight: "15px" }}
                />
                싫어할 만한 영화
              </StyledSideBarButton>
            </NavLink>
          </div>
          <div style={{ padding: "10px" }} />
        </div>
      </div>
    );
  }
}
