import React, { Fragment, Component } from "react";
import { NavLink } from "react-router-dom";

import { StyledSideBarButton } from "./styleComponent";

import { Icon } from "react-icons-kit";
import { user } from "react-icons-kit/fa/user";
import { film } from "react-icons-kit/icomoon/film";
import { barChartO } from "react-icons-kit/fa/barChartO";
import { checkSquareO } from "react-icons-kit/fa/checkSquareO";
import { heart } from "react-icons-kit/fa/heart";
import { u1F608 } from "react-icons-kit/noto_emoji_regular/u1F608";
import { square } from "react-icons-kit/fa/square";

export default class SideBar extends Component {
  state = {
    isClicked: false,
    btn1: false,
    btn2: false,
    btn3: false,
    btn4: false,
    btn5: false,
    btn6: false,
    btn7: false,
    btn8: false,
    btn9: false,
    reset: false
  };

  handleClick = () => {
    this.setState({
      isClicked: !this.state.isClicked
    });
  };

  handleBtnClick = btnType => {
    if (btnType === "btn1") {
      this.setState({
        btn1: true,
        btn2: false,
        btn3: false,
        btn4: false,
        btn5: false,
        btn6: false,
        btn7: false,
        btn8: false,
        btn9: false
      });
    } else if (btnType === "btn2") {
      this.setState({
        btn1: false,
        btn2: true,
        btn3: false,
        btn4: false,
        btn5: false,
        btn6: false,
        btn7: false,
        btn8: false,
        btn9: false
      });
    } else if (btnType === "btn3") {
      this.setState({
        btn1: false,
        btn2: false,
        btn3: true,
        btn4: false,
        btn5: false,
        btn6: false,
        btn7: false,
        btn8: false,
        btn9: false
      });
    } else if (btnType === "btn4") {
      this.setState({
        btn1: false,
        btn2: false,
        btn3: false,
        btn4: true,
        btn5: false,
        btn6: false,
        btn7: false,
        btn8: false,
        btn9: false
      });
    } else if (btnType === "btn5") {
      this.setState({
        btn1: false,
        btn2: false,
        btn3: false,
        btn4: false,
        btn5: true,
        btn6: false,
        btn7: false,
        btn8: false,
        btn9: false
      });
    } else if (btnType === "btn6") {
      this.setState({
        btn1: false,
        btn2: false,
        btn3: false,
        btn4: false,
        btn5: false,
        btn6: true,
        btn7: false,
        btn8: false,
        btn9: false
      });
    } else if (btnType === "btn7") {
      this.setState({
        btn1: false,
        btn2: true,
        btn3: false,
        btn4: false,
        btn5: false,
        btn6: false,
        btn7: true,
        btn8: false,
        btn9: false
      });
    } else if (btnType === "btn8") {
      this.setState({
        btn1: false,
        btn2: true,
        btn3: false,
        btn4: false,
        btn5: false,
        btn6: false,
        btn7: false,
        btn8: true,
        btn9: false
      });
    } else if (btnType === "btn9") {
      this.setState({
        btn1: false,
        btn2: true,
        btn3: false,
        btn4: false,
        btn5: false,
        btn6: false,
        btn7: false,
        btn8: false,
        btn9: true
      });
    }
  };

