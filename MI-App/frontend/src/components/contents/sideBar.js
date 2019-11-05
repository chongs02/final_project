import React, { Component, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { StyledContentHover } from "./styleComponent";

import { StyledSideBarButton } from "../contents/styleComponent";

export default class SideBar extends Component {
  clases = makeStyles();
  render() {
    return (
      <div>
        <div
          style={{
            marginTop: "5px",
            marginRight: "0px",
            height: "100%",
            backgroundColor: "rgba(55, 66, 250, 0.8)",
            display: "block"
          }}
        >
          <div style={{ padding: "15px" }} />
          <div
            style={{
              width: "100%",
              borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
              paddingLeft: "30px"
            }}
          >
            <span
              style={{
                display: "flex",
                fontSize: "20px",
                fontFamily: "nanumB",
                color: "#ffffff"
              }}
            >
              기본 정보
            </span>
            <div style={{ paddingLeft: "10px" }}>
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
                    개인 정보
                  </StyledSideBarButton>
                </NavLink>
              </div>
              <div style={{ padding: "3px" }} />
              <div>
                <NavLink exact to="/myPage" style={{ textDecoration: "none" }}>
                  <StyledSideBarButton
                    onClick={() => this.props.onClick("home")}
                  >
                    내가 본 영화
                  </StyledSideBarButton>
                </NavLink>
              </div>
              <div style={{ padding: "15px" }} />
            </div>
          </div>
          <div style={{ padding: "15px" }} />

          <div
            style={{
              width: "100%",
              borderBottom: "1px solid rgba(37, 40, 47, 0.07)",
              paddingLeft: "30px"
            }}
          >
            <span
              style={{
                display: "flex",
                fontSize: "20px",
                fontFamily: "nanumB",
                color: "#ffffff"
              }}
            >
              추천 정보
            </span>
            <div style={{ paddingLeft: "10px" }}>
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
                    나의 영화 선호 정보
                  </StyledSideBarButton>
                </NavLink>
              </div>
              <div style={{ padding: "3px" }} />
              <div>
                <NavLink
                  exact
                  to="/myPage/collaborative-seen"
                  style={{ textDecoration: "none" }}
                >
                  <StyledSideBarButton
                    onClick={() => this.props.onClick("collaborative-seen")}
                  >
                    볼 만한 영화
                  </StyledSideBarButton>
                </NavLink>
              </div>
              <div style={{ padding: "3px" }} />
              <div>
                <NavLink
                  exact
                  to="/myPage/collaborative-like"
                  style={{ textDecoration: "none" }}
                >
                  <StyledSideBarButton
                    onClick={() => this.props.onClick("collaborative-like")}
                  >
                    좋아할 만한 영화
                  </StyledSideBarButton>
                </NavLink>
              </div>
              <div style={{ padding: "3px" }} />
              <div>
                <NavLink
                  exact
                  to="/myPage/collaborative-hate"
                  style={{ textDecoration: "none" }}
                >
                  <StyledSideBarButton
                    onClick={() => this.props.onClick("collaborative-hate")}
                  >
                    싫어할 만한 영화
                  </StyledSideBarButton>
                </NavLink>
              </div>
              <div style={{ padding: "10px" }} />
            </div>
          </div>
        </div>
        <div>
          <NavLink
            exact
            to="/myPage/mystatics"
            style={{ textDecoration: "none" }}
          >
            <StyledContentHover>
              <Button
                color="primary"
                className={classes.button}
                style={{ width: "100%", fontWeight: "bold", fontSize: "15px" }}
              >
                나의 영화
              </Button>
            </StyledContentHover>
          </NavLink>
        </div>
        <div>
          <NavLink
            exact
            to="/myPage/collaborative-seen"
            style={{ textDecoration: "none" }}
          >
            <StyledContentHover>
              <Button
                color="primary"
                className={classes.button}
                style={{ width: "100%", fontWeight: "bold", fontSize: "15px" }}
              >
                추천! 봤어요
              </Button>
            </StyledContentHover>
          </NavLink>
        </div>
        <div>
          <NavLink
            exact
            to="/myPage/collaborative-like"
            style={{ textDecoration: "none" }}
          >
            <StyledContentHover>
              <Button
                color="primary"
                className={classes.button}
                style={{ width: "100%", fontWeight: "bold", fontSize: "15px" }}
              >
                추천! 좋아요
              </Button>
            </StyledContentHover>
          </NavLink>
        </div>
        <div>
          <NavLink
            exact
            to="/myPage/collaborative-hate"
            style={{ textDecoration: "none" }}
          >
            <StyledContentHover>
              <Button
                color="primary"
                className={classes.button}
                style={{ width: "100%", fontWeight: "bold", fontSize: "15px" }}
              >
                이건 거르자
              </Button>
            </StyledContentHover>
          </NavLink>
        </div>
      </div>
    );
  }
}