  render() {
    if (this.state.reset !== this.props.pageChange) {
      this.setState({
        reset: this.props.pageChange,
        btn1: false,
        btn2: false,
        btn3: false,
        btn4: false,
        btn5: false,
        btn6: false,
        btn7: false,
        btn8: false,
        btn9: false
      });
    }

    const { btn1, btn2, btn3, btn4, btn5, btn6, btn7, btn8, btn9 } = this.state;

    return (
      <div
        style={{
          marginTop: "5px",
          marginRight: "0px",
          height: "100%",
          // backgroundColor: "rgba(30, 39, 46, 0.85)", // 짙은 회색
          // backgroundColor: "rgba(85, 26, 139, 0.85)", // 짙은 보라
          // backgroundColor: "rgba(245, 59, 87, 0.75)", // 핫 핑크
          backgroundColor: "rgba(55, 66, 250, 0.75)", // 보라 파랑
          // backgroundColor: "rgba(116, 185, 255, 1)", // 옅은 파랑
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
                color={btn1 ? "rgba(55, 66, 250, 0.75)" : ""}
                bgColor={btn1 ? "#ffffff" : ""}
                onClick={() => {
                  this.props.onClick("profile");
                  this.handleBtnClick("btn1");
                }}
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
            <StyledSideBarButton
              color={btn2 ? "rgba(55, 66, 250, 0.75)" : ""}
              bgColor={btn2 ? "#ffffff" : ""}
              onClick={() => {
                this.handleClick();
                this.handleBtnClick("btn2");
              }}
            >
              <Icon size={"25px"} icon={film} style={{ marginRight: "15px" }} />
              나의 영화
            </StyledSideBarButton>
          </div>
          {this.state.isClicked ? (
            <Fragment>
              <div style={{ padding: "3px" }} />
              <div>
                <NavLink exact to="/myPage" style={{ textDecoration: "none" }}>
                  <StyledSideBarButton
                    color={btn7 ? "#f6e58d" : ""}
                    padding="5px 50px"
                    fontSize="15px"
                    onClick={() => {
                      this.props.onClick("home");
                      this.handleBtnClick("btn7");
                    }}
                  >
                    <Icon
                      size={"10px"}
                      icon={square}
                      style={{ marginRight: "10px" }}
                    />
                    내가 본 영화
                  </StyledSideBarButton>
                </NavLink>
              </div>
              <div>
                <NavLink exact to="/myPage" style={{ textDecoration: "none" }}>
                  <StyledSideBarButton
                    color={btn8 ? "#f6e58d" : ""}
                    padding="5px 50px"
                    fontSize="15px"
                    onClick={() => {
                      this.props.onClick("like");
                      this.handleBtnClick("btn8");
                    }}
                  >
                    <Icon
                      size={"10px"}
                      icon={square}
                      style={{ marginRight: "10px" }}
                    />
                    내가 좋아한 영화
                  </StyledSideBarButton>
                </NavLink>
              </div>
              <div>
                <NavLink exact to="/myPage" style={{ textDecoration: "none" }}>
                  <StyledSideBarButton
                    color={btn9 ? "#f6e58d" : ""}
                    padding="5px 50px"
                    fontSize="15px"
                    onClick={() => {
                      this.props.onClick("hate");
                      this.handleBtnClick("btn9");
                    }}
                  >
                    <Icon
                      size={"10px"}
                      icon={square}
                      style={{ marginRight: "10px" }}
                    />
                    내가 싫어한 영화
                  </StyledSideBarButton>
                </NavLink>
              </div>
            </Fragment>
          ) : (
            <div />
          )}
          <div style={{ padding: "15px" }} />
        </div>
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
                color={btn3 ? "rgba(55, 66, 250, 0.75)" : ""}
                bgColor={btn3 ? "#ffffff" : ""}
                onClick={() => {
                  this.props.onClick("mystatics");
                  this.handleBtnClick("btn3");
                }}
              >
                <Icon
                  size={"25px"}
                  icon={barChartO}
                  style={{ marginRight: "15px" }}
                />
                나의 영화 통계
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
                color={btn4 ? "rgba(55, 66, 250, 0.75)" : ""}
                bgColor={btn4 ? "#ffffff" : ""}
                onClick={() => {
                  this.props.onClick("collaborative-seen");
                  this.handleBtnClick("btn4");
                }}
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
                color={btn5 ? "rgba(55, 66, 250, 0.75)" : ""}
                bgColor={btn5 ? "#ffffff" : ""}
                onClick={() => {
                  this.props.onClick("collaborative-like");
                  this.handleBtnClick("btn5");
                }}
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
                color={btn6 ? "rgba(55, 66, 250, 0.75)" : ""}
                bgColor={btn6 ? "#ffffff" : ""}
                style={{ paddingLeft: "35px" }}
                onClick={() => {
                  this.props.onClick("collaborative-hate");
                  this.handleBtnClick("btn6");
                }}
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
